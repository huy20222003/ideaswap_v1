import { Box } from '@mui/material';
import SvgColor from '../../svg-color';
import NavSection from '../../nav-section';
import { useAuth } from '../../../hooks/context';
import { useTranslation } from 'react-i18next';

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const Navigation = () => {
  const { authState: { user } } = useAuth();
  const {t} = useTranslation('navbar');

  const navConfig = [
    {
      path: '/dashboard/app',
      icon: icon('ic_home'),
      title: t('Dashboard')
    },
    {
      path: '/dashboard/course',
      icon: icon('ic_play-alt'),
      title: t('Courses')
    },
    { path: '/dashboard/document', icon: icon('ic_folder-download'), title: t('Documents') },
    {
      path: user ? `/account/${user._id}` : '/',
      icon: icon('ic_portrait'),
      title: t('Account')
    },
    {
      path: '/dashboard/donate',
      icon: icon('ic_hands-heart'),
      title: t('Donate')
    },
  ];

  return (
    <Box>
      <NavSection data={navConfig} />
    </Box>
  );
};

export default Navigation;