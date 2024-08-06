import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from '@mui/system';
import { themeOptions } from './theme/material-theme';
import SpotifyWebApi from 'spotify-web-api-node';
import { redirectURI } from './config/config';
import { BrowserRouter } from 'react-router-dom';

const spotifyApi = new SpotifyWebApi({
	clientId: import.meta.env.VITE_CLIENT_ID,
	clientSecret: import.meta.env.VITE_CLIENT_SECRET,
	redirectUri: redirectURI
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={themeOptions}>
				<App spotifyApi={spotifyApi} />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
