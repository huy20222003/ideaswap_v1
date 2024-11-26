import { useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
//mui
import { Box, Stack, Avatar, TextField, Button } from '@mui/material';
//context
import { useComment, useAuth } from '../../hooks/context';
//react-router-dom
import { useNavigate } from 'react-router-dom';
//formik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//sweetalert2
import Swal from 'sweetalert2';
//-------------------------------------------------------------------------

const ReplyComment = (props) => {
  const { handleGetAllComments, handleCreateComment } = useComment();
  const {
    authState: { user, isAuthenticated },
  } = useAuth();
  const { referenceID, handleToggleReplyComment, parentCommentID } = props; // Fix typo here
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      await handleGetAllComments();
      formik.setFieldValue('referenceID', referenceID);
    };
    fetchComments();
  }, [handleGetAllComments, referenceID]);

  const validationSchema = yup.object({
    content: yup.string().required('Content is required'),
    userID: yup.string(),
    referenceID: yup.string().required('Bv ID is required'),
    parentCommentID: yup.string().required('ParentCommentID is required'),
  });

  const formik = useFormik({
    initialValues: {
      content: '',
      referenceID: referenceID,
      userID: user?._id,
      parentCommentID: parentCommentID,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (!isAuthenticated) {
          navigate('/auth/login');
          return;
        }
        const response = await handleCreateComment(values);
        if (response.success) {
          handleGetAllComments();
          formik.setFieldValue('content', '');
          handleToggleReplyComment();
        }
      } catch (error) {
        Swal.fire({
          title: 'Server Error',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      }
    },
  });

  return (
    <Box sx={{ mt: '1rem', mb: '0.5rem' }}>
      <Stack sx={{ flexDirection: 'row', gap: '0.5rem', my: '0.5rem' }}>
        <Avatar alt={user?.firstName + user?.lastName} src={user?.avatar} />
        <TextField
          fullWidth
          label="Comment"
          variant="outlined"
          size="medium"
          id="content"
          name="content"
          multiline
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.content}
        />
      </Stack>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="small"
          sx={{ color: '#fff', my: '1rem' }}
          onClick={formik.handleSubmit}
        >
          Comment
        </Button>
      </Stack>
    </Box>
  );
};

// Define PropTypes for props validation
ReplyComment.propTypes = {
  parentCommentID: PropTypes.string.isRequired, // Add PropTypes for commentId
  handleToggleReplyComment: PropTypes.func,
  referenceID: PropTypes.string.isRequired
};

export default ReplyComment;
