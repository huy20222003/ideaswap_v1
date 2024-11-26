import { Box, Grid, Drawer, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'; // Import CloseIcon
import { useState, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import Searchbar from './Searchbar';
import Navigation from './nav';
import LanguagePopover from '../language-popover';
import NotificationsPopover from '../notifications-popover';
import AccountPopover from '../account-poover';
import SvgColor from '../svg-color';
import NavSection from '../nav-section';
import { useAuth } from '../../hooks/context';
import { useTranslation } from 'react-i18next';

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const { t } = useTranslation('navbar');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const {
    authState: { user, isAuthenticated },
  } = useAuth();

  const navConfig = [
    {
      path: '/dashboard/app',
      icon: icon('ic_home'),
      title: t('Dashboard'),
    },
    {
      path: '/dashboard/course',
      icon: icon('ic_play-alt'),
      title: t('Courses'),
    },
    {
      path: '/dashboard/document',
      icon: icon('ic_folder-download'),
      title: t('Documents'),
    },
    {
      path: user ? `/account/${user._id}` : '/',
      icon: icon('ic_portrait'),
      title: t('Account'),
    },
    {
      path: '/dashboard/donate',
      icon: icon('ic_hands-heart'),
      title: t('Donate'),
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        height: '4rem',
        position: 'fixed',
        zIndex: 99,
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'opacity 0.3s ease',
        opacity: scrollPosition > 200 ? 0.9 : 1,
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={0} md={3} display={{ xs: 'none', md: 'block' }}>
          <Searchbar />
        </Grid>
        <Grid item xl={6} md={6} xs={6}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={{ xs: 'flex-start', md: 'center' }}
          >
            {isSmallScreen ? (
              <IconButton onClick={toggleDrawer}>
                <MenuIcon sx={{ color: 'white' }} />
              </IconButton>
            ) : (
              <Navigation />
            )}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '4rem',
            }}
          >
            {/* LanguagePopover will not be displayed on small screens */}
            <Box sx={{ m: '0 1rem' }}>
              <LanguagePopover />
            </Box>
            {isAuthenticated && (
              <Box sx={{ m: '0 1rem' }}>
                <NotificationsPopover />
              </Box>
            )}
            <Box sx={{ m: '0 1rem' }}>
              <AccountPopover />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: '15rem', // Thiết lập chiều rộng mong muốn
          '& .MuiDrawer-paper': {
            width: '15rem', // Đảm bảo nội dung trong drawer cũng có chiều rộng tương tự
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            padding: '1rem',
          }}
        >
          <IconButton
            onClick={toggleDrawer} // Close drawer when button is clicked
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              color: 'black',
              zIndex: theme.zIndex.modal,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ mb: '1rem' }}>
            <Typography variant="h6">Menu</Typography>
          </Box>
          <NavSection data={navConfig} isOpen={true} onClose={toggleDrawer} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
