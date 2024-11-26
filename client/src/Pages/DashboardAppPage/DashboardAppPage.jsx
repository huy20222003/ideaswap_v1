// @mui
import { Container, Box } from '@mui/material';
//component
import Slider from '../../section/dashboard/Slider';
import PostBlog from '../../section/dashboard/PostBlog';
import Blog from '../../section/dashboard/Blog';
// ----------------------------------------------------------------------

const DashboardAppPage = () => {
  document.title = 'Dashboard';
  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <Slider />
          <marquee
            width="100%"
            height="25px"
            behavior="scroll"
            bgcolor="#54D62C"
            style={{
              fontSize: '14px',
              color: 'white',
              marginTop: '10px',
              borderRadius: '4px',
            }}
          >
            Nếu bạn không thấy dữ liệu hiển thị. Vui lòng chờ 30s-1 phút rồi refresh lại trang
          </marquee>
        </Box>
        <Box>
          <PostBlog />
        </Box>
        <Box>
          <Blog />
        </Box>
      </Container>
    </>
  );
};

export default DashboardAppPage;
