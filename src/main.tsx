import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Recipe from './Recipe';
import CustomRecipeList from './CustomRecipeList';
import CustomRecipe from './CustomRecipe';
import { MongoProvider } from './MongoContext';
import { SpoonacularProvider } from './SpoonacularContext';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<SpoonacularProvider>
			<MongoProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="recipe/:id" element={<Recipe />} />
						<Route path="recipes" element={<CustomRecipeList />} />
						<Route path="recipes/:recipe" element={<CustomRecipe />} />
					</Routes>
				</BrowserRouter>
			</MongoProvider>
		</SpoonacularProvider>
	</StrictMode>,
);
