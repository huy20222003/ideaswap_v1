// @mui
import { Container, Box } from '@mui/material';
//component
import BlogDetail from '../../section/dashboard/Blog/BlogDetail';
// ----------------------------------------------------------------------

const BlogDetailPage = () => {
  document.title = 'Blog Detail';
  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <BlogDetail />
        </Box>
      </Container>
    </>
  );
};

export default BlogDetailPage;
