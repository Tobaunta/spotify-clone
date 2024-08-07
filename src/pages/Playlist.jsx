import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { SongTable } from '../components/SongTable/SongTable';

export const Playlist = (spotifyApi, token) => {
	const [playlistInfo, setPlaylistInfo] = useState(null);
	const [tracks, setTracks] = useState([]);
	const [status, setStatus] = useState({ isLoading: true, isError: false });
	const { id } = useParams();

	const formattedTracks = useCallback(
		(tracks) =>
			tracks.map((item, i) => {
				const { track } = item;
				track.contextUri = `spotify:playlist:${id}`;
				track.position = i;
				return track;
			}),
		[id]
	);

	useEffect(() => {
		const getData = async () => {
			setStatus({ isLoading: true, isError: null });
			try {
				const playlistDetails = await spotifyApi.getPlaylist(id);
				setPlaylistInfo({
					image: playlistDetails.body.images[0].url,
					name: playlistDetails.body.name
				});
				const { tracks } = playlistDetails.body.tracks;
				const formattedTracks = formatTracks(tracks);
				setTracks(formattedTracks);
			} catch (error) {
				console.error(error);
				setStatus({ isLoading: false, isError: error });
			}
			getData().finally(() => setStatus({ isLoading: false, isError: null }));
		};
	}, [id, formattedTracks]);
	return (
		<Box id="playlist__page" sx={{ backgroundColor: 'background.paper', flex: 1, overflowY: 'auto' }}>
			<Box
				p={{ xs: 3, md: 4 }}
				sx={{
					width: '100%',
					background: 'linear-gradient(0deg, #121212 0%, #1bd76060 100%)',
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: { xs: 'flex-start', md: 'flex-end', lg: 'center' },
					gap: 3,
					boxSizing: 'border-box',
					flexDirection: { xs: 'column', md: 'row' }
				}}
			>
				{status.isLoading ? (
					<Skeleton
						variant="square"
						sx={{ width: { xs: '100%', md: 235 }, height: { xs: '100%', md: 235 } }}
					/>
				) : (
					<Avatar
						src={playlistInfo?.image}
						variant="square"
						alt={playlistInfo?.name}
						sx={{ boxShadow: 15, width: { xs: '100%', md: 235 }, height: { xs: '100%', md: 235 } }}
					/>
				)}
				<Box>
					<Typography sx={{ fontSize: 12, fontWeight: 'bold', color: 'text.primary' }}>Playlist</Typography>
					{status.isLoading ? (
						<Skeleton variant="text" sx={{ fontSize: { xs: 42, md: 72 }, width: 300 }} />
					) : (
						<Typography sx={{ fontSize: { xs: 42, md: 72 }, fontWeight: 'bold', color: 'text.secondary' }}>
							{playlistInfo?.name}
						</Typography>
					)}
				</Box>
			</Box>
			<SongTable />
		</Box>
	);
};
