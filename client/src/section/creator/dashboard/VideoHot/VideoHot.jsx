//react
import { useEffect } from 'react';
//mui
import { Box, Typography } from '@mui/material';
//component
import VideoHotItem from './VideoHotItem';
//context
import { useVideo, useCensorships } from '../../../../hooks/context';
//swipper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
//i18n
import { useTranslation } from 'react-i18next';
//---------------------------------------

const VideoHot = () => {
  const {
    videoState: { videos },
    handleGetAllVideo,
  } = useVideo();
  const { censorshipsState, handleGetAllCensorships } = useCensorships();
  const {t} = useTranslation('dashboardCreator');
  useEffect(() => {
    handleGetAllVideo();
    handleGetAllCensorships();
  }, [handleGetAllCensorships, handleGetAllVideo]);

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
      <Box>
        <Typography variant="subtitle1">{t("Top video")}</Typography>
      </Box>
      <Box>
        {videosWithStatus.length > 0 ? (
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {videosWithStatus.map((video) => {
              return (
                <SwiperSlide key={video?._id}>
                  <VideoHotItem key={video.id} video={video} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <Typography>{t("No video reached the top")}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default VideoHot;
