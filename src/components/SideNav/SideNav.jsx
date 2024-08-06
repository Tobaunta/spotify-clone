import { useState, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import { NavItem } from '../NavItem/NavItem';
import HomeIcon from '@mui/icons-material/Home';

export const SideNav = ({ spotifyApi, token }) => {
    useEffect(() => {
        async function getPlaylists() {
            if(!spotifyApi) return;
            const data = await spotifyApi.getUserPlaylists();
            console.log(data.body)
        }

        getPlaylists();
    }, [spotifyApi, token])
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
			<NavItem Icon={HomeIcon} name="Home" target="/" />
			<Box px={3} py={1}>
				<Divider sx={{ backgroundColor: '#ffffff40' }} />
			</Box>
			<Box sx={{ overflowY: 'auto', flex: 1 }}>{/* Playlists */}</Box>
		</Box>
	);
};
