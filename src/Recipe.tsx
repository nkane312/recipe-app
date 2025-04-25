import './App.css';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Navigation } from './Navigation';
import type { Recipe } from './@types';
import Grid from '@mui/material/Grid2';
import { Button, Paper, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import defaultImage from '../src/assets/default-recipe.svg';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMongo } from './MongoContext';
import { useAPI } from './SpoonacularContext';
// import { useState } from 'react';

function Recipe() {
	const { inMongo, handleAdd, handleRemove } = useMongo();
	const { recipe, setRecipeId, newRecipes, newRecipeIndex } = useAPI();

	const params = useParams();
	setRecipeId(params.id);

	// const [imageUrl, setImageUrl] = useState(recipe?.image);

	// const handleImageError = () => {
	// 	setImageUrl(defaultImage);
	// };

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>{recipe !== null ? recipe.name + ' Recipe' : 'Loading...'} </title>
			</Helmet>
			<Navigation />
			<Grid container color={'#fff'} sx={{ backgroundColor: '#434576', p: 2, borderRadius: 2 }}>
				{recipe !== null ? (
					<Grid container spacing={2} columns={{ xs: 1, lg: 12 }}>
						<Grid size={12}>
							<h1>{recipe.name}</h1>
						</Grid>
						<Grid size={4}>
							<img src={recipe.image} alt={recipe.name} width={400} />
							{/* <img onError={handleImageError} src={imageUrl} alt={recipe.name} width={400} /> */}
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
								{/* {cycleIds.prev ? (
									''
								) : (
									<Button
										variant="contained"
										href={'/recipe/' + cycleIds.prev}
										fullWidth={true}
										startIcon={<ArrowBackIcon />}
									>
										Previous Recipe
									</Button>
								)} */}

								{newRecipes !== undefined ? (
									newRecipeIndex !== undefined && newRecipeIndex > 0 ? (
										<Button
											variant="contained"
											href={'/recipe/' + newRecipes.at(newRecipeIndex - 1)?.id}
											fullWidth={true}
											startIcon={<ArrowBackIcon />}
										>
											Previous Recipe
										</Button>
									) : (
										''
									)
								) : (
									''
								)}

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

								{/* {cycleIds.next ? (
									''
								) : (
									<Button
										variant="contained"
										href={'/recipe/' + cycleIds.next}
										fullWidth={true}
										endIcon={<ArrowForwardIcon />}
									>
										Next Recipe
									</Button>
								)} */}
								{newRecipes !== undefined ? (
									newRecipeIndex !== undefined && newRecipeIndex < newRecipes.length ? (
										<Button
											variant="contained"
											href={'/recipe/' + newRecipes.at(newRecipeIndex + 1)?.id}
											fullWidth={true}
											startIcon={<ArrowForwardIcon />}
										>
											Next Recipe
										</Button>
									) : (
										''
									)
								) : (
									''
								)}
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
			</Grid>
		</>
	);
}

export default Recipe;
