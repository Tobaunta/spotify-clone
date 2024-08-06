import './App.css';
import { Box } from '@mui/material';
import { Dashboard } from './components/Dashboard/Dashboard';

export default function App({ spotifyApi }) {
	return (
		<Box className="App">
			<Dashboard spotifyApi={spotifyApi} />
		</Box>
	);
}
