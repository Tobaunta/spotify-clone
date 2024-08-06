import { useState, useEffect } from 'react';
import { Box, Divider } from '@mui/material';

export const SideNav = ({ spotifyApi, token }) => {
	return (
		<Box
			sx={{
                backgroundColor: 'background.default',
				width: 230,
                height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box p={3} component="img" src="/Spotify_Logo.png" alt="Spotify Logo" sx={{ maxWidth: '75%' }} />
			<Box px={3} py={1}>
				<Divider sx={{ backgroundColor: '#ffffff40' }} />
			</Box>
			<Box sx={{ overflowY: 'auto', flex: 1 }}>{/* Playlists */}</Box>
		</Box>
	);
};
