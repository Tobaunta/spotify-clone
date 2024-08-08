import { Box, Grid, Typography, Avatar } from '@mui/material';

export const Player = ({ spotifyApi }) => {
	return (
		<Box>
			<Grid container>
				<Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
					<Avatar src={null} alt={null} variant="square" />
					<Box>
						<Typography>Title</Typography>
						<Typography>Artist</Typography>
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
