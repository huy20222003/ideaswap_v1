import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SliderItem from './SliderItem';
import sliderConfig from './sliderConfig';

const Slider = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  let slidesPerView = 3; // Mặc định hiển thị 3 slide trên màn hình lớn
  if (isSmallScreen) {
    slidesPerView = 1; // Hiển thị 1 slide trên màn hình nhỏ
  } else if (isMediumScreen) {
    slidesPerView = 2; // Hiển thị 2 slide trên màn hình vừa
  }

  return (
    <Grid container spacing={1}>
      <Swiper
        spaceBetween={50}
        slidesPerView={slidesPerView}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {sliderConfig.map((item) => (
          <SwiperSlide key={item.id}>
            <SliderItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default Slider;
