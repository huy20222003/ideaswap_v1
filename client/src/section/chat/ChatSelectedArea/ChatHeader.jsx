// components/ChatHeader.js
import { Box, Stack, Typography, Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ChatHeader = ({ otherMember, isUserOnline }) => {
  const navigate = useNavigate();

  const handleNavigateToAccount = (userId) => {
    navigate(`/account/${userId}`);
  };

  return (
    <Box
      sx={{
        px: '1rem',
        py: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '4rem',
        backgroundColor: 'white',
        zIndex: 2,
        borderBottom: '1px solid #ccc',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={otherMember?.avatar}
          alt={otherMember?.nickName}
          onClick={() => handleNavigateToAccount(otherMember?._id)}
          sx={{ cursor: 'pointer' }}
        />
        <Box>
          <Typography variant="subtitle1">
            {otherMember?.nickName ||
              `${otherMember?.firstName} ${otherMember?.lastName}`}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Box
              sx={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                bgcolor: isUserOnline(otherMember?._id) ? 'green' : 'gray',
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {isUserOnline(otherMember?._id) ? 'Online' : 'Offline'}
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
};

ChatHeader.propTypes = {
  otherMember: PropTypes.shape({
    _id: PropTypes.string,
    avatar: PropTypes.string,
    nickName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  isUserOnline: PropTypes.func.isRequired,
};

export default ChatHeader;
