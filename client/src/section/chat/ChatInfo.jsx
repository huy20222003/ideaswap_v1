import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Avatar,
  Stack,
  Typography,
  IconButton,
  Input,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import AbcIcon from '@mui/icons-material/Abc';
import { useConversation, useAuth, useSocket } from '../../hooks/context';
import { useTranslation } from 'react-i18next';
import FormDeleteConversation from '../../Components/FormDialog/chat/FormDialogDeleteConversation';

const ChatInfo = () => {
  const {
    conversationState: { conversation },
    setOpenFormDeleteConversation,
    handleGetOneConversations,
    handleUpdateConversation,
  } = useConversation();

  const { socket } = useSocket();

  const {
    authState: { user },
  } = useAuth();

  const { _id } = useParams();

  const { t } = useTranslation(['chat']);

  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const handleNavigateToAccount = (userId) => {
    navigate(`/account/${userId}`);
  };

  const otherMember = conversation?.members?.find(
    (member) => member?._id !== user?._id
  );

  const handleDeleteConversation = useCallback(async () => {
    const response = await handleGetOneConversations(_id);
    if (response.success) {
      setOpenFormDeleteConversation(true);
    }
  }, [_id, handleGetOneConversations, setOpenFormDeleteConversation]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateWallpaper = useCallback(() => {
    if (image) {
      socket.emit('updateConversationWallpaper', {
        conversationId: _id,
        wallpaperBase64: image,
      });
    }
  }, [_id, image, socket]);

  if (image) {
    handleUpdateWallpaper();
  }

  useEffect(() => {
    if (socket) {
      socket.on('conversationWallpaperUpdated', (updatedConversation) => {
        handleUpdateConversation(updatedConversation);
      });

      return () => {
        socket.off('conversationWallpaperUpdated');
      };
    }
  }, [socket, handleUpdateConversation]);

  const handleChangeWallpaper = () => {
    document.getElementById('upload-image').click();
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        textAlign: 'center',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ mt: { xs: 2, sm: 4, md: 4, xl: 6 } }}>
        <Stack spacing={2} alignItems="center">
          <Avatar
            src={otherMember?.avatar}
            alt={otherMember?.firstName + ' ' + otherMember?.lastName}
            sx={{ width: 80, height: 80, border: '3px solid primary.main' }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {otherMember?.nickName
              ? otherMember?.nickName
              : `${otherMember?.firstName} ${otherMember?.lastName}`}
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Stack alignItems="center">
            <IconButton
              onClick={() => handleNavigateToAccount(otherMember?._id)}
            >
              <AccountCircleIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.primary' }}>
              {t('Account')}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Stack
          spacing={2}
          sx={{ width: '100%', maxWidth: 400, margin: '0 auto' }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <AbcIcon sx={{ color: 'action.active' }} />
            <Typography variant="subtitle1">{t('Change nickname')}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Input
              accept="image/*"
              id="upload-image"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor="upload-image">
              <IconButton
                component="span"
                sx={{
                  bgcolor: 'background.default',
                  '&:hover': { bgcolor: 'background.paper' },
                }}
                onClick={handleChangeWallpaper}
              >
                <ImageIcon sx={{ color: 'action.active' }} />
              </IconButton>
            </label>
            <Typography
              variant="subtitle1"
              sx={{ ml: 1, cursor: 'pointer' }}
              onClick={handleChangeWallpaper}
            >
              {t('Change wallpaper')}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ cursor: 'pointer', color: 'error.main' }}
            onClick={handleDeleteConversation}
          >
            <DeleteIcon />
            <Typography variant="subtitle1">
              {t('Delete conversation')}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <FormDeleteConversation />
    </Box>
  );
};

export default ChatInfo;
