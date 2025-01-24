import { useState, useEffect } from 'react';
import './App.css';
import { useParams } from 'react-router';

// const recipeRequest = await fetch('http://localhost:3000/recipe/meatloaf');
// const recipe = await recipeRequest.json();

type Recipe = {
	name: string;
	slug: string;
	ingredients: {
		type: string;
		amount: string;
		measurement: string;
	}[];
};

function Recipe() {
	const [recipe, setRecipe] = useState<Recipe>();
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
			<div></div>
			<h1></h1>
			<div className="card">
				<p></p>
			</div>
			<div className="card">
				<p>{JSON.stringify(recipe)}</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</>
	);
}

export default Recipe;
