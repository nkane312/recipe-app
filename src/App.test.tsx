import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { test, expect } from '@jest/globals';
import { describe } from 'node:test';
import { SpoonacularProvider } from './SpoonacularContext';
import { MongoProvider } from './MongoContext';

describe('App functions', () => {
	test('App Renders', async () => {
		render(
			<SpoonacularProvider>
				<MongoProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</MongoProvider>
			</SpoonacularProvider>,
		);
		const h1 = screen.getByRole('heading', { level: 1 });
		await waitFor(() => {
			expect(h1.textContent).toMatch('Recipes Dashboard');
		});
	});

	test('Search field queries api recipes', async () => {
		render(
			<SpoonacularProvider>
				<MongoProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</MongoProvider>
			</SpoonacularProvider>,
		);
		const searchField = screen.getByLabelText<HTMLInputElement>('search new recipes');
		const submitButton = screen.getByRole('button', { name: 'search' });
		fireEvent.change(searchField, { target: { value: 'pasta' } });
		const clearButton = screen.getByRole('button', { name: 'clear text' });
		fireEvent.click(submitButton);
		const recipeList = screen.getByTestId('queryResults');
		await waitFor(() => {
			within(recipeList).findByText('Farfalle with Peas, Ham and Cream');
		});
		fireEvent.click(clearButton);
		await waitFor(() => {
			expect(searchField.value).toBe('');
		});
	});

	test('Recipe Dashboard populates', async () => {
		render(
			<SpoonacularProvider>
				<MongoProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</MongoProvider>
			</SpoonacularProvider>,
		);
		const dashboard = screen.getByTestId('recipe-dashboard');

		await waitFor(() => expect(within(dashboard).getByText('Salsa Verde')).toBeInTheDocument());
	});
});
