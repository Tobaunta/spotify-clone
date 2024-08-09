import { Box, IconButton, Container, Grid, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PlayerControls } from '../PlayerControls/PlayerControls';

export const PlayerOverlay = ({
	playerOverlayIsOpen,
	closeOverlay,
	player,
	isPaused,
	duration,
	progress,
	title,
	artist,
	cover,
	isActive
}) => {
	return (
		<Box
			id="PlayerOverlay"
			sx={{
				width: '100%',
				height: 'calc(100vh - 75px)',
				backgroundColor: 'background.paper',
				display: { xs: 'block', md: 'none' },
				position: 'fixed',
				top: 0,
				left: 0,
				transition: 'all 0.3s',
				transform: playerOverlayIsOpen ? 'translateY(0)' : 'translateY(100vh)'
			}}
		>
			<Container
				sx={{
					height: '100%',
					background: 'linear-gradient(0deg, #121212 0%, #39d47240 100%)'
				}}
			>
				<Grid container direction={'column'} justifyContent={'space-between'} sx={{ height: '100%' }}>
					<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
						<IconButton onClick={closeOverlay} sx={{ paddingLeft: 0 }}>
							<KeyboardArrowDownIcon fontSize="large" sx={{ color: 'text.primary' }} />
						</IconButton>
					</Grid>
					<Grid
						item
						xs={5}
						sx={{ backgroundImage: `url(${cover})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
					/>
					<Grid item xs={1}>
						<Typography sx={{ color: 'text.primary', fontSize: 28 }}>{title}</Typography>
						<Typography sx={{ color: 'text.secondary', fontSize: 18 }}>{artist}</Typography>
					</Grid>
					<Grid item xs={2}>
						{isActive ? (
							<PlayerControls
								player={player}
								isPaused={isPaused}
								progress={progress}
								duration={duration}
							/>
						) : (
							<Box>Please transfer playback</Box>
						)}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};
