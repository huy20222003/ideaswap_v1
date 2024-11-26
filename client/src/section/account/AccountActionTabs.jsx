import { useState, useEffect } from 'react';
//react-router-dom
import { useParams, useNavigate } from 'react-router-dom';
//mui
import {
  Box,
  Card,
  Stack,
  Avatar,
  Tab,
  Typography,
  Button,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
//utils
import { fShortenNumber } from '../../utils/formatNumber';
//component
import PostTab from './PostTab';
import FollowingTab from './FollowingTab';
import VideoTab from './VideoTab';
//context
import { useUser, useAuth, useFollow } from '../../hooks/context';
//i18n
import { useTranslation } from 'react-i18next';
//Swal
import Swal from 'sweetalert2';
//---------------------------------------------------

const AccountActionTabs = () => {
  const [value, setValue] = useState('1');
  const { t } = useTranslation('account');
  const {
    followState: { follows },
    handleGetAllFollows,
    handleDeleteFollow,
    handleCreateFollow,
  } = useFollow();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { authState } = useAuth();

  const { _id } = useParams();
  const navigate = useNavigate();

  const followFind = follows.find(
    (follow) =>
      follow?.userID === _id && follow?.followerID === authState?.user?._id
  );

  const handleDeleteFollowById = async () => {
    try {
      const response = await handleDeleteFollow({
        followerID: authState?.user?._id,
        userID: _id,
      });
      if (response.success) {
        handleGetAllFollows();
      }
    } catch (error) {
      Swal.fire({
        title: t('Server Error!'),
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'OK',
      });
    }
  };

  const handleAddFollow = async () => {
    if (!authState.isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    try {
      const response = await handleCreateFollow({
        followerID: authState?.user?._id,
        userID: _id,
      });
      if (response.success) {
        handleGetAllFollows();
      }
    } catch (error) {
      Swal.fire({
        title: t('Server Error!'),
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'OK',
      });
    }
  };

  const {
    userState: { user },
    handleGetUserById,
  } = useUser();

  useEffect(() => {
    _id && handleGetUserById(_id);
  }, [_id, handleGetUserById]);

  useEffect(() => {
    handleGetAllFollows();
  }, [handleGetAllFollows]);

  const handleNavigate = () => {
    navigate('/setting/profile');
  };

  const followFilters = follows.filter((follow) => follow?.userID == _id);

  return (
    <Card>
      <Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            bgcolor: '#34b50d',
          }}
        >
          <Stack sx={{ gap: '2rem' }}>
            <Stack
              sx={{
                flexDirection: 'row',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center',
                p: '1rem',
              }}
            >
              <Avatar
                alt={user?.firstName + user?.lastName}
                src={user?.avatar}
                sx={{ width: '8rem', height: '8rem' }}
              />
              <Stack>
                <Stack
                  sx={{
                    flexDirection: 'row',
                    gap: '0.5rem',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h5" sx={{ color: '#fff' }}>
                    {user?.firstName + user?.lastName}
                  </Typography>
                  <CheckCircleIcon sx={{ color: '#3366FF' }} />
                </Stack>
                <Typography variant="subtitle2" sx={{ color: '#fff' }}>
                  {fShortenNumber(followFilters.length)}{' '}
                  {followFilters.length > 1 ? t('Followers') : t('Follower')}
                </Typography>
                {followFind ? (
                  <Button
                    variant="outlined"
                    sx={{
                      px: '1.5rem', // Smaller horizontal padding
                      color: 'white',
                      fontSize: '0.8rem', // Smaller font size
                      mt: '1rem'
                    }}
                    onClick={handleDeleteFollowById}
                  >
                    {t('Followed')}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      px: '1.5rem', // Smaller horizontal padding
                      color: 'white',
                      fontSize: '0.8rem', // Smaller font size
                      mt: '1rem'
                    }}
                    onClick={handleAddFollow}
                  >
                    {t('Follow')}
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
          {authState?.user?._id === _id && (
            <Stack
              sx={{
                justifyContent: 'flex-start',
                display: 'flex', // Luôn hiển thị Stack
              }}
            >
              <Button
                variant="contained"
                size="medium"
                startIcon={<EditIcon sx={{ color: '#fff' }} />}
                sx={{ color: '#fff', mt: '2rem', mr: '2rem' }}
                onClick={handleNavigate}
              >
                {t('Update Profile')}
              </Button>
            </Stack>
          )}
        </Stack>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label={t('Posts')} value="1" />
                <Tab label={t('Following')} value="2" />
                <Tab label={t('Video')} value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <PostTab />
            </TabPanel>
            <TabPanel value="2">
              <FollowingTab />
            </TabPanel>
            <TabPanel value="3">
              <VideoTab />
            </TabPanel>
          </TabContext>
        </Box>
      </Stack>
    </Card>
  );
};

export default AccountActionTabs;
