import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';
// import SearchGrid from './SearchGrid'
import { RecipeList } from '../src/@types';

export default function MainGrid(data: { data: RecipeList }) {
	return (
		<Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
			<Typography component="h2" variant="h6" sx={{ mb: 2 }}>
				Details
			</Typography>
			<Grid container spacing={2} columns={12}>
				<Grid size={{ xs: 12, lg: 12 }}>
					<CustomizedDataGrid data={data.data} />
				</Grid>
			</Grid>
			<Copyright sx={{ my: 4 }} />
		</Box>
	);
}
