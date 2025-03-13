import { useState, useEffect } from 'react';
import './App.css';
import { Navigation } from './Navigation';
import { Helmet } from 'react-helmet';
import type { RecipeList } from './@types';

// const recipeRequest = await fetch('http://localhost:3000/recipe/meatloaf');
// const recipe = await recipeRequest.json();

// type RecipeList = {
// 	name: string;
// 	slug: string;
// 	ingredients: {
// 		type: string;
// 		amount: string;
// 		measurement: string;
// 	}[];
// }[];

function Recipe() {
	const [recipes, setRecipes] = useState<RecipeList | null>(null);
	// const [recipes, setRecipes] = useState<RecipeList | null>([
	// 	{
	// 		_id: '0',
	// 		name: 'Pancakes',
	// 		slug: 'pancakes',
	// 		ingredients: [
	// 			{ type: 'butter', amount: '1', measurement: 'tbsp' },
	// 			{ type: 'tomotillo', amount: '1', measurement: 'cup' },
	// 			{ type: 'eggs', amount: '3', measurement: 'egg' },
	// 			{ type: 'pepper', amount: '1', measurement: 'tsp' },
	// 		],
	// 	},
	// ]);
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
												{ingredient.type}: {ingredient.amount} {ingredient.measurement}
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

export default Recipe;
