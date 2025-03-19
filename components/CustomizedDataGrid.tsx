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
	// { field: 'name', headerName: 'Recipe', width: 300 },
	// {
	// 	field: 'slug',
	// 	headerName: 'Page',
	// 	width: 150,
	// 	renderCell: (params) => <Link to={'recipe/' + params.row.slug}>Go to Recipe</Link>,
	// },
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
			// slug: link,
			// slug: <Link to={'recipe/' + recipe.slug}>Go to</Link>,
		};
		recipeArray.push(newObject);
	});
	const rows: GridRowsProp = recipeArray;

	return (
		<div style={{ height: 300, width: '100%' }}>
			<DataGrid
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
