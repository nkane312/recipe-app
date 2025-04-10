import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { test, expect } from '@jest/globals';
import Recipe from './Recipe';
import { describe } from 'node:test';

describe('API Recipe functions', () => {
	test('Recipe Renders', async () => {
		const recipeId = '642583';
		await act(() => {
			render(
				<MemoryRouter initialEntries={[`/recipe/${recipeId}`]}>
					<Routes>
						<Route path="recipe/:id" element={<Recipe />} />
					</Routes>
				</MemoryRouter>,
			);
		});
		const h1 = screen.getByRole('heading', { level: 1 });
		expect(h1.textContent).toMatch('Farfalle with Peas, Ham and Cream');
	});

	test.skip('Recipe cycles through next and previous recipes', async () => {
		const recipeId = '642583';
		await act(() => {
			render(
				<MemoryRouter initialEntries={[`/recipe/${recipeId}`]}>
					<Routes>
						<Route path="recipe/:id" element={<Recipe />} />
					</Routes>
				</MemoryRouter>,
			);
		});
		const h1 = screen.getByRole('heading', { level: 1 });
		expect(h1.textContent).toMatch('Farfalle with Peas, Ham and Cream');
		const nextRecipe = screen.getByRole('button', { name: 'Next Recipe' });
		fireEvent.click(nextRecipe);
		expect(h1.textContent).toMatch('Farfalle with Ground Turkey and Spinach in Alfredo');
	});
});
