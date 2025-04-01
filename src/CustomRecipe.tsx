import { useState, useEffect } from 'react';
import './App.css';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { Navigation } from './Navigation';
import type { Recipe } from './@types';

function CustomRecipe() {
	const [customRecipe, setCustomRecipe] = useState<Recipe | null>(null);
	const params = useParams();
	const displayRecipe = params.recipe;
	// const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const logRecipe = async () => {
			//   setIsLoading(true);
			const response = await fetch('http://localhost:3000/recipes/' + displayRecipe);

			const recipeData = await response.json();
			console.log(recipeData);

			setCustomRecipe(recipeData);
			//   setIsLoading(false);
		};

		logRecipe().catch(console.error);
	}, [displayRecipe]);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>{customRecipe !== null ? customRecipe.name + ' Recipe' : 'Loading...'} </title>
			</Helmet>
			<Navigation />
			<main>
				<h1>{customRecipe !== null ? customRecipe.name + ' Recipe' : 'Loading...'}</h1>

				<div className="card">
					{customRecipe !== null ? (
						<ul className="text-left">
							{customRecipe.ingredients.map((item, index) => (
								<li key={index}>
									{item.name}: {item.amount} {item.unit}
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

export default CustomRecipe;
