import { Box, Button } from '@mui/material';

export const Home = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 5
			}}
		>
			<Box component="img" src="/profile.jpg" alt="Tobaunta Torkelsson" sx={{ maxWidth: 200, maxHeight: 200 }} />
			<Button variant="contained" size="large" href="https://tobaunta.torkelsson.online">
				Portfolio
			</Button>
		</Box>
	);
};
