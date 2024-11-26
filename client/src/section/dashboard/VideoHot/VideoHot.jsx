//react
import { useEffect } from 'react';
//mui
import { Box, Typography } from '@mui/material';
//component
import VideoHotItem from './VideoHotItem';
//context
import { useVideo, useCensorships } from '../../../hooks/context';
//i18n
import { useTranslation } from 'react-i18next';
//---------------------------------------

const VideoHot = () => {
  const {
    videoState: { videos },
    handleGetAllVideo,
  } = useVideo();
  const { censorshipsState, handleGetAllCensorships } = useCensorships();
  useEffect(() => {
    handleGetAllVideo();
    handleGetAllCensorships();
  }, [handleGetAllCensorships, handleGetAllVideo]);
  const {t} = useTranslation('blogs');

  const { censorships } = censorshipsState;
  const videosWithStatus = videos
    .map((video) => {
      const censorshipItem = censorships.find(
        (item) => item?.contentID === video?._id
      );
      const status = censorshipItem ? censorshipItem.status : 'approved';
      return {
        ...video,
        status,
      };
    })
    .filter((video) => video.status === 'approved')
    .sort((a, b) => b.view - a.view)
    .slice(0, 5);

  return (
    <Box sx={{ mt: '5rem' }}>
      <Box sx={{ ml: { xs: '2rem', sm: '2rem' } }}>
        <Typography variant="subtitle1">{t("Top video")}</Typography>
      </Box>
      <Box>
        {videosWithStatus.length > 0 ? (
          videosWithStatus.map((video) => (
            <VideoHotItem key={video._id} video={video} />
          ))
        ) : (
          <Typography>{t("No video reached the top")}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default VideoHot;
