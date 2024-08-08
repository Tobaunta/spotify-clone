import { Stack, Typography, Slider, Box, IconButton, Icon } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { useEffect, useState } from 'react';

export const PlayerControls = ({ player, isPaused, progress, duration }) => {
	const [currentProgress, setCurrentProgress] = useState(progress);
	const skipStyle = { width: 28, height: 28 };
	const playStyle = { width: 38, height: 38 };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!isPaused && player) {
                setCurrentProgress((prevProgress) => prevProgress + 1);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [isPaused, player]);

    useEffect(() => {
        setCurrentProgress(progress);
    }, [progress]);

	return (
		<Stack direction="column" spacing={2} justify="center" alignItems={'center'} sx={{ width: '100%' }}>
			<Stack direction="row" spacing={1} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						setCurrentProgress(0);
						player.nextTrack();
					}}
				>
					<SkipPrevious sx={skipStyle} />
				</IconButton>
				<IconButton size="small" sx={{ color: 'text.primary' }} onClick={() => player.togglePlay()}>
					{isPaused ? <PlayArrow sx={playStyle} /> : <Pause sx={playStyle} />}
				</IconButton>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						setCurrentProgress(0);
						player.nextTrack();
					}}
				>
					<SkipNext sx={skipStyle} />
				</IconButton>
			</Stack>
			<Stack spacing={2} direction={'row'} justifyContent={'center'} alignItems={'center'} width={'75%'}>
				<Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{formatTime(currentProgress)}</Typography>
				<Slider
					value={currentProgress}
					min={0}
					max={duration}
					step={1}
					size="medium"
					onChange={(e) => {
						setCurrentProgress(e.target.value), console.log(e.target.value);
					}}
					onChangeCommitted={() => player.seek(currentProgress * 1000)}
				/>
				<Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{formatTime(duration)}</Typography>
			</Stack>
		</Stack>
	);
};
