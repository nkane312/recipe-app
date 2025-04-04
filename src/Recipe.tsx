import { useState, useEffect } from 'react';
import './App.css';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { Navigation } from './Navigation';
import type { Recipe } from './@types';
import Grid from '@mui/material/Grid2';
import { Button, Paper, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useMongoRequest } from './useMongoRequest';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Recipe() {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const params = useParams();
	const recipeId = params.id;
	const [inMongo, setInMongo] = useState(false);
	useEffect(() => {
		const mongoExists = async () => {
			if (recipe !== null) {
				const response = await fetch('http://localhost:3000/recipes/' + recipe.slug);
				if (response.status === 200) {
					const recipeText = await response.text();
					console.log(recipeText);
					if (recipeText === '') {
						setInMongo(false);
					} else {
						setInMongo(true);
					}
				} else {
					setInMongo(false);
				}
			} else {
				setInMongo(false);
			}
		};
		mongoExists().catch(console.error);
	}, [inMongo, recipe]);
	// function MongoRequest(method: 'add' | 'remove', recipeData: Recipe | null) {
	// 	const [mongoResponse, setMongoResponse] = useState('');
	// 	useEffect(() => {
	// 		if (recipeData !== null) {
	// 			const mongoRequest = async () => {
	// 				const request = await fetch(`http://localhost:3000/${method}/`, {
	// 					method: 'POST',
	// 					body: JSON.stringify(recipeData),
	// 					headers: { 'Content-Type': 'application/json' },
	// 				});
	// 				const mongoReq = await request.text();
	// 				setMongoResponse(mongoReq);
	// 			};
	// 			mongoRequest();
	// 		}
	// 	}, [recipeData]);
	// 	return mongoResponse;
	// }
	const { sendMongoRequest } = useMongoRequest();
	const handleAdd = () => {
		sendMongoRequest('add', recipe);
		setInMongo(true);
	};
	const handleRemove = () => {
		sendMongoRequest('remove', recipe);
		setInMongo(false);
	};

	const cycleRecipe = (direction: string, id: string | undefined) => {
		if (id !== undefined) {
			let newId = parseInt(id);
			if (direction === 'next') {
				newId++;
			} else {
				newId--;
			}
			return '/recipe/' + newId;
			// setRecipeId(newId.toString());
		}
	};

	useEffect(() => {
		const logRecipe = async () => {
			//   setIsLoading(true);
			const response = await fetch('http://localhost:3000/recipe/' + recipeId);

			const recipeData = await response.json();
			// console.log(recipeData);
			const recipeObj: Recipe = {
				spoonacularId: recipeData.id,
				timestamp: new Date().toJSON().toString(),
				name: recipeData.title,
				slug: recipeData.title
					.toLowerCase()
					.replace(/[,'.?!\\/&]/g, '')
					.replace(/\s/g, '-'),
				ingredients: recipeData.extendedIngredients,
				image: recipeData.image,
				summary: recipeData.summary,
				servings: recipeData.servings,
				cookTime: recipeData.readyInMinutes,
				diet: {
					vegetarian: recipeData.vegetarian,
					vegan: recipeData.vegan,
					glutenFree: recipeData.glutenFree,
					dairyFree: recipeData.dairyFree,
				},
				instructions: recipeData.analyzedInstructions[0].steps,
			};
			// console.log(recipeObj);
			setRecipe(recipeObj);
			//   setIsLoading(false);
			// mongoExists().catch(console.error);
		};

		logRecipe().catch(console.error);
	}, [recipeId]);

	// useEffect(() => {
	// 	const logRecipe = async () => {
	// 		//   setIsLoading(true);
	// 		const response = await fetch('http://localhost:3000/recipe/' + recipeId);

	// 		const recipeData = await response.json();
	// 		console.log(recipeData);
	// 		const recipeObj: Recipe = {
	// 			spoonacularId: recipeData.id,
	// 			timestamp: new Date().toJSON().toString(),
	// 			name: recipeData.title,
	// 			slug: recipeData.title
	// 				.toLowerCase()
	// 				.replace(/[,'.?!\\/&]/, '')
	// 				.replace(/\s/, '-'),
	// 			ingredients: recipeData.extendedIngredients,
	// 			image: recipeData.image,
	// 			summary: recipeData.summary,
	// 			servings: recipeData.servings,
	// 			cookTime: recipeData.readyInMinutes,
	// 			diet: {
	// 				vegetarian: recipeData.vegetarian,
	// 				vegan: recipeData.vegan,
	// 				glutenFree: recipeData.glutenFree,
	// 				dairyFree: recipeData.dairyFree,
	// 			},
	// 			instructions: recipeData.analyzedInstructions[0].steps,
	// 		};
	// 		console.log(recipeObj);
	// 		setRecipe(recipeObj);
	// 		//   setIsLoading(false);
	// 	};

	// 	logRecipe().catch(console.error);
	// }, [recipeId]);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>{recipe !== null ? recipe.name + ' Recipe' : 'Loading...'} </title>
			</Helmet>
			<Navigation />
			<main>
				{recipe !== null ? (
					<Grid container spacing={2} columns={{ xs: 1, lg: 12 }}>
						<Grid size={12}>
							<h1>{recipe.name}</h1>
						</Grid>
						<Grid size={4}>
							<img src={recipe.image} alt={recipe.name} width={400} />
						</Grid>
						<Grid size={8}>
							<Paper elevation={1} sx={{ p: 1, minHeight: 250, alignContent: 'center' }}>
								<Typography
									component={'p'}
									dangerouslySetInnerHTML={{ __html: recipe.summary }}
								></Typography>
							</Paper>
						</Grid>

						<Grid size={9}>
							<Paper elevation={3} square={false} sx={{ textAlign: 'left', p: 1, minHeight: 200 }}>
								<ol>
									{recipe.instructions.map((item, index) => (
										<li key={index}>{item.step}</li>
									))}
								</ol>
							</Paper>
						</Grid>
						<Grid size={3}>
							<Paper elevation={3} square={false} sx={{ fontWeight: 'bold', p: 1, minHeight: 200 }}>
								<ul>
									{recipe.ingredients.map((item, index) => (
										<li key={index}>
											{item.name}: {item.amount} {item.unit}
										</li>
									))}
								</ul>
							</Paper>
						</Grid>
						<Grid size={12}>
							<Stack spacing={2} direction="row">
								<Button
									variant="contained"
									// onClick={() => cycleRecipe('previous', recipeId)}
									href={cycleRecipe('previous', recipeId)}
									fullWidth={true}
									startIcon={<ArrowBackIcon />}
								>
									Previous Recipe
								</Button>

								{!inMongo ? (
									<Button
										variant="contained"
										onClick={handleAdd}
										color="success"
										startIcon={<CloudUploadIcon />}
										fullWidth={true}
									>
										Add Recipe
									</Button>
								) : (
									<Button
										variant="contained"
										onClick={handleRemove}
										color="warning"
										startIcon={<DeleteIcon />}
										fullWidth={true}
									>
										Remove Recipe
									</Button>
								)}

								<Button
									variant="contained"
									// onClick={() => cycleRecipe('next', recipeId)}
									href={cycleRecipe('next', recipeId)}
									fullWidth={true}
									endIcon={<ArrowForwardIcon />}
								>
									Next Recipe
								</Button>
							</Stack>
						</Grid>
						{/* <Grid size={4}>
							
						</Grid>

						<Grid size={4}>
							
						</Grid> */}

						{/* </Grid> */}
					</Grid>
				) : (
					<h1>Loading...</h1>
				)}
			</main>
		</>
	);
}

export default Recipe;
