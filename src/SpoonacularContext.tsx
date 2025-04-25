import React, { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';
import { Recipe, SpoonacularAPIContext, SearchFunction } from './@types';

const SpoonacularContext = createContext<SpoonacularAPIContext | undefined>(undefined);

export const SpoonacularProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const cachedRecipes = JSON.parse(
		window.localStorage.getItem('newRecipes') ??
			JSON.stringify({
				1: [] as { id: string }[],
			}),
	);

	const [newRecipes, setNewRecipes] = useState(cachedRecipes);
	const [isLoading, setIsLoading] = useState(false);
	const runSearch: SearchFunction = async (ingredient, e) => {
		setIsLoading(true);
		e.preventDefault();
		const recipesListRequest = await fetch('http://localhost:3000/search/' + ingredient);
		const recipesList = await recipesListRequest.json();
		setNewRecipes(recipesList.results);
		setIsLoading(false);
	};

	const [recipeId, setRecipeId] = useState('0');
	const [recipe, setRecipe] = useState<Recipe | null>(null);

	if (newRecipes !== undefined) {
		window.localStorage.setItem('newRecipes', JSON.stringify(newRecipes));
	} else if (cachedRecipes !== undefined) {
		setNewRecipes(cachedRecipes);
	}
	const newRecipeIndex = newRecipes?.findIndex(
		(obj: { id: number }) => JSON.stringify(obj.id) === recipeId,
	);

	useEffect(() => {
		const logRecipe = async () => {
			//   setIsLoading(true);
			const response = await fetch('http://localhost:3000/recipe/' + recipeId);

			const recipeData = await response.json();
			// console.log(recipeData);
			const recipeObj: Recipe = {
				spoonacularId: recipeData.id,
				timestamp: new Date().toJSON().toString(),
				name: recipeData.title,
				slug: recipeData.title
					.toLowerCase()
					.replace(/[,'.?!\\/&]/g, '')
					.replace(/\s/g, '-'),
				ingredients: recipeData.extendedIngredients,
				image: recipeData.image,
				summary: recipeData.summary,
				servings: recipeData.servings,
				cookTime: recipeData.readyInMinutes,
				diet: {
					vegetarian: recipeData.vegetarian,
					vegan: recipeData.vegan,
					glutenFree: recipeData.glutenFree,
					dairyFree: recipeData.dairyFree,
				},
				instructions: recipeData.analyzedInstructions[0].steps,
			};
			setRecipe(recipeObj);
		};
		if (recipeId !== '0') {
			logRecipe().catch(console.error);
		}
	}, [recipeId]);

	return (
		<SpoonacularContext.Provider
			value={{ runSearch, recipe, recipeId, setRecipeId, newRecipes, isLoading, newRecipeIndex }}
		>
			{children}
		</SpoonacularContext.Provider>
	);
};

export function useAPI() {
	const context = useContext(SpoonacularContext);
	if (context === undefined) {
		throw new Error('Context must be used within a Provider');
	}
	return context;
}
