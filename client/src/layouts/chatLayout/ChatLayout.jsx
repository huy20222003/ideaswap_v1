// react-router-dom
import { Outlet } from 'react-router-dom';
// mui
import { Box } from '@mui/material';
// component
import Header from '../../Components/header';
//------------------------------------

const ChatLayout = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh', // Chiếm toàn bộ chiều cao của khung nhìn
    }}>
      <Header />
      <Box sx={{
        flex: 1, // Phần nội dung chiếm toàn bộ không gian còn lại
        overflow: 'hidden', // Không cuộn
        bgcolor: '#f5f5f5', // Optional: Set a background color
      }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ChatLayout;
