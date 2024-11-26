import { useEffect, useState } from 'react';
import { Box, Drawer, List, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VideoListItem from './VideoListItem';
import { useVideo, useCensorships } from '../../../hooks/context';
//i18n
import { useTranslation } from 'react-i18next';
//------------------------------------------------------------------

const VideoList = () => {
  const {
    videoState: { videos },
    handleGetAllVideo,
  } = useVideo();
  const {t} = useTranslation('videos');
  const { censorshipsState, handleGetAllCensorships } = useCensorships();
  const [courseId, setCourseId] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    const courseIdFromPath = pathParts[2];
    setCourseId(courseIdFromPath);
  }, []);

  useEffect(() => {
    handleGetAllVideo();
    handleGetAllCensorships();
  }, [handleGetAllVideo, handleGetAllCensorships]);

  const videoFilters = videos.filter((video) => video.courseID == courseId);
  const { censorships } = censorshipsState;
  const videosWithStatus = videoFilters.map((video) => {
    const censorshipItem = censorships.find(
      (item) => item?.contentID === video?._id
    );
    const status = censorshipItem ? censorshipItem.status : 'pending';
    return { ...video, status };
  });

  const videoApproveds = videosWithStatus.filter(
    (video) => video.status === 'approved'
  );

  const toggleDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  return (
    <Box sx={{ mt: '5rem', ml: '1rem', position: 'relative' }}>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem', // Đặt vị trí ở bên phải dưới
          zIndex: 999,
          display: {
            xs: 'block',
            sm: 'block',
            md: 'none',
            xl: 'none',
            lg: 'none',
          },
          bgcolor: 'primary.main', // Màu nền
          color: 'white', // Màu chữ
          width: '3rem',
          height: '3rem',
          borderRadius: '50%', // Bo tròn
          boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', // Đổ bóng
        }}
        onClick={toggleDrawer}
      >
        <AddIcon sx={{ fontSize: '2rem' }} />
      </IconButton>
      <Drawer
        anchor="bottom"
        open={isOpenDrawer}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: '360px',
            maxHeight: '80%',
          },
        }}
      >
        <Box sx={{ p: '0.5rem' }}>
          <Typography variant="subtitle1">{t("Course video")}</Typography>
        </Box>
        <List>
          {videoApproveds.map((video) => (
            <>
              <VideoListItem key={video?._id} video={video} toggleDrawer={toggleDrawer} />
            </>
          ))}
        </List>
      </Drawer>
      <Box
        sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'block',
            xl: 'block',
            lg: 'block',
          },
        }}
      >
        <Typography variant="subtitle1" sx={{ color: 'gray' }}>
        {t("Course video")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'block',
            xl: 'block',
            lg: 'block',
          },
        }}
      >
        {videoApproveds.map((video) => (
          <VideoListItem key={video?._id} video={video} />
        ))}
      </Box>
    </Box>
  );
};

export default VideoList;
