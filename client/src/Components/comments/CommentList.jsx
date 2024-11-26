import PropTypes from 'prop-types'; // Import PropTypes
import { Box } from '@mui/material';
import CommentItem from './CommentItem';

const CommentList = ({
  comments,
  parentCommentID = null,
  marginLeft = 0,
}) => {
  const childComments = comments.filter(
    (comment) => comment.parentCommentID === parentCommentID
  );

  return (
    <>
      {childComments.map((comment) => (
        <Box key={comment._id} ml={marginLeft}>
          <CommentItem comment={comment} />
          <CommentList
            comments={comments}
            parentCommentID={comment._id}
            marginLeft={marginLeft + 2}
          />
        </Box>
      ))}
    </>
  );
};

// Define PropTypes for props validation
CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  parentCommentID: PropTypes.string,
  marginLeft: PropTypes.number,
};

export default CommentList;
