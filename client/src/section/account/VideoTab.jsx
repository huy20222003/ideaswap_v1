//react
import { useEffect, useState } from 'react';
//react-router-dom
import { useNavigate, useParams } from 'react-router-dom';
//mui
import {
  Stack,
  Typography,
  Card,
  Box,
  TextField,
  CardContent,
  CardMedia,
  InputAdornment,
  Pagination,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
//utils
import { fShortenNumber } from '../../utils/formatNumber';
//context
import { useVideo, useCensorships } from '../../hooks/context';
//i18n
import { useTranslation } from 'react-i18next';
//----------------------------------------------------------

const VideoTab = () => {
  const {
    videoState: { videos },
    handleGetAllVideo,
  } = useVideo();
  const { t } = useTranslation(['account', 'videos']);

  const [searchValue, setSearchValue] = useState('');
  const [videoArrays, setVideoArrays] = useState([]);

  const { _id } = useParams();

  const navigate = useNavigate();

  const {
    censorshipsState: { censorships },
    handleGetAllCensorships,
  } = useCensorships();

  useEffect(() => {
    handleGetAllVideo();
    handleGetAllCensorships();
  }, [handleGetAllVideo, handleGetAllCensorships]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleNavigate = (videoId, courseID) => {
    navigate(`/course/${courseID}?videoId=${videoId}`);
  };

  useEffect(() => {
    const videosWithStatus = videos
      ?.filter((video) => video?.userID === _id) // Lọc video theo userID
      .map((video) => {
        const censorshipItem = censorships.find(
          (item) => item?.contentID === video?._id
        );
        const status = censorshipItem ? censorshipItem.status : 'pending';

        // Tạo một đối tượng mới với trường status được gán từ censorship
        return {
          ...video,
          status: status,
        };
      })
      .filter((video) => video?.status === 'approved');

    if (searchValue === '') {
      setVideoArrays(videosWithStatus);
    } else {
      setVideoArrays(
        videosWithStatus.filter((video) =>
          video?.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [videos, censorships, searchValue, _id]);

  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 9; // Set the number of documents per page

  // Calculate the indexes for slicing the documents array
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentVideos = videoArrays.slice(indexOfFirstVideo, indexOfLastVideo);

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
          Video
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
            placeholder: t('Search for video'),
          }}
        />
      </Stack>
      <hr />
      <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {videoArrays.length > 0 ? (
          currentVideos.map((video) => {
            const truncatedTitle =
              video?.title && video?.title.length > 20
                ? `${video?.title.slice(0, 20)}...`
                : video?.title;
            return (
              <Card
                key={video?._id}
                sx={{
                  m: '0.5rem',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  cursor: 'pointer',
                  width: '22rem',
                  p: '0.25rem',
                }}
                onClick={() => handleNavigate(video?._id, video?.courseID)}
              >
                <CardMedia
                  component="img"
                  image={video?.imageUrl}
                  sx={{
                    width: '5rem',
                    height: '5rem',
                    borderRadius: '0.4rem',
                    objectFit: 'contain',
                  }}
                  alt={truncatedTitle}
                />
                <CardContent>
                  <Typography variant="body1" color="text.primary">
                    {truncatedTitle}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      my: '0.2rem',
                      alignItems: 'center',
                    }}
                  >
                    <VisibilityIcon sx={{ width: '1rem', mr: '0.5rem' }} />
                    <Typography variant="body2" color="text.secondary">
                      {fShortenNumber(video?.view)}{' '}
                      {video?.view > 1 ? t('views') : t('view')}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })
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
            <Typography variant="body2">{t('No videos found')}</Typography>
          </Box>
        )}
      </Stack>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'center', mt: '2rem' }}>
        <Pagination
          count={Math.ceil(videoArrays.length / videosPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

export default VideoTab;
