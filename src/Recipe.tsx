import { useState, useEffect } from 'react';
import './App.css';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { Navigation } from './Navigation';
import type { Recipe } from './@types';

// const recipeRequest = await fetch('http://localhost:3000/recipe/meatloaf');
// const recipe = await recipeRequest.json();

// type Recipe = {
// 	name: string;
// 	slug: string;
// 	ingredients: {
// 		type: string;
// 		amount: string;
// 		measurement: string;
// 	}[];
// };

function Recipe() {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const params = useParams();
	const displayRecipe = params.recipe;
	// const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const logRecipe = async () => {
			//   setIsLoading(true);
			const response = await fetch('http://localhost:3000/recipe/' + displayRecipe);

			const recipeData = await response.json();
			console.log(recipeData);

			setRecipe(recipeData);
			//   setIsLoading(false);
		};

		logRecipe().catch(console.error);
	}, [displayRecipe]);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>{recipe !== null ? recipe.name + ' Recipe' : 'Loading...'} </title>
			</Helmet>
			<Navigation />
			<main>
				<h1>{recipe !== null ? recipe.name + ' Recipe' : 'Loading...'}</h1>

				<div className="card">
					{recipe !== null ? (
						<ul className="text-left">
							{recipe.ingredients.map((item, index) => (
								<li key={index}>
									{item.type}: {item.amount} {item.measurement}
								</li>
							))}
						</ul>
					) : (
						''
					)}
				</div>
				<div className="card">
					<p></p>
					<p></p>
				</div>
			</main>
		</>
	);
}

export default Recipe;
