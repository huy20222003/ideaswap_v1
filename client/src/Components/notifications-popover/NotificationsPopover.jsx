import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
// utils
import { fToNow } from '../../utils/formatTime';
// components
import Iconify from '../iconify';
import Scrollbar from '../scrollbar';
// context
import { useNotification, useAuth, useSocket } from '../../hooks/context';
// i18n
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const {
    notificationState: { notifications },
    handleGetNotificationsByUserId,
    handleUpdateNotifications,
  } = useNotification();
  const { t } = useTranslation('notification');

  const {
    authState: { user, isAuthenticated },
  } = useAuth();

  const { socket } = useSocket();

  useEffect(() => {
    if (isAuthenticated) {
      handleGetNotificationsByUserId(user?._id);
    }
  }, [handleGetNotificationsByUserId, isAuthenticated, user?._id]);


  useEffect(() => {
    if (socket && user?._id) {
      socket.on('recivedNotification', (notification) => {
        notifications.unshift(notification);
      });
    }
    return () => {
      socket && socket.off('recivedNotification');
    };
  }, [socket, user?._id, handleGetNotificationsByUserId, notifications]);

  const totalUnRead = notifications.filter(
    (item) => item.isUnRead === true
  ).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = async () => {
    const notificationFilters = notifications
      .filter((notification) => notification?.isUnRead === true)
      .map((notification) => notification?._id);

    await handleUpdateNotifications({ data: notificationFilters });
  };

  return (
    <>
      <IconButton
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" sx={{ color: 'white' }} />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('You have')} {totalUnRead} {t('unread messages')}
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <DoneAllIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline' }}
              >
                {t('New')}
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
              />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline' }}
              >
                {t('Before that')}
              </ListSubheader>
            }
          >
            {notifications
              .slice(2, notifications.length)
              .map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                />
              ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            {t('View All')}
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.string,
    _id: PropTypes.string,
    isUnRead: PropTypes.bool,
    description: PropTypes.string,
    imageUrl: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { imageUrl, description } = renderContent(notification);
  const { handleUpdateNotifications } = useNotification();

  const handleUpdateRead = async () => {
    if (notification?.isUnRead === false) return;
    const unReadNotificationArr = [];
    unReadNotificationArr.push(notification?._id);
    await handleUpdateNotifications({ data: unReadNotificationArr });
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
      onClick={handleUpdateRead}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{imageUrl}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={description}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const description = (
    <Typography
      component="span"
      variant="body2"
      sx={{ color: 'text.secondary' }}
    >
      {notification.description}
    </Typography>
  );
  return {
    imageUrl: notification.imageUrl ? (
      <img alt={notification.description} src={notification.imageUrl} />
    ) : null,
    description,
  };
}
