//react
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { styled, Box, Avatar, Stack, Typography, Card } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CommentIcon from '@mui/icons-material/Comment';
//context
import { useUser, useRole, useComment } from '../../hooks/context';
//utils
import { fToNow } from '../../utils/formatTime';
import ReplyComment from './ReplyComment';
//-------------------------------------------------------

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
}));

const CommentItem = ({ comment }) => {
  const {
    userState: { users },
    handleGetAllUsers,
  } = useUser();

  const {
    roleState: { roles },
  } = useRole();

  const { handleGetAllComments } = useComment();

  useEffect(() => {
    handleGetAllUsers();
  }, [handleGetAllUsers]);

  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  const [showReplyComment, setShowReplyComment] = useState(false); // Trạng thái để kiểm soát hiển thị VideoReplyComment
  const [selectedCommentId, setSelectedCommentId] = useState(null); // Trạng thái lưu trữ _id của comment được chọn

  const userComment = users?.find((user) => user?._id === comment?.userID);

  const newUser = {
    ...userComment,
    roleName: roles.find((role) => role?._id === userComment?.roleID),
  };

  const handleToggleReplyComment = (commentId) => {
    if (selectedCommentId === commentId) {
      setSelectedCommentId(null); // Nếu comment đã được chọn trước đó, xoá _id
    } else {
      setSelectedCommentId(commentId); // Nếu comment chưa được chọn hoặc là một comment khác, cập nhật _id
    }
    setShowReplyComment((prev) => !prev); // Đảo ngược trạng thái hiển thị
  };

  const truncatedContent =
    comment?.content.length > 300
      ? expanded
        ? comment.content
        : `${comment.content.slice(0, 300)}...`
      : comment.content;

  useEffect(() => {
    // Listen for changes in comments and update the UI when new comments are added
    handleGetAllComments();
  }, [handleGetAllComments]);

  return (
    <Box>
      <Card sx={{ p: '0.5rem', my: '0.5rem' }}>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <Avatar alt="Avatar" src={userComment?.avatar} />
          </Box>
          <Box sx={{ flex: 1, ml: '1rem' }}>
            <Stack>
              <Stack
                sx={{
                  flexDirection: 'row',
                  gap: '0.25rem',
                  alignItems: 'center',
                }}
              >
                <Typography variant="subtitle1">
                  {userComment?.firstName + userComment?.lastName}
                </Typography>
                {newUser?.roleName?.name === 'creator' && (
                  <LightTooltip title="Creator" placement="right">
                    <CheckCircleIcon
                      sx={{ color: '#3366FF', fontSize: '1rem' }}
                    />
                  </LightTooltip>
                )}
                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                  {fToNow(comment?.createdAt)}
                </Typography>
              </Stack>
              <Typography variant="body2">
                {truncatedContent}
                {comment?.content.length > 300 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    onClick={toggleExpand}
                    sx={{ cursor: 'pointer' }}
                  >
                    {expanded ? 'Short' : 'Show more'}
                  </Typography>
                )}
              </Typography>
              <Stack sx={{ flexDirection: 'row', gap: '2rem' }}>
                <LightTooltip title="Report" placement="right">
                  <FlagIcon color="primary" sx={{ cursor: 'pointer' }} />
                </LightTooltip>
                <LightTooltip title="Reply" placement="right">
                  <CommentIcon
                    color="primary"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleToggleReplyComment(comment._id)} // Khi click vào icon "Reply", truyền _id của comment
                  />
                </LightTooltip>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Card>
      {showReplyComment && selectedCommentId === comment._id && (
        <ReplyComment
          parentCommentID={comment?._id}
          referenceID={comment?.referenceID}
          handleToggleReplyComment={handleToggleReplyComment}
        />
      )}
    </Box>
  );
};

// Define PropTypes for props validation
CommentItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    referenceID: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentItem;
