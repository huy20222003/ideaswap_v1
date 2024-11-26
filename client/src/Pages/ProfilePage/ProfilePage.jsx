//mui
import { Box, Typography, Divider } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
//component
import { ProfileAvatar, ProfileInfo } from '../../section/setting/profile';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------

const ProfilePage = () => {
  const {t} = useTranslation('setting');
  return (
    <Box sx={{p: '1rem'}}>
      <Typography variant="h6" sx={{ my: '1rem', color: 'primary.main' }}>
        {t("Profile")}
      </Typography>
      <Box
        sx={{
          backgroundColor: 'primary.lighter',
          display: 'flex',
          p: '0.4rem',
          borderRadius: '0.4rem',
        }}
      >
        <ErrorIcon sx={{ color: 'primary.main', mr: '0.5rem' }} />
        <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
          {t("Change personal information")}
        </Typography>
      </Box>
      <Divider sx={{bgColor: 'primary.main', my: '1rem'}}/>
      <Box sx={{my: '1rem'}}>
        <ProfileAvatar />
        <ProfileInfo />
      </Box>
    </Box>
  );
};

export default ProfilePage;
