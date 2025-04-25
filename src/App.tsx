import './App.css';
import { Helmet } from 'react-helmet';
import { Navigation } from './Navigation';
import Dashboard from './Dashboard';
import Search from '../components/Search';
import RecipeCard from '../components/RecipeCard';
// import { SearchFunction } from './@types';
// import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import { useAPI } from './SpoonacularContext';
import { useMongo } from './MongoContext';

function App() {
	const { newRecipes, runSearch, isLoading } = useAPI();

	const { mongoList } = useMongo();

	return (
		<Grid
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
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
				<Search handleSubmit={runSearch} />

				{/* <Container sx={{ display: 'flex' }}> */}
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
					data-testid="queryResults"
				>
					{isLoading ? (
						<Typography
							gutterBottom
							variant="h4"
							component="div"
							sx={{ fontWeight: 'bold', margin: 'auto' }}
						>
							Loading...
						</Typography>
					) : newRecipes?.length === 0 ? (
						<Typography
							gutterBottom
							variant="h4"
							component="div"
							sx={{ fontWeight: 'bold', margin: 'auto' }}
						>
							No Results!
						</Typography>
					) : (
						newRecipes?.map((recipe) =>
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
