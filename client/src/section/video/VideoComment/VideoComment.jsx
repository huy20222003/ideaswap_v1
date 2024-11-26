//react
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
//mui
import {
  Box,
  Typography,
  Stack,
  Avatar,
  TextField,
  Button,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
//component
import CommentList from '../../../Components/comments/CommentList';
//context
import { useComment, useAuth } from '../../../hooks/context';
//react-router-dom
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
//formik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//sweetalert2
import Swal from 'sweetalert2';
//i18n
import { useTranslation } from 'react-i18next';
//-------------------------------------------------------------------------

const VideoComment = () => {
  const {
    commentState: { comments },
    handleGetAllComments,
    handleCreateComment,
  } = useComment();
  const { t } = useTranslation('videos');
  const {
    authState: { user, isAuthenticated },
  } = useAuth();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const videoId = queryParams.videoId;

  useEffect(() => {
    const fetchComments = async () => {
      await handleGetAllComments();
      setId(videoId);
      formik.setFieldValue('bvID', id);
    };
    fetchComments();
  }, [handleGetAllComments, id, videoId]);

  const commentsFilter = useMemo(() => {
    // Lọc ra tất cả các comment có bvID trùng khớp với videoId
    const commentsForVideo = comments.filter(
      (comment) => comment?.bvID === videoId
    );

    // Lấy ra những comment có parentCommentID = null
    const topLevelComments = commentsForVideo.filter(
      (comment) => comment.parentCommentID === null
    );

    // Sắp xếp các comment có parentCommentID = null theo trường createdAt
    topLevelComments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Lấy ra những comment có parentCommentID khác null
    const childComments = commentsForVideo.filter(
      (comment) => comment.parentCommentID !== null
    );

    // Kết hợp những comment có parentCommentID = null và các comment con
    const sortedComments = [...topLevelComments, ...childComments];

    return sortedComments;
  }, [comments, videoId]);

  const validationSchema = yup.object({
    content: yup.string().required('Content is required'),
    userID: yup.string(),
    bvID: yup.string().required('Bv ID is required'),
  });

  const formik = useFormik({
    initialValues: {
      content: '',
      bvID: id,
      userID: user?._id,
      parentCommentID: null,
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
        }
      } catch (error) {
        Swal.fire({
          title: t('Server Error'),
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      }
    },
  });

  return (
    <Box sx={{ mt: '1rem', mb: '0.5rem' }}>
      <Typography variant="subtitle2">
        {commentsFilter && commentsFilter.length}
        {commentsFilter.length > 1 ? ' comments' : ' comment'}
      </Typography>
      <Stack sx={{ flexDirection: 'row', gap: '0.5rem', my: '0.5rem' }}>
        <Avatar alt={user?.firstName + user?.lastName} src={user?.avatar} />
        <TextField
          fullWidth
          label={t('Comment')}
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
          {t('Comment')}
        </Button>
      </Stack>
      <Box sx={{ mt: '1rem', mb: '2rem' }}>
        {commentsFilter.length > 0 ? (
          <Box>
            <CommentList comments={commentsFilter} />
          </Box>
        ) : (
          <Box
            sx={{
              width: '100$',
              height: '5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack sx={{ gap: '1rem', alignItems: 'center', mt: '2rem' }}>
              <CommentIcon sx={{ fontSize: '2rem' }} />
              <Typography>{t('No comments yet')}</Typography>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VideoComment;
