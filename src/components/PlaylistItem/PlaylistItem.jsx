import { Avatar, Box, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const PlaylistItem = ({ isLoading, name, images, id }) => {
    const navigate = useNavigate();
	if (isLoading) {
		return (
			<ListItem disablePadding>
				<ListItemButton>
					<ListItemAvatar sx={{ marginRight: '16px' }}>
						<Skeleton variant="square" width={60} height={60} />
					</ListItemAvatar>
					<Skeleton variant="text" width={150} height={20} />
				</ListItemButton>
			</ListItem>
		);
	}

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={() => navigate(`/playlist/${id}`)}>
				<ListItemAvatar sx={{ marginRight: '16px' }}>
					<Avatar src={images?.[0].url} variant="square" width={60} height={60} />
				</ListItemAvatar>
				<ListItemText primary={name} sx={{ color: 'text.primary' }} />
			</ListItemButton>
		</ListItem>
	);
};
