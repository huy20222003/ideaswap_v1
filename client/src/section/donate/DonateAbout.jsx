//mui
import { Box, Typography, Divider } from '@mui/material';
//component
import Slider from './slider/Slider';
//i18n
import { useTranslation } from 'react-i18next';
//-----------------------------------------------------

const DonateAbout = () => {
  const {t} = useTranslation('donate');
  return (
    <Box sx={{ my: '2rem' }}>
      <Box sx={{ bgcolor: 'primary.main', borderRadius: '0.4rem' }}>
        <Typography variant="subtitle1" sx={{ color: 'white', p: '0.5rem' }}>
          {t("IdeaSwap About")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          my: '1rem',
        }}
      >
        <Box>
          <Box
            sx={{
              bgcolor: 'primary.main',
              borderRadius: '0.4rem',
              display: 'block',
              my: '1rem',
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ color: 'white', p: '0.5rem' }}
            >
              {t("IdeaSwap Team Member")}
            </Typography>
          </Box>
        </Box>
        <Slider />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          my: '2rem',
        }}
      >
        <Box>
          <Box
            sx={{
              bgcolor: 'primary.main',
              borderRadius: '0.4rem',
              display: 'inline-block',
              my: '1rem',
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ color: 'white', p: '0.5rem' }}
            >
              {t("IdeaSwap Ecosystem")}
            </Typography>
          </Box>
          <Box sx={{ ml: '2rem' }}>
            <Typography variant="body2">{t("IdeaSwap AI")}</Typography>
            <Typography variant="body2">{t("IdeaSwap Cloud")}</Typography>
            <Typography variant="body2">{t("Social Media IdeaSwap")}</Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
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
          <Box
            component={'img'}
            sx={{ width: '15rem', height: '10rem', borderRadius: '0.4rem' }}
            src="/assets/images/banners/anh_bia.png"
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DonateAbout;
