import { useState, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import { NavItem } from '../NavItem/NavItem';
import HomeIcon from '@mui/icons-material/Home';
import { NavPlaylist } from '../NavPlaylist/NavPlaylist';

export const SideNav = ({ spotifyApi, token }) => {
	const [loading, setLoading] = useState(true);
	const [playlists, setPlaylists] = useState([]);
	useEffect(() => {
		async function getPlaylists() {
			if (!spotifyApi) return;
			const data = await spotifyApi.getUserPlaylists();
			setPlaylists(data.body.items);
			setLoading(false);
		}
		getPlaylists();
	}, [spotifyApi, token]);

	const renderPlaylists = () => {
		if (loading) {
			return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => <NavPlaylist loading={loading} key={i} />);
		}
		return playlists.map((playlist, i) => (
			<NavPlaylist key={i} id={playlist.id} name={playlist.name} loading={loading} />
		));
	};
	return (
		<Box
			sx={{
				backgroundColor: 'background.default',
				width: 230,
				height: '100%',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Box p={3} component="img" src="/Spotify_Logo.png" alt="Spotify Logo" sx={{ maxWidth: '75%' }} />
			<NavItem Icon={HomeIcon} name="Home" target="/" />
			<Box px={3} py={1}>
				<Divider sx={{ backgroundColor: '#ffffff40' }} />
			</Box>
			<Box sx={{ overflowY: 'auto', flex: 1 }}>{renderPlaylists()}</Box>
		</Box>
	);
};
