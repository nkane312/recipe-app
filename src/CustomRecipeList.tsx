import { useState, useEffect } from 'react';
import './App.css';
import { Navigation } from './Navigation';
import { Helmet } from 'react-helmet';
import type { RecipeList } from './@types';

function CustomRecipeList() {
	const [recipes, setRecipes] = useState<RecipeList | null>(null);
	// const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const logRecipe = async () => {
			//   setIsLoading(true);
			const response = await fetch('http://localhost:3000/recipes/');
			const recipeData = await response.json();
			console.log(recipeData);

			setRecipes(recipeData);
			//   setIsLoading(false);
		};

		logRecipe().catch(console.error);
	}, []);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>My Recipes</title>
			</Helmet>
			<Navigation />
			<main>
				<h1>My Recipes</h1>
				<div className="card">
					{recipes !== null
						? recipes.map((recipe, recipeIndex) => (
								<div className="card" key={recipeIndex}>
									<h2>{recipe.name}</h2>
									<ul className="text-left">
										{recipe.ingredients.map((ingredient, ingredientIndex) => (
											<li key={ingredientIndex}>
												{ingredient.name}: {ingredient.amount} {ingredient.unit}
											</li>
										))}
									</ul>
								</div>
						  ))
						: 'Loading Recipes...'}
				</div>
			</main>
		</>
	);
}

export default CustomRecipeList;
