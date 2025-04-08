import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridSlotProps, GridRow } from '@mui/x-data-grid';
import { RecipeList } from '../src/@types';
import { Link } from 'react-router';
// import { columns, rows } from '../internals/data/gridData';

const columns: GridColDef[] = [
	{
		field: 'name',
		headerName: 'Recipe',
		width: 500,
		// renderCell: (params) => <Link to={'recipe/' + params.row.slug}>{params.row.name}</Link>,
	},
	{ field: 'servings', headerName: 'Servings', width: 200 },
	{
		field: 'cookTime',
		headerName: 'Cook Time (in minutes)',
		width: 200,
	},
	{
		field: 'timestamp',
		headerName: 'Date Added',
		width: 200,
	},
];

export default function CustomizedDataGrid(data: { data: RecipeList }) {
	// console.log(data.data);
	const recipeArray: object[] = [];
	// const linkArr: JSX.Element[] = [];
	data.data.map((recipe) => {
		const newObject = {
			id: recipe._id,
			name: recipe.name,
			slug: recipe.slug,
			servings: recipe.servings,
			cookTime: recipe.cookTime,
			timestamp: new Date(recipe.timestamp).toDateString(),
			// slug: link,
			// slug: <Link to={'recipe/' + recipe.slug}>Go to</Link>,
		};
		recipeArray.push(newObject);
	});
	const rows: GridRowsProp = recipeArray;

	return (
		<div style={{ height: 300, width: '100%' }}>
			<DataGrid
				data-testid="recipe-dashboard"
				rows={rows}
				columns={columns}
				slots={{
					row: (params: GridSlotProps['row']) => (
						<Link to={'recipe/' + params.row.slug}>
							<GridRow {...params} />
						</Link>
					),
				}}
			/>
		</div>
	);
}
