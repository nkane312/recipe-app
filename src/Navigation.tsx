import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

export const Navigation: React.FC = () => {
	// const ref = useRef<HTMLElement>(null);
	// const [isIntersecting, setIntersecting] = useState(true);

	// useEffect(() => {
	// 	if (!ref.current) return;
	// 	const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

	// 	observer.observe(ref.current);
	// 	return () => observer.disconnect();
	// }, []);

	return (
		<header>
			{/* <div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
					isIntersecting ? 'bg-zinc-900/0 border-transparent' : 'bg-zinc-900/500  border-zinc-800 '
				}`}
			> */}
			<Stack
				direction="row"
				spacing={4}
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{window.location.pathname !== '/' ? (
					<Button component={Link} to="/" aria-label="Home" fullWidth={true}>
						<ArrowBackIcon className="w-6 h-6 " />
					</Button>
				) : (
					''
				)}
				<Button component={Link} to="/recipe" fullWidth={true}>
					<Typography variant="h5" component="span">
						Recipes
					</Typography>
				</Button>
			</Stack>
			{/* </div> */}
		</header>
	);
};
