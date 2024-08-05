import { Box, Button } from '@mui/material';
import { accessUrl } from '../config/config';

export const Login = () => {
	return (
		<Box
			sx={{
				backgroundColor: 'background.paper',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<img
				src="/Spotify_Logo.png"
				alt="Spotify Logo"
				style={{ marginBottom: 300, width: '70%', maxWidth: 500 }}
			/>

			<Button variant="contained" color="primary" size="large" href={accessUrl}>
				Login to Spotify
			</Button>
		</Box>
	);
};
