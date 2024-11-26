import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from '@mui/material';
//context
import { useAuth, useRole, useConversation } from '../../hooks/context';
//js-cookie
import Cookie from 'js-cookie';
//i18n
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const {
    authState: { user, isAuthenticated },
  } = useAuth();
  const {
    conversationState: { conversations },
  } = useConversation();
  const { t } = useTranslation('navbar');

  const {
    roleState: { roles },
    handleGetAllRoles,
  } = useRole();

  useEffect(() => {
    isAuthenticated && handleGetAllRoles();
  }, [handleGetAllRoles, isAuthenticated]);

  const newUser = {
    ...user,
    roleName: roles.find((role) => role?._id === user?.roleID),
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    navigate('/auth/login');
    Cookie.remove('user');
  };

  const handleNavigate = (data) => {
    switch (data) {
      case 'dashboard':
        navigate('/dashboard/app');
        break;
      case 'chat':
        navigate(`/chat/${conversations[0]?._id}`);
        break;
      case 'setting':
        navigate('/setting/profile');
        break;
      case 'login':
        navigate('/auth/login');
        break;
      case 'register':
        navigate('/auth/register');
        break;
      case 'creator':
        navigate('/creator/dashboard');
        break;
      default:
        navigate('/auth/login');
    }
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={user?.avatar} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {isAuthenticated ? (
            <>
              <MenuItem onClick={() => handleNavigate('dashboard')}>
                {t('Dashboard')}
              </MenuItem>
              <MenuItem onClick={() => handleNavigate('chat')}>
                {t('Chat with the Creator')}
              </MenuItem>
              <MenuItem onClick={() => handleNavigate('setting')}>
                {t('Setting')}
              </MenuItem>
              {newUser?.roleName?.name == 'creator' ? (
                <MenuItem onClick={() => handleNavigate('creator')}>
                  {t('Creator')}
                </MenuItem>
              ) : (
                ''
              )}
            </>
          ) : (
            ''
          )}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {isAuthenticated ? (
          <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
            {t('Logout')}
          </MenuItem>
        ) : (
          <>
            <MenuItem onClick={() => handleNavigate('login')} sx={{ m: 1 }}>
              {t('Login')}
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('register')} sx={{ m: 1 }}>
              {t('Register')}
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}
