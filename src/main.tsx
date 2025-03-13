import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import App from './App.tsx';
import Recipe from './Recipe.tsx';
import RecipeList from './RecipeList.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="recipe" element={<RecipeList />} />
				<Route path="recipe/:recipe" element={<Recipe />} />
				<Route path="recipes/:ingredient" element={<Recipe />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
