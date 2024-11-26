import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Stack,
  Box,
  Button,
  Grid,
  Divider,
  IconButton,
  Drawer,
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import HeaderLogo from './HeaderLogo';
//i18n
import { useTranslation } from 'react-i18next';
//component
import LanguagePopover from '../../../Components/language-popover';
//----------------------------------------------

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: black;
  padding: 8px 16px;
  font-size: 0.8rem;
  &:hover {
    color: #229a16;
  }
  &.active {
    color: #229a16;
  }
`;

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation('auth');

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <Stack
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-around',
        p: { xs: 2, md: 0 },
      }}
    >
      <NavLinkStyled to="/dashboard/app" onClick={toggleDrawer(false)}>
        {t('Home')}
      </NavLinkStyled>
      <NavLinkStyled to="/dashboard/course" onClick={toggleDrawer(false)}>
        {t('Course')}
      </NavLinkStyled>
      <NavLinkStyled to="/dashboard/document" onClick={toggleDrawer(false)}>
        {t('Document')}
      </NavLinkStyled>
      <NavLinkStyled to="/dashboard/donate" onClick={toggleDrawer(false)}>
        {t('Donate')}
      </NavLinkStyled>
      <LanguagePopover />

      <Stack
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: '1rem',
        }}
      >
        <Button variant="text" href="/auth/login">
          {t('Login')}
        </Button>
        <Button variant="outlined" href="/auth/register" sx={{ px: '2rem' }}>
          {t('Register')}
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <Box>
      <Grid
        container
        sx={{
          alignItems: 'center',
          height: '4rem',
          justifyContent: 'space-between',
        }}
      >
        <Grid item xs={6} md={6}>
          <HeaderLogo />
        </Grid>
        <Grid item xs={6} md={6} display="flex" justifyContent="flex-end">
          {isMobile ? (
            <IconButton onClick={toggleDrawer(true)} sx={{ color: 'black' }}>
              <MenuIcon />
            </IconButton>
          ) : (
            menuItems
          )}
        </Grid>
      </Grid>

      <Divider />
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {menuItems}
      </Drawer>
    </Box>
  );
};

export default Header;
