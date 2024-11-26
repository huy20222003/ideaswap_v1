//react
import { useEffect } from 'react';
//react-router-dom
import { useNavigate } from 'react-router-dom';
//mui
import { Card, CardMedia, CardContent, Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
//propTypes
import PropTypes from 'prop-types';
//utils
import { fShortenNumber } from '../../utils/formatNumber';
//context
import { useVideo, useCensorships, useCourse } from '../../hooks/context';
//sweetalert2
import Swal from 'sweetalert2';
import HTMLReactParser from 'html-react-parser';
//i18n
import { useTranslation } from 'react-i18next';
//-------------------------------------------------

const CourseItem = ({ _id, imageUrl, title, description, view }) => {
  const {t} = useTranslation('courses');
  const truncatedDescription =
    description && description.length > 60
      ? `${description.slice(0, 60)}...`
      : description;

  const truncatedTitle =
    title && title.length > 20 ? `${title.slice(0, 20)}...` : title;

  const navigate = useNavigate();
  const {
    videoState: { videos },
    handleGetAllVideo,
  } = useVideo();
  const {
    censorshipsState: { censorships },
    handleGetAllCensorships,
  } = useCensorships();
  const { handleUpdateView } = useCourse();

  useEffect(() => {
    handleGetAllVideo();
    handleGetAllCensorships();
  }, [handleGetAllCensorships, handleGetAllVideo]);

  const videoFilterByCourseId = videos.filter(
    (video) => video?.courseID === _id
  );

  const videosWithStatus = videoFilterByCourseId.map((video) => {
    const censorshipItem = censorships.find(
      (item) => item?.contentID === video?._id
    );
    const status = censorshipItem ? censorshipItem.status : 'pending';
    return {
      ...video,
      status,
    };
  });

  const handleNavigateToVideoPage = async () => {
    if (videoFilterByCourseId.length !== 0) {
      await handleUpdateView(_id, { view: view + 1 });
      navigate(`/course/${_id}?videoId=${videosWithStatus[0]?._id}`);
    } else {
      Swal.fire({
        text: t("This course does not have any videos yet. Please wait"),
        icon: 'warning',
      });
    }
  };

  return (
    <Card
      sx={{
        m: '1rem 1rem 1rem 0',
        p: '0.5rem',
        width: {
          xs: '20rem',
          sm: '20rem',
          md: '14rem',
          xl: '14rem',
          lg: '14rem',
        },
        height: '19rem',
        cursor: 'pointer',
      }}
      onClick={handleNavigateToVideoPage}
    >
      <CardMedia
        component="img"
        sx={{
          p: '0.2rem',
          borderRadius: '0.4rem',
          height: '10rem',
          objectFit: 'contain',
        }}
        image={imageUrl}
        alt={title}
      />
      <CardContent sx={{ p: '0.1rem' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: '0.2rem',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <VisibilityIcon sx={{ width: '1rem', mr: '0.5rem' }} />
            <Typography variant="body2" color="text.secondary">
              {fShortenNumber(view)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowUpwardIcon sx={{ color: 'green' }} />
            <Typography variant="body2" sx={{ mx: '0.2rem' }}>
              {0}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: '0.5rem' }}>
          <Typography variant="subtitle2">{truncatedTitle}</Typography>
          <Typography variant="body2" color="text.secondary">
            {HTMLReactParser(truncatedDescription)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

CourseItem.propTypes = {
  _id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  view: PropTypes.number.isRequired,
};

export default CourseItem;
