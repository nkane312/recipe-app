import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useState } from 'react';
import defaultImage from '../src/assets/default-recipe.svg';
import { Link } from 'react-router';

export default function RecipeCard(props: { id: number; name: string; image: string }) {
	const [imageUrl, setImageUrl] = useState(props.image);

	const handleImageError = () => {
		setImageUrl(defaultImage);
	};

	return (
		<Card
			variant="outlined"
			sx={[
				{
					height: '100%',
					backgroundColor: '#3E3D65',
					color: '#fff',
					width: '100%',
					borderRadius: 3,
				},
				{ '&:hover': { backgroundColor: '#6766a8' } },
				{ '&:focus': { backgroundColor: '#6766a8' } },
			]}
			// className="bg-[#3E3D65] hover:bg-[#6766a8]"
		>
			<Link to={`/recipe/${props.id}`}>
				<CardActionArea>
					<CardMedia
						component="img"
						image={imageUrl}
						alt={props.name}
						onError={handleImageError}
						sx={{
							maxHeight: 231,
							maxWidth: 312,
							margin: 'auto',
							borderStyle: 'outset',
							borderColor: '#2A343F',
						}}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div" color="#fff">
							{props.name}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	);
}
