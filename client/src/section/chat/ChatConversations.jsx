import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAuth, useConversation, useSocket } from '../../hooks/context';
import { useTranslation } from 'react-i18next';
import { fToNow } from '../../utils/formatTime';
//--------------------------------------------------------

const ChatConversations = () => {
  const { t } = useTranslation(['chat']);
  const {
    authState: { user },
  } = useAuth();
  const { onlineUsers } = useSocket();
  const navigate = useNavigate();
  const {
    conversationState: { conversation, conversations },
    handleGetConversationsByUserId,
  } = useConversation();

  const [conversationFilters, setConversationFilters] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const memoizedHandleGetConversationsByUserId = useCallback(async () => {
    if (user?._id) {
      await handleGetConversationsByUserId(user._id);
    }
  }, [handleGetConversationsByUserId, user?._id]);

  useEffect(() => {
    memoizedHandleGetConversationsByUserId();
  }, [memoizedHandleGetConversationsByUserId, conversation]);

  useEffect(() => {
    const filteredConversations = conversations.filter((conversation) => {
      const otherMember = conversation.members?.find(
        (member) => member._id !== user._id
      );
      return (
        otherMember?.firstName
          ?.toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        otherMember?.lastName
          ?.toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        otherMember?.nickName?.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setConversationFilters(filteredConversations);
  }, [conversations, searchValue, user._id]);

  const handleSelectedConversation = (conversation) => {
    navigate(`/chat/${conversation?._id}`);
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        position: 'sticky',
        top: '4rem',
        zIndex: 1,
        bgcolor: 'background.paper',
        boxShadow: 1,
        height: '100vh',
      }}
    >
      {/* Header */}
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{t('Conversations')}</Typography>
          <MoreHorizIcon sx={{ cursor: 'pointer' }} />
        </Stack>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{ bgcolor: 'white', borderRadius: 1, mt: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            placeholder: t('Search for creators'),
          }}
        />
      </Box>
      {/* Conversation List */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 2,
          maxHeight: 'calc(100vh - 150px)',
          overflowY: 'auto',
        }}
      >
        {conversationFilters.length > 0 ? (
          conversationFilters.map((conversation) => {
            const otherMember = conversation.members?.find(
              (member) => member._id !== user._id
            );
            const isOnline = onlineUsers.includes(otherMember?._id);

            return (
              <Box
                key={conversation._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' },
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                }}
                onClick={() => handleSelectedConversation(conversation)}
              >
                <Box sx={{ position: 'relative', width: 56, height: 56 }}>
                  <Avatar
                    src={otherMember?.avatar}
                    alt={otherMember?.nickName}
                    sx={{ width: '100%', height: '100%' }}
                  />
                  {isOnline && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: 'green',
                        border: '2px solid white',
                      }}
                    />
                  )}
                </Box>
                <Stack sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">
                    {otherMember?.nickName ||
                      `${otherMember?.firstName} ${otherMember?.lastName}`}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {conversation.lastMessage?.content !== '' ? (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{ maxWidth: '70%' }}
                      >
                        {conversation.lastMessage?.content.length > 30
                          ? `${conversation.lastMessage.content.slice(
                              0,
                              30
                            )}...`
                          : conversation.lastMessage?.content}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{ maxWidth: '70%' }}
                      >
                        {t('Sent 1 photo')}
                      </Typography>
                    )}
                    {conversation.lastMessage && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'gray',
                          border: '2px solid white',
                        }}
                      />
                    )}
                    <Typography variant="body2" color="text.secondary">
                      {fToNow(conversation.lastMessage?.createdAt)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            );
          })
        ) : (
          <Typography>{t('No conversation')}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChatConversations;
