import { useEffect } from 'react';
//react-router-dom
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import PostTabBlogItem from './PostTabBlogItem';
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
//i18n
import { useTranslation } from 'react-i18next';
//-------------------------------------------------------------------------------------------------

const PostTabBlog = () => {
  const { blogState, handleGetAllBlog } = useBlog();
  const { heartState, handleGetAllHearts } = useHeart();
  const { commentState, handleGetAllComments } = useComment();
  const { shareState, handleGetAllShares } = useShare();
  const { userState, handleGetAllUsers } = useUser();
  const { censorshipsState, handleGetAllCensorships } = useCensorships();
  const {t} = useTranslation('blogs');

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
  const { _id } = useParams();

  const blogsFilterByUserID = blogs.filter((blog) => blog?.userID === _id);

  const blogsWithStatus = blogsFilterByUserID
    .map((blog) => {
      const heartArrays = hearts.filter((heart) => heart?.bvID === blog?._id);
      const commentArrays = comments.filter(
        (comment) => comment?.bvID === blog?._id
      );
      const shareArrays = shares.filter((share) => share?.bvID === blog?._id);
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
    })
    .filter((blog) => blog?.status === 'approved')
    .filter((blog) => blog.userID === _id);

  return (
    <Box>
      {blogsWithStatus.length > 0 ? (
        blogsWithStatus.map((blog) => (
          <PostTabBlogItem key={blog?._id} blog={blog} />
        ))
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2">
            {t("There are no posts to display yet")}
          </Typography>
        </Box>
      )}
      <FormDialogEditBlog />
      <FormDialogDeleteBlog />
    </Box>
  );
};

export default PostTabBlog;
