import React from 'react';
import { render, screen, fireEvent, within, waitFor, act } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import SpoonacularRecipe from '../__mocks__/recipe-642583.json';
import SpoonacularRecipeList from '../__mocks__/pastaRecipes.json';
import MongoList from '../__mocks__/mongoList.json';
import { beforeEach, afterEach, test, expect, jest } from '@jest/globals';
import Recipe from './Recipe';

let fetchMock: unknown = undefined;

const assetsFetchMock = (url: RequestInfo | URL) => {
	const mock = url.toString().endsWith('recipes/')
		? MongoList
		: url.toString().includes('search/')
		? SpoonacularRecipeList
		: SpoonacularRecipe;

	return Promise.resolve({
		json: () => Promise.resolve(mock),
	} as Response);
};

beforeEach(() => {
	jest.resetAllMocks();
	fetchMock = jest.spyOn(global, 'fetch').mockImplementation(assetsFetchMock);
});
afterEach(() => {
	window.localStorage.clear();
});

test('App Renders', async () => {
	await act(() => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>,
		);
	});
	const h1 = screen.getByRole('heading', { level: 1 });
	expect(h1.textContent).toMatch('Recipes Dashboard');
});

test('Search field queries api recipes', async () => {
	await act(() => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>,
		);
	});
	const searchField = screen.getByLabelText<HTMLInputElement>('search new recipes');
	const submitButton = screen.getByRole('button', { name: 'search' });
	fireEvent.change(searchField, { target: { value: 'pasta' } });
	const clearButton = screen.getByRole('button', { name: 'clear text' });
	fireEvent.click(submitButton);
	const recipeList = screen.getByTestId('queryResults');
	const recipeCard = await within(recipeList).findByText('Farfalle with Peas, Ham and Cream');
	expect(recipeCard).toBeVisible();
	fireEvent.click(clearButton);
	expect(searchField.value).toBe('');
});

test('Recipe Dashboard populates', async () => {
	await act(() => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>,
		);
	});
	const dashboard = screen.getByTestId('recipe-dashboard');
	// expect(global.fetch).toHaveBeenCalledTimes(4);

	await waitFor(() => expect(within(dashboard).getByText('Salsa Verde')).toBeInTheDocument());
	// const dashboardRecipe = within(dashboard).queryByText('Salsa Verde');
	// expect(dashboardRecipe?.textContent).toBe('Salsa Verde');
});

test('Recipe Renders', async () => {
	await act(() => {
		render(
			<BrowserRouter>
				<Recipe />
			</BrowserRouter>,
		);
	});
	const h1 = screen.getByRole('heading', { level: 1 });
	expect(h1.textContent).toMatch('Farfalle with Peas, Ham and Cream');
});
