import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { test, expect } from '@jest/globals';
import Recipe from './Recipe';
import { describe } from 'node:test';
import { SpoonacularContext } from './SpoonacularContext';
import { MongoProvider } from './MongoContext';
import spoonRecipes from '../__mocks__/pastaRecipes.json';
import bruschettaRecipeData from '../__mocks__/recipe-715538.json';
import farfalleHamRecipeData from '../__mocks__/recipe-642583.json';
import { Recipe as RecipeType, SpoonacularRecipe } from './@types';

const mockedUsedNavigate = jest.fn();

const recipeSet = (data: SpoonacularRecipe) => {
	return {
		spoonacularId: data.id,
		timestamp: new Date().toJSON().toString(),
		name: data.title,
		slug: data.title
			.toLowerCase()
			.replace(/[,'.?!\\/&]/g, '')
			.replace(/\s/g, '-'),
		ingredients: data.extendedIngredients.map((ingredient) => ({
			name: ingredient.name,
			amount: ingredient.amount.toString(),
			unit: ingredient.unit,
		})),
		image: data.image,
		summary: data.summary,
		servings: data.servings,
		cookTime: data.readyInMinutes,
		diet: {
			vegetarian: data.vegetarian,
			vegan: data.vegan,
			glutenFree: data.glutenFree,
			dairyFree: data.dairyFree,
		},
		instructions: data.analyzedInstructions[0].steps,
	} as RecipeType;
};

const newRecipes = spoonRecipes;
const runSearch = jest.fn();
const setRecipeId = jest.fn();
const isLoading = false;
const newRecipeIndex = 0;

const wrapper = (id: string, recipeData: RecipeType) => (
	<MemoryRouter initialEntries={[`/recipe/${id}`]}>
		<SpoonacularContext.Provider
			value={{
				recipe: recipeData,
				runSearch,
				setRecipeId,
				isLoading,
				recipeId: id,
				newRecipes,
				newRecipeIndex,
			}}
		>
			<MongoProvider>
				<Routes>
					<Route path="recipe/:id" element={<Recipe />} />
				</Routes>
			</MongoProvider>
		</SpoonacularContext.Provider>
	</MemoryRouter>
);

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
	useParams: () => setRecipeId,
}));

describe('API Recipe functions', () => {
	test('Recipe Renders', async () => {
		render(wrapper('7155380', recipeSet(bruschettaRecipeData)));

		await waitFor(() => {
			expect(setRecipeId).toHaveBeenCalled();
			const h1 = screen.getByRole('heading', { level: 1 });
			expect(h1.textContent).toMatch(
				'What to make for dinner tonight?? Bruschetta Style Pork & Pasta',
			);
		});
	});

	test('Recipe cycles through next and previous recipes', async () => {
		// window.localStorage.setItem('newRecipes', JSON.stringify(spoonRecipes));

		const { rerender } = render(wrapper('7155380', recipeSet(bruschettaRecipeData)));

		await waitFor(() => {
			expect(setRecipeId).toHaveBeenCalled();
			const h1 = screen.getByRole('heading', { level: 1 });
			expect(h1.textContent).toMatch(
				'What to make for dinner tonight?? Bruschetta Style Pork & Pasta',
			);
		});

		const nextRecipe = screen.getByRole('button', { name: 'Next Recipe' });
		fireEvent.click(nextRecipe);
		expect(mockedUsedNavigate).toHaveBeenCalled();

		rerender(wrapper('642583', recipeSet(farfalleHamRecipeData)));
		// const nextRecipeId = nextRecipe.getAttribute('href')?.slice(8);

		await waitFor(() => {
			expect(setRecipeId).toHaveBeenCalled();
			const nextH1 = screen.getByRole('heading', { level: 1 });
			expect(nextH1.textContent).toMatch('Farfalle with Peas, Ham and Cream');
		});
	});
});
