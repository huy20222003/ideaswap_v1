// components/ChatArea.js
import { Box, Typography, Avatar, Stack } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';

const ChatArea = ({ localMessages, user, conversation }) => {
  const navigate = useNavigate();

  const handleNavigateToAccount = (userId) => {
    navigate(`/account/${userId}`);
  };

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        p: '1rem',
        backgroundImage: `url(${conversation?.wallpaperUrl})`,
        backgroundSize: 'cover', // Đảm bảo hình nền phủ toàn bộ khu vực chứa
        backgroundPosition: 'center', // Căn giữa hình nền
        backgroundRepeat: 'no-repeat', // Không lặp lại hình nền
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '70px',
      }}
    >
      {localMessages.length > 0 ? (
        <>
          {localMessages.map((message) => (
            <Box
              key={message._id}
              sx={{
                display: 'flex',
                flexDirection:
                  message.senderID?._id === user?._id ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                mb: '0.5rem',
              }}
            >
              <Avatar
                src={message.senderID?.avatar}
                alt={`${message.senderID?.firstName} ${message.senderID?.lastName}`}
                onClick={() => handleNavigateToAccount(message.senderID?._id)}
                sx={{ cursor: 'pointer' }}
              />
              <Stack
                sx={{
                  gap: 2,
                  flexDirection:
                    message.senderID?._id === user._id ? 'row-reverse' : 'row',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    maxWidth: '60%',
                    p: '0.5rem 1rem',
                    borderRadius: '10px',
                    bgcolor:
                      message.senderID?._id === user._id
                        ? 'primary.main'
                        : 'grey.300',
                    color:
                      message.senderID?._id === user._id ? 'white' : 'black',
                    ml: message.senderID?._id === user._id ? 0 : '0.5rem',
                    mr: message.senderID?._id === user._id ? '0.5rem' : 0,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {message.type === 'text' ? (
                    <Typography variant="body2">{message.content}</Typography>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: 'auto',
                      }}
                    >
                      <img
                        src={message.fileUrl}
                        alt="Sent image"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px', // Kích thước cố định cho hình ảnh
                          objectFit: 'contain',
                          borderRadius: '0.5rem',
                        }}
                      />
                    </Box>
                  )}
                  <Typography variant="caption" color="textSecondary">
                    {dayjs(message.createdAt).format('HH:mm')}
                  </Typography>
                </Box>
                <ReplyIcon sx={{ color: 'gray' }} />
              </Stack>
            </Box>
          ))}
        </>
      ) : (
        <Typography variant="body2" color="text.secondary" align="center">
          No messages yet
        </Typography>
      )}
    </Box>
  );
};

ChatArea.propTypes = {
  localMessages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      senderID: PropTypes.shape({
        _id: PropTypes.string,
        avatar: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
      content: PropTypes.string,
      fileUrl: PropTypes.string,
      type: PropTypes.oneOf(['text', 'file']),
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  conversation: PropTypes.shape({
    wallpaperUrl: PropTypes.string,
  }),
};

export default ChatArea;
