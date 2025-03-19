import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { SearchFunction } from '../src/@types';

export default function Search(props: { handleSubmit: SearchFunction }) {
	const [searchValue, setSearchValue] = React.useState('');

	// const runSearch = async (ingredient: string): Promise<string> => {
	// 	const recipesListRequest = await fetch('http://localhost:3000/recipes/' + ingredient);
	// 	const recipesList = await recipesListRequest.json();
	// 	return recipesList;
	// };

	return (
		<Paper
			component="form"
			sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 0.8, my: 3, mx: 'auto' }}
			onSubmit={(e) => props.handleSubmit(searchValue, e)}
		>
			{/* <IconButton sx={{ p: '10px' }} aria-label="menu">
				<MenuIcon />
			</IconButton> */}
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Search New Recipes"
				value={searchValue}
				inputProps={{ 'aria-label': 'search new recipes' }}
				onChange={(e) => setSearchValue(e.currentTarget.value)}
				// onSubmit={(e) => props.handleSubmit(searchValue, e)}
			/>
			<IconButton
				type="button"
				sx={{ p: '10px' }}
				aria-label="search"
				// onClick={(e) => props.handleSubmit(searchValue, e)}
			>
				<SearchIcon />
			</IconButton>
			{/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
			{/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"></IconButton> */}
		</Paper>
	);
}
