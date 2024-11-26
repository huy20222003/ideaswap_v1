import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//mui
import { Box, Typography, Stack, Avatar, Button, styled } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FlagIcon from '@mui/icons-material/Flag';
import LinkIcon from '@mui/icons-material/Link';
//context
import {
  useUser,
  useFollow,
  useVideo,
  useAuth,
  useHeart,
  useShare,
  useConversation,
} from '../../../hooks/context';
//utils
import { fToNow, fDateTime } from '../../../utils/formatTime';
//prop-types
import PropTypes from 'prop-types';
//ultils
import { fShortenNumber } from '../../../utils/formatNumber';
//sweetalert2
import Swal from 'sweetalert2';
import HTMLReactParser from 'html-react-parser';
//dayjs
import dayjs from 'dayjs';
//i18n
import { useTranslation } from 'react-i18next';
//----------------------------------------------------------

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
}));

const VideoDescription = ({ video }) => {
  const {
    userState: { users },
    handleGetAllUsers,
  } = useUser();
  const { handleAddConversation } = useConversation();

  const { t } = useTranslation('videos');

  const {
    heartState: { hearts },
    handleGetAllHearts,
    handleCreateHeart,
    handleDeleteHeart,
  } = useHeart();

  const [heartIcon, setHeartIcon] = useState(<FavoriteBorderIcon />);

  const {
    shareState: { shares },
    handleCreateShare,
    handleGetAllShares,
  } = useShare();

  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const {
    followState: { follows },
    handleGetAllFollows,
    handleCreateFollow,
    handleDeleteFollow,
  } = useFollow();

  const { authState } = useAuth();

  const { handleUpdateView } = useVideo();
  const navigate = useNavigate();

  // State to track the view count
  const [viewCount, setViewCount] = useState(video?.view || 0);

  useEffect(() => {
    const timer = setInterval(async () => {
      if (viewCount !== null) {
        const response = await handleUpdateView(video?._id, {
          view: viewCount + 1,
        });
        if (response.success) {
          setViewCount((prevViewCount) => prevViewCount + 1); // Update state
        }
      }
    }, 60000); // Thời gian cập nhật là 1 phút (60000ms)

    // Xóa bộ đếm khi component unmount
    return () => clearInterval(timer);
  }, [handleUpdateView, video?._id, viewCount]); // useEffect sẽ chạy lại mỗi khi viewCount thay đổi

  useEffect(() => {
    handleGetAllUsers();
    handleGetAllFollows();
    handleGetAllHearts();
    handleGetAllShares();
  }, [
    handleGetAllFollows,
    handleGetAllHearts,
    handleGetAllShares,
    handleGetAllUsers,
  ]);

  useEffect(() => {
    const heartsFilter = hearts.filter((heart) => heart?.bvID === video?._id);
    setHeartLength(heartsFilter.length);

    const heartFind = heartsFilter.find(
      (heart) =>
        heart?.userID === authState.user?._id && heart.bvID === video?._id
    );
    setHeartIcon(heartFind ? <FavoriteIcon /> : <FavoriteBorderIcon />);
  }, [hearts, video?._id, authState.user]);

  const followFind = follows.find(
    (follow) =>
      follow?.userID === video?.userID &&
      follow?.followerID === authState?.user?._id
  );

  const sharesFilter = shares.filter((share) => share?.bvID === video?._id);

  const [heartLength, setHeartLength] = useState(0);

  const handleClickHeart = async () => {
    if (!authState.isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    const data = { userID: authState.user._id, bvID: video?._id };
    try {
      if (heartIcon.type === FavoriteIcon) {
        await handleDeleteHeart(data);
        setHeartLength((prevHeartLength) => prevHeartLength - 1);
        setHeartIcon(<FavoriteBorderIcon />);
        handleGetAllHearts();
      } else {
        await handleCreateHeart(data);
        setHeartLength((prevHeartLength) => prevHeartLength + 1);
        setHeartIcon(<FavoriteIcon />);
        handleGetAllHearts();
      }
    } catch (error) {
      Swal.fire({
        title: t('Error'),
        text: t(
          'An error occurred while processing your action. Please try again later.'
        ),
        icon: 'error',
      });
    }
  };

  const followsFilter = follows.filter(
    (follow) => follow?.userID === video?.userID
  );

  const truncatedDescription = expanded
    ? video?.description
    : `${video?.description.slice(0, 200)}...`;

  const newVideo = {
    ...video,
    user: users.find((user) => user?._id === video?.userID),
  };

  const handleAddFollow = async () => {
    if (!authState.isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    try {
      const response = await handleCreateFollow({
        followerID: authState?.user?._id,
        userID: video?.userID,
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

  const handleDeleteFollowById = async () => {
    try {
      const response = await handleDeleteFollow({
        followerID: authState?.user?._id,
        userID: video?.userID,
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

  const handleNavigate = (userID) => {
    navigate(`/account/${userID}`);
  };

  const handleShare = async () => {
    if (!authState.isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    await handleCreateShare({
      userID: authState?.user?._id,
      bvID: video?._id,
    });
  };

  const handleCopyToClipboard = () => {
    const fullUrl = window.location.href;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setTooltipOpen(true);
        setTimeout(() => {
          setTooltipOpen(false);
        }, 2000); // Show tooltip for 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
    handleShare();
  };

  const formatDate = (date) => {
    const now = dayjs();
    const videoDate = dayjs(date);
    const oneMonthAgo = now.subtract(1, 'month');

    return videoDate.isBefore(oneMonthAgo)
      ? fDateTime(videoDate)
      : fToNow(videoDate);
  };

  const addConversation = async () => {
    try {
      // Kiểm tra xem video và authState có hợp lệ không
      if (!video || !authState?.user?._id) {
        console.error('Video or user information is missing.');
        return;
      }

      // Tạo danh sách thành viên
      const members = [
        {
          userId: video.userID,
          nickName: '',
        },
        {
          userId: authState.user._id,
          nickName: '',
        },
      ];

      // Gửi yêu cầu thêm cuộc hội thoại mới
      const response = await handleAddConversation({ members });

      // Kiểm tra phản hồi và điều hướng nếu thành công
      if (response.success) {
        navigate(`/chat/${response.conversation._id}`);
      } else {
        console.error('Failed to add conversation:', response.message);
      }
    } catch (error) {
      console.error('An error occurred while adding the conversation:', error);
    }
  };

  return (
    <Box sx={{ mt: '0.5rem' }}>
      <Typography variant="h6">{video?.title}</Typography>
      <Stack
        sx={{
          justifyContent: 'space-between',
          flexDirection: {
            xs: 'column-reverse',
            sm: 'column-reverse',
            md: 'row',
            xl: 'row',
          },
          mt: { md: '1rem', xl: '1rem', lg: '1rem' },
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: { xs: 'space-between', sm: 'space-between' },
          }}
        >
          <Avatar
            alt={newVideo?.user?.firstName + newVideo?.user?.lastName}
            src={newVideo?.user?.avatar}
          />
          <Stack
            sx={{ ml: '0.5rem', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => handleNavigate(newVideo?.user?._id)}
          >
            <Typography variant="subtitle1">
              {newVideo?.user?.firstName + newVideo?.user?.lastName}
            </Typography>
            <Typography variant="body2">
              {fShortenNumber(followsFilter?.length)}
              {''}
              {followsFilter?.length > 1 ? t('Followers') : t('Follower')}
            </Typography>
          </Stack>
          {followFind ? (
            <Button
              variant="outlined"
              sx={{
                px: '1.5rem', // Smaller horizontal padding
                py: '0.25rem', // Smaller vertical padding
                color: 'primary.main',
                ml: '1rem',
                borderRadius: '2rem',
                fontSize: '0.8rem', // Smaller font size
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
                py: '0.25rem', // Smaller vertical padding
                color: 'white',
                ml: '1rem',
                borderRadius: '2rem',
                fontSize: '0.8rem', // Smaller font size
              }}
              onClick={handleAddFollow}
            >
              {t('Follow')}
            </Button>
          )}
          <Button
            variant="contained"
            sx={{ ml: '1rem', color: 'white' }}
            onClick={addConversation}
          >
            Chat
          </Button>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: '0.5rem',
            justifyContent: { xs: 'space-between', sm: 'space-between' },
            my: { xs: '0.5rem', sm: '0.5rem' },
          }}
        >
          <Button
            sx={{
              borderRadius: '2rem',
              px: '2rem',
              py: '0.5rem',
            }}
            variant="text"
            startIcon={heartIcon}
            onClick={handleClickHeart}
          >
            {fShortenNumber(heartLength)}
          </Button>
          <Button
            sx={{
              borderRadius: '2rem',
              px: '2rem',
              py: '0.5rem',
            }}
            variant="text"
            startIcon={<FlagIcon />}
          ></Button>
          <LightTooltip
            title={t('URL copied to clipboard!')}
            open={tooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <Button
              sx={{
                borderRadius: '2rem',
                px: '2rem',
                py: '0.5rem',
              }}
              variant="text"
              startIcon={<LinkIcon />}
              onClick={handleCopyToClipboard}
            >
              {fShortenNumber(sharesFilter?.length)}
            </Button>
          </LightTooltip>
        </Stack>
      </Stack>
      <Stack sx={{ flexDirection: 'row', gap: '1rem', my: '1rem' }}>
        <Typography variant="subtitle2">
          {fShortenNumber(video?.view)}{' '}
          {video?.view > 1 ? t('views') : t('view')}
        </Typography>
        <Typography variant="subtitle2">
          {formatDate(video?.createdAt)}
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.primary">
        {HTMLReactParser(truncatedDescription)}
        {video?.description.length > 50 && (
          <Typography
            variant="body2"
            color="text.secondary"
            onClick={toggleExpand}
            sx={{ cursor: 'pointer', display: 'inline' }}
          >
            {expanded ? t('Show less') : '... ' + t('Show more')}
          </Typography>
        )}
      </Typography>
    </Box>
  );
};

// Define PropTypes
VideoDescription.propTypes = {
  video: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
  }).isRequired,
};

export default VideoDescription;
