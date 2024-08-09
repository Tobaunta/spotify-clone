import { Box, Grid, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { PlayerControls } from '../PlayerControls/PlayerControls';
import { PlayerVolume } from '../PlayerVolume/PlayerVolume';
import { PlayerOverlay } from '../PlayerOverlay/PlayerOverlay';

export const Player = ({ spotifyApi, token }) => {
	const [localPlayer, setLocalPlayer] = useState();
	const [isPaused, setIsPaused] = useState(false);
	const [isActive, setActive] = useState();
	const [currentTrack, setCurrentTrack] = useState();
	const [device, setDevice] = useState();
	const [duration, setDuration] = useState();
	const [progress, setProgress] = useState();
	const [playerOverlayIsOpen, setPlayerOverlayIsOpen] = useState(false);

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
				setDevice(device_id);
				setLocalPlayer(player);
			});

			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			player.addListener('player_state_changed', (state) => {
				if (!state || !state.track_window?.current_track) return;
				console.log(state);
				const duration = state.track_window.current_track.duration_ms / 1000;
				const progress = state.position / 1000;
				setDuration(duration);
				setProgress(progress);
				setCurrentTrack(state.track_window.current_track);
				setIsPaused(state.paused);
				player.getCurrentState().then((state) => {
					!state ? setActive(false) : setActive(true);
				});
			});

			player.connect();
		};
	}, []);

	useEffect(() => {
		if (!localPlayer) return;
		async function connect() {
			await localPlayer.connect();
		}
		connect();
		return () => {
			localPlayer.disconnect();
		};
	}, [localPlayer]);

	/* 	useEffect(() => {
		const tranferPlayback = async () => {
			if (device) {
				const res = await spotifyApi.getMyDevices();
				console.log(res);
				await spotifyApi.transferMyPlayback([device], false);
			}
		};
		tranferPlayback();
	}, [device, spotifyApi]); */

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
				onClick={() => setPlayerOverlayIsOpen((prev) => !prev)}
			>
				<Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
					<Avatar
						src={currentTrack?.album.images[0].url}
						alt={currentTrack?.album.name}
						variant="square"
						sx={{ width: 56, height: 56, marginRight: 2 }}
					/>
					<Box>
						<Typography sx={{ color: 'text.primary', fontSize: 14 }}>{currentTrack?.name}</Typography>
						<Typography sx={{ color: 'text.secondary', fontSize: 10 }}>
							{currentTrack?.artists[0].name}
						</Typography>
					</Box>
				</Grid>
				<Grid
					item
					sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}
					md={4}
				>
					{isActive ? (
						<PlayerControls
							player={localPlayer}
							isPaused={isPaused}
							progress={progress}
							duration={duration}
						/>
					) : (
						<Box>Please transfer playback</Box>
					)}
				</Grid>
				<Grid
					item
					sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center' }}
					md={4}
				>
					<PlayerVolume player={localPlayer} />
				</Grid>
			</Grid>
			<PlayerOverlay
				playerOverlayIsOpen={playerOverlayIsOpen}
				closeOverlay={() => setPlayerOverlayIsOpen(false)}
				player={localPlayer}
				isPaused={isPaused}
				duration={duration}
				progress={progress}
				cover={currentTrack?.album.images[0].url}
				title={currentTrack?.name}
				artist={currentTrack?.artists[0].name}
				isActive={isActive}
			/>
		</Box>
	);
};
