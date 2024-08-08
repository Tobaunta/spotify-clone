import { Box, Grid, Typography, Avatar } from '@mui/material';
import { useEffect } from 'react';

export const Player = ({ spotifyApi, token }) => {

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'Spotify-Clone',
				getOAuthToken: (cb) => {
					cb(token);
				},
				volume: 0.5
			});

			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
			});

			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

            player.addListener('player_state_changed', (state) => {
                console.log(state);
            });

			player.connect();
		};
	}, []);

	return (
		<Box>
			<Grid
				container
				px={3}
				sx={{
					backgroundColor: 'background.paper',
					height: 100,
					cursor: { xs: 'pointer', md: 'auto' },
					width: '100%',
					borderTop: '1px solid #292929'
				}}
			>
				<Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
					<Avatar src={null} alt={null} variant="square" sx={{ width: 56, height: 56, marginRight: 2 }} />
					<Box>
						<Typography sx={{ color: 'text.primary', fontSize: 14 }}>Title</Typography>
						<Typography sx={{ color: 'text.secondary', fontSize: 10 }}>Artist</Typography>
					</Box>
				</Grid>
				<Grid
					item
					sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}
					md={4}
				>
					<Typography>Player Controls</Typography>
				</Grid>
				<Grid
					item
					sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center' }}
					md={4}
				>
					<Typography>Volume Controls</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};
