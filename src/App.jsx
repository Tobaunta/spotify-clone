import './App.css';
import { Box } from '@mui/material';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

export default function App({ spotifyApi }) {
	return (
		<Box className="App">
			<Home />
			<Login spotifyApi={spotifyApi} />
		</Box>
	);
}
