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
	const [recipe, setRecipe] = useState<Recipe>({
		name: 'Pancakes',
		slug: 'pancakes',
		ingredients: [
			{ type: 'butter', amount: '1', measurement: 'tbsp' },
			{ type: 'tomotillo', amount: '1', measurement: 'cup' },
			{ type: 'eggs', amount: '3', measurement: 'egg' },
			{ type: 'pepper', amount: '1', measurement: 'tsp' },
		],
	});
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
		<main>
			<h1>{recipe.name}</h1>
			<div className="card">
				<ul className="text-left">
					{recipe.ingredients.map((item, index) => (
						<li key={index}>
							{item.type}: {item.amount} {item.measurement}
						</li>
					))}
				</ul>
			</div>
			<div className="card">
				<p></p>
				<p></p>
			</div>
		</main>
	);
}

export default Recipe;
