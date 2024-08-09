import { Box, List, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { PlaylistItem } from '../components/PlaylistItem/PlaylistItem';

export const Library = ({ spotifyApi, token }) => {
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

	const renderPlaylistItems = () => {
		if (loading) {
			return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => <PlaylistItem loading={loading} key={i} />);
		}

		return playlists.map((playlist, i) => <PlaylistItem key={i} loading={loading} {...playlist} />);
	};
	return (
		<Box
			id="library"
			px={3}
			sx={{
				display: { xs: 'flex', md: 'none' },
				backgroundColor: 'background.default',
				flex: 1,
				flexDirection: 'column',
				overflowY: 'auto'
			}}
		>
			<Typography py={3} sx={{ color: 'text.primary', fontSize: 30 }}>
				Your library
			</Typography>
			<List>{renderPlaylistItems()}</List>
		</Box>
	);
};
