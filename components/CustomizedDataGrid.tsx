import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridSlotProps, GridRow } from '@mui/x-data-grid';
import { RecipeList } from '../src/@types';
import { Link } from 'react-router';
// import { columns, rows } from '../internals/data/gridData';

// const rows: GridRowsProp = [
// 	{ id: 1, col1: 'Hello', col2: 'World' },
// 	{ id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
// 	{ id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

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
		// const link = <Link to={'recipe/' + recipe.slug}>Go to</Link>;
		// linkArr.push(link);
		console.log(recipe.slug);
		const newObject = {
			id: recipe._id,
			name: recipe.name,
			slug: recipe.slug,
			// slug: link,
			// slug: <Link to={'recipe/' + recipe.slug}>Go to</Link>,
		};
		// console.log(recipe.slug);
		// console.log(newObject);
		recipeArray.push(newObject);
	});
	const rows: GridRowsProp = recipeArray;
	console.log(rows);
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

// export default function CustomizedDataGrid() {
//   return (
//     <DataGrid
//       checkboxSelection
//       rows={rows}
//       columns={columns}
//       getRowClassName={(params) =>
//         params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
//       }
//       initialState={{
//         pagination: { paginationModel: { pageSize: 20 } },
//       }}
//       pageSizeOptions={[10, 20, 50]}
//       disableColumnResize
//       density="compact"
//       slotProps={{
//         filterPanel: {
//           filterFormProps: {
//             logicOperatorInputProps: {
//               variant: 'outlined',
//               size: 'small',
//             },
//             columnInputProps: {
//               variant: 'outlined',
//               size: 'small',
//               sx: { mt: 'auto' },
//             },
//             operatorInputProps: {
//               variant: 'outlined',
//               size: 'small',
//               sx: { mt: 'auto' },
//             },
//             valueInputProps: {
//               InputComponentProps: {
//                 variant: 'outlined',
//                 size: 'small',
//               },
//             },
//           },
//         },
//       }}
//     />
//   );
// }
