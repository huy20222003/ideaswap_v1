//mui
import { Grid } from '@mui/material';
//component
import PostTabPostBlog from './PostTabBlog/PostTabPostBlog';
import PostTabBlog from './PostTabBlog/PostTabBlog';
import PostTabFollower from './PostTabBlog/PostTabFollower';
//-----------------------------------------------------

const PostTab = () => {
  return (
    <Grid container>
      <Grid item sm={12} md={4} xl={4}>
        <PostTabFollower />
      </Grid>
      <Grid item sm={12} md={8} xl={8}>
        <PostTabPostBlog />
        <PostTabBlog />
      </Grid>
    </Grid>
  );
};

export default PostTab;
