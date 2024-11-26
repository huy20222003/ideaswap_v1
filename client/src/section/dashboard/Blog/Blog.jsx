import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import BlogItem from './BlogItem';
import {
  useBlog,
  useHeart,
  useComment,
  useShare,
  useUser,
  useCensorships,
} from '../../../hooks/context';
import FormDialogEditBlog from '../../../Components/FormDialog/Blog/FormDialogEditBlog';
import FormDialogDeleteBlog from '../../../Components/FormDialog/Blog/FormDialogDeleteBlog';
import { useTranslation } from 'react-i18next';
//------------------------------------------------------------

const Blog = () => {
  const { blogState, handleGetAllBlog } = useBlog();
  const { heartState, handleGetAllHearts } = useHeart();
  const { commentState, handleGetAllComments } = useComment();
  const { shareState, handleGetAllShares } = useShare();
  const { userState, handleGetAllUsers } = useUser();
  const { censorshipsState, handleGetAllCensorships } = useCensorships();
  const { t } = useTranslation('blogs');

  useEffect(() => {
    handleGetAllBlog();
    handleGetAllHearts();
    handleGetAllComments();
    handleGetAllShares();
    handleGetAllUsers();
    handleGetAllCensorships();
  }, [
    handleGetAllBlog,
    handleGetAllHearts,
    handleGetAllComments,
    handleGetAllShares,
    handleGetAllUsers,
    handleGetAllCensorships,
  ]);

  const { blogs } = blogState;
  const { hearts } = heartState;
  const { comments } = commentState;
  const { shares } = shareState;
  const { users } = userState;
  const { censorships } = censorshipsState;

  const blogsWithStatus = blogs.map((blog) => {
    const heartArrays = hearts.filter((heart) => heart?.referenceID === blog?._id);
    const commentArrays = comments.filter(
      (comment) => comment?.referenceID === blog?._id
    );
    const shareArrays = shares.filter((share) => share?.referenceID === blog?._id);
    const user = users.find((user) => user?._id === blog?.userID);
    const censorshipItem = censorships.find(
      (item) => item?.contentID === blog?._id
    );
    const status = censorshipItem ? censorshipItem.status : 'pending';
    return {
      ...blog,
      heartArrays,
      commentArrays,
      shareArrays,
      user,
      status,
    };
  });

  const blogApproveds = blogsWithStatus.filter(
    (blog) => blog?.status === 'approved'
  );

  return (
    <Box>
      {blogApproveds.length > 0 ? (
        blogApproveds.map((blog) => <BlogItem key={blog?._id} blog={blog} />)
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2">
            {t('There are no posts to display yet')}
          </Typography>
        </Box>
      )}
      <FormDialogEditBlog />
      <FormDialogDeleteBlog />
    </Box>
  );
};

export default Blog;
