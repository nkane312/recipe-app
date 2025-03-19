import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function RecipeCard(props: { name: string; image: string }) {
	return (
		<Card variant="outlined" sx={{ height: '100%', backgroundColor: '#0F3325', color: '#fff' }}>
			<CardActionArea>
				<CardMedia component="img" image={props.image} alt={props.name} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{props.name}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
