import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, List } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MobileNav = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState(0);

	return (
		<Box sx={{ display: { xs: 'block', md: 'none' } }}>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(_, v) => setValue(v)}
				sx={{ backgroundColor: 'background.paper', color: 'text.secondary' }}
			>
				<BottomNavigationAction label="Home" icon={<Home />} onClick={() => navigate('/')} />
				<BottomNavigationAction label="Library" icon={<List />} onClick={() => navigate('/library')} />
			</BottomNavigation>
		</Box>
	);
};
