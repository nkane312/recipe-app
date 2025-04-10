import React from 'react';
import { render, screen, fireEvent, within, waitFor, act } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { test, expect } from '@jest/globals';
import { describe } from 'node:test';

describe('App functions', () => {
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

		await waitFor(() => expect(within(dashboard).getByText('Salsa Verde')).toBeInTheDocument());
	});
});

// describe('API Recipe functions', () => {
// 	test('Recipe Renders', async () => {
// 		await act(() => {
// 			render(
// 				<BrowserRouter>
// 					<Recipe />
// 				</BrowserRouter>,
// 			);
// 		});
// 		const h1 = screen.getByRole('heading', { level: 1 });
// 		expect(h1.textContent).toMatch('Farfalle with Peas, Ham and Cream');
// 	});

// 	test.skip('Recipe cycles through next and previous recipes', async () => {
// 		await act(() => {
// 			render(
// 				<BrowserRouter>
// 					<Recipe />
// 				</BrowserRouter>,
// 			);
// 			const h1 = screen.getByRole('heading', { level: 1 });
// 			expect(h1.textContent).toMatch('Farfalle with Peas, Ham and Cream');
// 			const nextRecipe = screen.getByRole('button', { name: 'Next Recipe' });
// 			fireEvent.click(nextRecipe);
// 			expect(h1.textContent).toMatch('Farfalle with Peas, Ham and Cream');
// 		});
// 	});
// });
