import { useEffect, useState } from 'react';
// MUI
import { CardMedia, Card } from '@mui/material';
// Context
import { useBanner } from '../../../hooks/context';

const Banner = () => {
  const {
    bannerState: { banners },
    handleGetAllBanners,
  } = useBanner();
  const [dashboardLeft1Banner, setDashboardLeft1Banner] = useState(null);
  const [dashboardLeft2Banner, setDashboardLeft2Banner] = useState(null);

  useEffect(() => {
    handleGetAllBanners();
  }, [handleGetAllBanners]);

  useEffect(() => {
    // Lọc ra banner có trường site là 'banner dashboard left 1'
    const filteredDashboardLeft1Banner = banners.find(
      (banner) => banner.site === 'banner-dashboard-left-1'
    );
    setDashboardLeft1Banner(filteredDashboardLeft1Banner);

    // Lọc ra banner có trường site là 'banner dashboard left 2'
    const filteredDashboardLeft2Banner = banners.find(
      (banner) => banner.site === 'banner-dashboard-left-2'
    );
    setDashboardLeft2Banner(filteredDashboardLeft2Banner);
  }, [banners]);

  return (
    <Card sx={{ p: '1rem', my: '5rem' }}>
      {dashboardLeft1Banner && (
        <CardMedia
          component={'img'}
          src={dashboardLeft1Banner.imageUrl} // Thay thế bằng trường chứa đường dẫn hình ảnh của banner
          width="400"
          sx={{ borderRadius: '1rem', mb: '1rem', objectFit: 'cover' }}
        ></CardMedia>
      )}
      {dashboardLeft2Banner && (
        <CardMedia
          component={'img'}
          src={dashboardLeft2Banner.imageUrl} // Thay thế bằng trường chứa đường dẫn hình ảnh của banner
          width="400"
          sx={{ borderRadius: '1rem', mb: '1rem', objectFit: 'cover' }}
        ></CardMedia>
      )}
    </Card>
  );
};

export default Banner;
