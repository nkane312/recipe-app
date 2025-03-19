// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { Helmet } from 'react-helmet';
import { Navigation } from './Navigation';
import Dashboard from './Dashboard';
import Search from '../components/Search';
import RecipeCard from '../components/RecipeCard';
import { SearchFunction } from './@types';
import { useState } from 'react';
import Grid from '@mui/material/Grid2';

// const recipeRequest = await fetch('http://localhost:3000/recipe/meatloaf');
// const recipe = await recipeRequest.json();

const recipesListRequest = await fetch('http://localhost:3000/recipes/pasta');
const recipesList = await recipesListRequest.json();

const mongoListRequest = await fetch('http://localhost:3000/recipes/');
const mongoList = await mongoListRequest.json();

// const mongoAddRequest = await fetch('http://localhost:3000/add/', {
// 	method: 'POST',
// 	body: JSON.stringify({
// 		name: 'Mac and Cheese',
// 		slug: 'mac-and-cheese',
// 		ingredients: [
// 			{ type: 'cheddar cheese', amount: '2', measurement: 'cups' },
// 			{ type: 'elbow macaroni', amount: '1', measurement: 'box' },
// 			{ type: 'butter', amount: '1/4', measurement: 'cup' },
// 			{ type: 'milk', amount: '2', measurement: 'cups' },
// 		],
// 	}),
// 	headers: { 'Content-Type': 'application/json' },
// });
// const mongoAdd = await mongoAddRequest.text();

// const mongoRemoveRequest = await fetch('http://localhost:3000/remove/', {
// 	method: 'POST',
// 	body: JSON.stringify({
// 		name: 'Mac and Cheese',
// 		slug: 'mac-and-cheese',
// 		ingredients: [
// 			{ type: 'cheddar cheese', amount: '2', measurement: 'cups' },
// 			{ type: 'elbow macaroni', amount: '1', measurement: 'box' },
// 			{ type: 'butter', amount: '1/4', measurement: 'cup' },
// 			{ type: 'milk', amount: '2', measurement: 'cups' },
// 		],
// 	}),
// 	headers: { 'Content-Type': 'application/json' },
// });
// const mongoRemove = await mongoRemoveRequest.text();

function App() {
	const [newRecipes, setNewRecipes] = useState([
		{ id: 0, image: 'https://img.spoonacular.com/recipes/656298-312x231.jpg', title: 'Test' },
	]);
	const runSearch: SearchFunction = async (ingredient, e) => {
		e.preventDefault();
		const recipesListRequest = await fetch('http://localhost:3000/recipes/' + ingredient);
		const recipesList = await recipesListRequest.json();
		console.log(recipesList.results);
		setNewRecipes(recipesList.results);
	};
	// console.log(mongoList);
	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>Recipes Dashboard</title>
			</Helmet>
			{/* <div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div> */}
			<Navigation />
			<h1>Recipes Dashboard</h1>

			<div className="h-screen">
				<div className="flex justify-center items-center text-2xl">
					{/* <p>{JSON.stringify(recipe)}</p> */}
					<p>{JSON.stringify(recipesList)}</p>
					{/* <p>MongoDB data: {JSON.stringify(mongoList)}</p> */}
					{/* <p>{mongoAdd}</p> */}
					{/* <p>{mongoRemove}</p> */}
					<Search handleSubmit={runSearch} />
					<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
						{newRecipes.map((recipe) => (
							<Grid size={4}>
								<RecipeCard key={recipe.id} name={recipe.title} image={recipe.image} />
							</Grid>
						))}
					</Grid>

					{/* <Dashboard data={newRecipes} /> */}
					<Dashboard data={mongoList} />
				</div>
			</div>
		</>
	);
}

export default App;
