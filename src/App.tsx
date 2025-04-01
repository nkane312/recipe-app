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
import { Typography } from '@mui/material';

// const recipeRequest = await fetch('http://localhost:3000/recipe/meatloaf');
// const recipe = await recipeRequest.json();

// const recipesListRequest = await fetch('http://localhost:3000/search/pasta');
// const recipesList = await recipesListRequest.json();

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
	const [isLoading, setIsLoading] = useState(false);
	const runSearch: SearchFunction = async (ingredient, e) => {
		setIsLoading(true);
		e.preventDefault();
		const recipesListRequest = await fetch('http://localhost:3000/search/' + ingredient);
		const recipesList = await recipesListRequest.json();
		setNewRecipes(recipesList.results);
		// console.log(recipesList.results);
		setIsLoading(false);
	};
	return (
		<Grid
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#000000',
			}}
			container
		>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>Recipes Dashboard</title>
			</Helmet>
			<Grid size={12}>
				<Navigation />

				<Typography variant="h1">Recipes Dashboard</Typography>
			</Grid>

			<Grid
				container
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{/* <Grid> */}
				{/* <p>{JSON.stringify(recipe)}</p> */}
				{/* <p>{JSON.stringify(recipesList)}</p> */}
				{/* <p>MongoDB data: {JSON.stringify(mongoList)}</p> */}
				{/* <p>{mongoAdd}</p> */}
				{/* <p>{mongoRemove}</p> */}
				<Search handleSubmit={runSearch} />

				{/* <Container sx={{ display: 'flex' }}> */}
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					{isLoading ? (
						<Typography
							gutterBottom
							variant="h4"
							component="div"
							sx={{ fontWeight: 'bold', margin: 'auto' }}
						>
							Loading...
						</Typography>
					) : newRecipes.length === 0 ? (
						<Typography
							gutterBottom
							variant="h4"
							component="div"
							sx={{ fontWeight: 'bold', margin: 'auto' }}
						>
							No Results!
						</Typography>
					) : (
						newRecipes.map((recipe) =>
							recipe.id === 0 ? (
								''
							) : (
								<Grid key={recipe.id} size={4}>
									<RecipeCard id={recipe.id} name={recipe.title} image={recipe.image} />
								</Grid>
							),
						)
					)}
					{/* </Grid> */}
					{/* </Container> */}
				</Grid>
				<Dashboard data={mongoList} />
			</Grid>
		</Grid>
	);
}

export default App;
