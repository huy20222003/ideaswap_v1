//react
import { useState, useEffect } from 'react';
//react-router-dom
import { useNavigate, useParams } from 'react-router-dom';
//mui
import {
  Stack,
  Typography,
  Card,
  Box,
  TextField,
  Menu,
  MenuItem,
  InputAdornment,
  Pagination,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
//utils
import { fShortenNumber } from '../../utils/formatNumber';
//context
import { useFollow, useUser } from '../../hooks/context';
//i18n
import { useTranslation } from 'react-i18next';
//----------------------------------------------------------

const FollowingTab = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation('account');

  const {
    followState: { follows },
    handleGetAllFollows,
  } = useFollow();

  const {
    userState: { users },
    handleGetAllUsers,
  } = useUser();

  const { _id } = useParams();
  const [followingArrays, setFollowingArrays] = useState([]);

  useEffect(() => {
    handleGetAllFollows();
    handleGetAllUsers();
  }, [handleGetAllFollows, handleGetAllUsers]);

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    // Cập nhật trạng thái với giá trị mới từ input
    setSearchValue(event.target.value);
  };

  const followingsWithUser = follows
    .map((follow) => {
      // Tìm user tương ứng với followerID từ mảng users
      const user = users.find((user) => user?._id === follow?.userID);
      // Trả về một đối tượng mới gồm thông tin từ follow và user
      return { ...follow, user };
    })
    .filter((follow) => {
      // Lọc ra những đối tượng có user không null và followerID trùng với _id của user
      return follow.user && follow.followerID === _id;
    });

  const handleNavigate = (userID) => {
    navigate(`/account/${userID}`);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (searchValue === '') {
      setFollowingArrays(followingsWithUser);
    } else {
      setFollowingArrays(
        followingsWithUser.filter((folow) =>
          folow.user.firstName.toLowerCase().includes(searchValue.toLowerCase())
        ) ||
          followingsWithUser.filter((folow) =>
            folow.user.lastName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
      );
    }
  }, [followingsWithUser, searchValue]);

  const [currentPage, setCurrentPage] = useState(1);
  const followingsPerPage = 9; // Set the number of documents per page

  // Calculate the indexes for slicing the documents array
  const indexOfLastFollowing = currentPage * followingsPerPage;
  const indexOfFirstFollowing = indexOfLastFollowing - followingsPerPage;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentFollowings = followingArrays.slice(
    indexOfFirstFollowing,
    indexOfLastFollowing
  );

  return (
    <Box>
      <Stack
        sx={{
          flexDirection: {
            xs: 'column-reverse',
            sm: 'column-reverse',
            md: 'row',
            xl: 'row',
            lg: 'row',
          },
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            sm: 'flex-start',
            md: 'center',
            xl: 'center',
            lg: 'center',
          },
          my: '1rem',
          gap: { xs: '1rem', sm: '1rem' },
        }}
      >
        <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
          {t('Following')}
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          value={searchValue}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            placeholder: t('Search for following'),
          }}
        />
      </Stack>
      <hr />
      <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {followingArrays.length > 0 ? (
          followingArrays &&
          currentFollowings.map((follow) => (
            <Card
              key={follow?._id}
              sx={{ p: '0.5rem', width: '21rem', m: '1rem', cursor: 'pointer' }}
              onClick={() => handleNavigate(follow?.userID)}
            >
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack sx={{ flexDirection: 'row', gap: '0.5rem' }}>
                  <img
                    src={follow?.user?.avatar}
                    alt={follow?.user?.firstName + follow?.user?.lastName}
                    style={{
                      width: '5rem',
                      height: '5rem',
                      borderRadius: '0.4rem',
                    }}
                  />
                  <Stack sx={{ justifyContent: 'center' }}>
                    <Typography variant="subtitle1">
                      {follow?.user?.firstName + ' ' + follow?.user?.lastName}
                    </Typography>
                    <Stack
                      sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Typography variant="caption">
                        {fShortenNumber(followingsWithUser.length)}{' '}
                        {followingsWithUser.length > 1
                          ? t('Followers')
                          : t('Follower')}
                      </Typography>
                      <PersonIcon fontSize="0.5rem" sx={{ color: 'gray' }} />
                    </Stack>
                  </Stack>
                </Stack>
                <MoreHorizIcon
                  sx={{ cursor: 'pointer' }}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>{t('Follow')}</MenuItem>
                  <MenuItem onClick={handleClose}>{t('About')}</MenuItem>
                </Menu>
              </Stack>
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
            <Typography variant="body2">{t('No users found')}</Typography>
          </Box>
        )}
      </Stack>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(followingArrays.length / followingsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

export default FollowingTab;
