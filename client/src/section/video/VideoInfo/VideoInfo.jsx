//react
import { useEffect } from 'react';
//mui
import { Box, Card, Typography } from '@mui/material';
//component
import VideoDescription from '../VideoDescription';
import VideoComment from '../VideoComment';
//react-router-dom
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
//context
import { useVideo } from '../../../hooks/context';
//react-player
import ReactPlayer from 'react-player/youtube';
//-----------------------------------------------

const VideoInfo = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  // Lấy ra giá trị của query parameter "videoId"
  const videoId = queryParams.videoId;

  const {
    videoState: { video },
    handleGetVideoById,
  } = useVideo();

  useEffect(() => {
    videoId && handleGetVideoById(videoId);
  }, [handleGetVideoById, videoId]);

  const truncatedTitle =
    video?.title && video?.title.length > 120
      ? `${video?.title.slice(0, 120)}...`
      : video?.title;

  return (
    <Box sx={{ mt: '5rem' }}>
      <Card
        sx={{
          bgcolor: 'primary.main',
          p: '0.5rem 1rem',
          borderRadius: '0.4rem',
          mb: '0.5rem',
        }}
      >
        <Typography variant="subtitle1" sx={{ color: 'white' }}>
          {truncatedTitle}
        </Typography>
      </Card>
      <Box
        sx={{
          width: '100%',
          height: {
            xs: '15rem', // extra-small screens
            sm: '20rem', // small screens
            md: '25rem', // medium screens
            lg: '30rem', // large screens
            xl: '30rem', // extra-large screens
          },
        }}
      >
        <ReactPlayer
          url={video?.videoUrl}
          width="100%"
          height="100%"
          controls
        />
      </Box>
      <VideoDescription video={video} />
      <VideoComment video={video} />
    </Box>
  );
};

export default VideoInfo;
