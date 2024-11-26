//react
import { useEffect } from 'react';
//react-router-dom
import { useNavigate, useParams } from 'react-router-dom';
//mui
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardMedia,
  Box,
} from '@mui/material';
//context
import { useFollow, useUser } from '../../../hooks/context';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------

const PostTabFollower = () => {
  const {
    followState: { follows },
    handleGetAllFollows,
  } = useFollow();
  const {t} = useTranslation('account');

  const {
    userState: { users },
    handleGetAllUsers,
  } = useUser();

  const { _id } = useParams();

  useEffect(() => {
    handleGetAllFollows();
    handleGetAllUsers();
  }, [handleGetAllFollows, handleGetAllUsers]);

  const navigate = useNavigate();

  const followsWithUser = follows
    .map((follow) => {
      // Tìm user tương ứng với followerID từ mảng users
      const followerUser = users.find(
        (user) => user?._id === follow?.followerID
      );
      // Trả về một đối tượng mới gồm thông tin từ follow và user
      return { ...follow, followerUser };
    })
    .filter((follow) => {
      // Lọc ra những đối tượng có user không null và followerID trùng với _id của user
      return follow.followerUser && follow.userID === _id;
    });

  const handleNavigate = (followerID) => {
    navigate(`/account/${followerID}`);
  };

  return (
    <Card sx={{ mr: '1rem' }}>
      <CardHeader title="Follower" sx={{ color: 'primary.main' }} />
      <CardContent
        sx={{
          p: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {followsWithUser.length > 0 ? (
          followsWithUser.map((follow) => (
            <Card
              key={follow?._id}
              sx={{ width: '7rem', height: '8rem', cursor: 'pointer', mx: '0.25rem' }}
              onClick={() => handleNavigate(follow?.followerID)}
            >
              <CardContent sx={{ p: 1, textAlign: 'center' }}>
                <CardMedia
                  component="img"
                  image={follow?.followerUser?.avatar}
                  alt="Paella dish"
                  sx={{ width: '6rem', height: '6rem', borderRadius: '0.5rem' }}
                ></CardMedia>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {follow?.followerUser?.firstName +
                    follow?.followerUser?.lastName}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '3rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2">
              {t("This user has no followers yet")}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PostTabFollower;
