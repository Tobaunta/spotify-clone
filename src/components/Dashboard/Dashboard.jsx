import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { Library } from '../../pages/Library';
import { Playlist } from '../../pages/Playlist';
import { SideNav } from '../SideNav/SideNav';
import { Player } from '../Player/Player';
import { MobileNav } from '../MobileNav/MobileNav';
import { getAccessTokenFromStorage } from '../../utils/getAccessTokenFromStorage';
import { useEffect, useState } from 'react';

export const Dashboard = ({ spotifyApi }) => {
	const [token, setToken] = useState(getAccessTokenFromStorage());

	useEffect(() => {
		async function onMount() {
			await spotifyApi.setAccessToken(token);
		}
		if (token) {
			onMount();
		}
	}, []);
	return (
		<Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
				<SideNav spotifyApi={spotifyApi} token={token} />
				<Routes>
					<Route path="/playlist/:id" element={<Playlist spotifyApi={spotifyApi} token={token} />} />
					<Route path="/library" element={<Library spotifyApi={spotifyApi} token={token} />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</Box>
			{token && <Player spotifyApi={spotifyApi} token={token} />}
			<MobileNav />
		</Box>
	);
};
