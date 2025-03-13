import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MainGrid from '../components/MainGrid';
import AppTheme from '../theme/AppTheme';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { dataGridCustomizations } from '../theme/dataGrid';
import { RecipeList } from './@types';

const xThemeComponents = {
	...dataGridCustomizations,
};

export default function Dashboard(props: { data: RecipeList; disableCustomTheme?: boolean }) {
	console.log(props.data);
	return (
		<AppTheme {...props} themeComponents={xThemeComponents}>
			<CssBaseline enableColorScheme />
			<Box sx={{ display: 'flex' }}>
				{/* Main content */}
				<Box
					component="main"
					sx={(theme) => ({
						flexGrow: 1,
						backgroundColor: theme.vars
							? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
							: alpha(theme.palette.background.default, 1),
						overflow: 'auto',
					})}
				>
					<Stack
						spacing={2}
						sx={{
							alignItems: 'center',
							mx: 3,
							pb: 5,
							mt: { xs: 8, md: 0 },
						}}
					>
						<MainGrid data={props.data} />
					</Stack>
				</Box>
			</Box>
		</AppTheme>
	);
}
