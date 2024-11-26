import { useState } from 'react';
import {
  Drawer,
  Box,
  Card,
  Avatar,
  Typography,
  List,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../../hooks/context';
import {
  MainListItems,
  SecondaryListItems,
} from '../../../Components/ListItem/ListItem';

const SideBar = () => {
  const {
    authState: { user },
  } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isSmallScreen && (
        <IconButton
          sx={{
            position: 'fixed',
            top: '1rem',
            left: '1rem',
            zIndex: 999,
          }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
      )}
      {isSmallScreen ? (
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': {
              width: '20rem',
            },
          }}
        >
          <Card sx={{ my: '4rem' }}>
            <Box
              sx={{
                width: '100%',
                height: '10rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Avatar
                alt={user?.firstName + user?.lastName}
                src={user?.avatar}
                sx={{ width: 100, height: 100, mb: '1rem' }}
              />
              <Typography variant="body1">
                {user?.firstName + ' ' + user?.lastName}
              </Typography>
            </Box>
            <Box sx={{ mt: '2rem' }}>
              <List component="nav">
                <MainListItems />
                <Divider sx={{ my: 1 }} />
                <SecondaryListItems />
              </List>
            </Box>
          </Card>
        </Drawer>
      ) : (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '15rem',
            backgroundColor: '#fff', // Thay đổi màu nền tùy thuộc vào thiết kế của bạn
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Thêm boxShadow
          }}
        >
          <Card sx={{ my: '4rem' }}>
            <Box
              sx={{
                width: '100%',
                height: '10rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Avatar
                alt={user?.firstName + user?.lastName}
                src={user?.avatar}
                sx={{ width: 100, height: 100, mb: '1rem' }}
              />
              <Typography variant="body1">
                {user?.firstName + ' ' + user?.lastName}
              </Typography>
            </Box>
            <Box sx={{ mt: '2rem' }}>
              <List component="nav">
                <MainListItems />
                <Divider sx={{ my: 1 }} />
                <SecondaryListItems />
              </List>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};

export default SideBar;
