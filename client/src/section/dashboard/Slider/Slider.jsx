//react
import { useEffect } from 'react';
//@mui
import { Card } from '@mui/material';
//swipper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
//component
import SliderItem from './SliderItem';
//context
import { useBanner } from '../../../hooks/context';
//--------------------------------------------------

const Slider = () => {
  const {bannerState: {banners}, handleGetAllBanners} = useBanner();

  useEffect(()=> {
    handleGetAllBanners();
  }, [handleGetAllBanners]);

  // Lọc ra các banner có site bao gồm "banner-dashboard-slider"
  const filteredBanners = banners.filter(banner => banner.site.includes("banner-dashboard-slider"));

  return (
    <Card sx={{ width: '100%', mt: '5rem', p: '0.5rem' }}>
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
        {filteredBanners.map((slider) => {
          return (
            <SwiperSlide key={slider?._id}>
              <SliderItem image={slider?.imageUrl} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Card>
  );
};

export default Slider;
