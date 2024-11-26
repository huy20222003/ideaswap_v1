import { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// prop-type
import PropTypes from 'prop-types';
// mui
import {
  Box,
  Stack,
  Divider,
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  CardActions,
  TextField,
  Button,
  styled,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// context
import {
  useBlog,
  useComment,
  useUser,
  useAuth,
  useHeart,
  useShare,
  useRole,
} from '../../../../hooks/context';
// utils
import { fDateTime } from '../../../../utils/formatTime';
// component
import CommentList from '../../../../Components/comments/CommentList';
import FormDialogEditBlog from '../../../../Components/FormDialog/Blog/FormDialogEditBlog';
import FormDialogDeleteBlog from '../../../../Components/FormDialog/Blog/FormDialogDeleteBlog';
// formik
import { useFormik } from 'formik';
// yup
import * as yup from 'yup';
// sweetalert2
import Swal from 'sweetalert2';
import HTMLReactParser from 'html-react-parser';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------------------

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

const BlogDetail = () => {
  const {
    blogState: { blog },
    handleGetOneBlog,
    setOpenFormDialogDeleteBlog,
    setOpenFormDialogEditBlog,
  } = useBlog();
  const [expanded, setExpanded] = useState(false);
  const {
    roleState: { roles },
  } = useRole();
  const { t } = useTranslation('blogs');
  const toggleExpand = useCallback(() => setExpanded((prev) => !prev), []);
  const {
    commentState: { comments },
    handleGetAllComments,
    handleCreateComment,
  } = useComment();
  const navigate = useNavigate();
  const { _id } = useParams();
  const {
    userState: { user },
    handleGetUserById,
  } = useUser();
  const { authState } = useAuth();
  const { heartState, handleCreateHeart, handleDeleteHeart } = useHeart();
  const { shareState, handleCreateShare, handleGetAllShares } = useShare();
  const { hearts } = heartState;
  const { shares } = shareState;
  const [heartIcon, setHeartIcon] = useState(<FavoriteIcon />);

  const handleShare = async () => {
    if (!authState.isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    await handleCreateShare({
      userID: authState?.user?._id,
      referenceID: blog?._id,
    });
    handleGetAllShares();
  };

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const fetchBlog = useCallback(async () => {
    await handleGetOneBlog(_id);
  }, [_id, handleGetOneBlog]);

  const handleNavigateToUserAccount = (userID) => {
    navigate(`/account/${userID}`);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const newUser = {
    ...user,
    roleName: roles.find((role) => role?._id === user?.roleID),
  };

  const handleCopyToClipboard = () => {
    const url = new URL(window.location.href);
    const baseUrl = `${url.protocol}//${url.host}`;
    const fullUrl = `${baseUrl}/dashboard/blog/${_id}`;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setTooltipOpen(true);
        setTimeout(() => {
          setTooltipOpen(false);
        }, 2000); // Show tooltip for 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
    handleShare();
  };

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  useEffect(() => {
    handleGetAllComments();
    if (blog?.userID) {
      handleGetUserById(blog.userID);
    }
  }, [blog?.userID, handleGetAllComments, handleGetUserById]);

  const commentsFilter = useMemo(() => {
    // Lọc ra tất cả các comment có referenceID trùng khớp với blog?._id
    const commentsForBlog = comments.filter(
      (comment) => comment?.referenceID === blog?._id
    );

    // Lấy ra những comment có parentCommentID = null
    const topLevelComments = commentsForBlog.filter(
      (comment) => comment.parentCommentID === null
    );

    // Sắp xếp các comment có parentCommentID = null theo trường createdAt
    topLevelComments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Lấy ra những comment có parentCommentID khác null
    const childComments = commentsForBlog.filter(
      (comment) => comment.parentCommentID !== null
    );

    // Kết hợp những comment có parentCommentID = null và các comment con
    const sortedComments = [...topLevelComments, ...childComments];

    return sortedComments;
  }, [comments, blog?._id]);

  const heartArrays = useMemo(() => {
    return hearts.filter((heart) => heart?.referenceID === blog?._id);
  }, [hearts, blog?._id]);

  const shareArrays = useMemo(() => {
    return shares.filter((share) => share?.referenceID === blog?._id);
  }, [shares, blog?._id]);

  const [heartLength, setHeartLength] = useState(heartArrays.length);

  useEffect(() => {
    const updateHeartIcon = () => {
      const heartFind = heartArrays.find(
        (heart) =>
          heart?.userID === authState.user?._id &&
          heart.referenceID === blog?._id
      );
      setHeartIcon(
        heartFind ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteIcon />
      );
    };
    updateHeartIcon();
  }, [blog?._id, authState.user, heartArrays]);

  const handleClickHeart = useCallback(async () => {
    if (!authState.isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    const data = { userID: authState?.user?._id, referenceID: blog?._id };
    try {
      if (heartIcon.props.sx) {
        await handleDeleteHeart(data);
        setHeartLength((prevHeartLength) => prevHeartLength - 1);
        setHeartIcon(<FavoriteIcon />);
      } else {
        await handleCreateHeart(data);
        setHeartLength((prevHeartLength) => prevHeartLength + 1);
        setHeartIcon(<FavoriteIcon sx={{ color: 'red' }} />);
      }
    } catch (error) {
      Swal.fire({
        title: t('Error'),
        text: t(
          'An error occurred while processing your action. Please try again later.'
        ),
        icon: 'error',
      });
    }
  }, [
    authState.isAuthenticated,
    authState?.user?._id,
    blog?._id,
    handleCreateHeart,
    handleDeleteHeart,
    heartIcon.props.sx,
    navigate,
    t,
  ]);

  const truncatedContent = expanded
    ? blog?.content
    : `${blog?.content.slice(0, 100)}...`;

  const validationSchema = yup.object({
    userID: yup.string().required('User ID is required'),
    referenceID: yup.string().required('Bv ID is required'),
  });

  const formik = useFormik({
    initialValues: {
      content: '',
      referenceID: _id,
      userID: authState?.user?._id,
      parentCommentID: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (!authState?.isAuthenticated) {
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

  const handleEditBlogClick = useCallback(
    async (blogId) => {
      const response = await handleGetOneBlog(blogId);
      if (response.success) {
        setOpenFormDialogEditBlog(true);
        handleClose();
      }
    },
    [handleGetOneBlog, setOpenFormDialogEditBlog]
  );

  const handleDeleteBlog = useCallback(
    async (blogId) => {
      const response = await handleGetOneBlog(blogId);
      if (response.success) {
        setOpenFormDialogDeleteBlog(true);
        handleClose();
      }
    },
    [handleGetOneBlog, setOpenFormDialogDeleteBlog]
  );

  useEffect(() => {
    formik.setFieldValue('referenceID', blog?._id);
  }, [blog?._id]);

  return (
    <Box sx={{ p: '0.5rem', mt: '4rem' }}>
      <Box>
        <Card sx={{ my: '1rem', p: '1rem' }}>
          <CardHeader
            avatar={
              <Avatar
                src={user?.avatar}
                onClick={() => handleNavigateToUserAccount(user?._id)}
                style={{ cursor: 'pointer' }}
              />
            }
            action={
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            }
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="subtitle1"
                  onClick={() => handleNavigateToUserAccount(user?._id)}
                  style={{ cursor: 'pointer', marginRight: '0.25rem' }}
                >
                  {`${user?.firstName} ${user?.lastName}`}
                </Typography>
                {newUser?.roleName?.name == 'creator' && (
                  <LightTooltip title={t('Creator')} placement="right">
                    <CheckCircleIcon
                      sx={{ color: '#3366FF', fontSize: '1rem' }}
                    />
                  </LightTooltip>
                )}
              </div>
            }
            subheader={fDateTime(blog?.createdAt)}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          >
            {authState?.user?._id === user?._id && (
              <Box>
                <MenuItem onClick={() => handleEditBlogClick(_id)}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('Edit Blog')} />
                </MenuItem>
                <MenuItem onClick={() => handleDeleteBlog(_id)}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('Delete Blog')} />
                </MenuItem>
              </Box>
            )}
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <FlagCircleIcon />
              </ListItemIcon>
              <ListItemText primary={t('Report Blog')} />
            </MenuItem>
          </Menu>
          <CardContent sx={{ pb: '0.2rem' }}>
            <Typography variant="body2" color="text.primary">
              {HTMLReactParser(truncatedContent)}
              {blog?.content.length > 100 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  onClick={toggleExpand}
                  sx={{ cursor: 'pointer', display: 'inline' }}
                >
                  {expanded ? t('Show less') : '... ' + t('Show more')}
                </Typography>
              )}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              p: '0.5rem',
              borderRadius: '0.4rem',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            image={blog?.url}
            alt={`${user?.firstName} ${user?.lastName}`}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: '0.5rem',
            }}
          >
            {heartLength > 0 ? (
              <Stack sx={{ flexDirection: 'row' }}>
                <FavoriteIcon sx={{ color: 'red' }} />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mx: '0.2rem' }}
                >
                  {heartLength}
                </Typography>
              </Stack>
            ) : (
              <Box></Box>
            )}
            <Stack sx={{ flexDirection: 'row' }}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mx: '0.4rem' }}
              >
                {commentsFilter.length}{' '}
                {commentsFilter.length > 1 ? t('comments') : t('comment')}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mx: '0.4rem' }}
              >
                {shareArrays.length}{' '}
                {shareArrays.length > 1 ? t('shares') : t('share')}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton
              aria-label="add to favorites"
              onClick={handleClickHeart}
            >
              {heartIcon}
            </IconButton>
            <IconButton aria-label="share">
              <CommentIcon />
            </IconButton>
            <LightTooltip
              title={t('URL copied to clipboard!')}
              open={tooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <IconButton aria-label="share" onClick={handleCopyToClipboard}>
                <LinkIcon />
              </IconButton>
            </LightTooltip>
          </CardActions>
        </Card>
        <Box sx={{ m: '1rem' }}>
          <TextField
            fullWidth
            label={t('comment')}
            variant="outlined"
            size="medium"
            id="content"
            name="content"
            multiline
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />
          <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              size="small"
              sx={{ color: '#fff', my: '1rem' }}
              onClick={formik.handleSubmit}
            >
              {t('comment')}
            </Button>
          </Stack>
        </Box>
        <Box sx={{ my: '1rem' }}>
          <Typography variant="subtitle1" sx={{ ml: '1rem' }}>
            {t('Comments')}
          </Typography>
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
              <Stack sx={{gap: '1rem', alignItems: 'center', mt: '2rem'}}>
                <CommentIcon sx={{ fontSize: '2rem' }} />
                <Typography>{t('No comments yet')}</Typography>
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
      <FormDialogEditBlog />
      <FormDialogDeleteBlog />
    </Box>
  );
};

BlogDetail.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    heartArrays: PropTypes.array.isRequired,
    commentArrays: PropTypes.array.isRequired,
    shareArrays: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(BlogDetail);
