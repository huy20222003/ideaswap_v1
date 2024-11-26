import { useNavigate, useParams } from 'react-router-dom';
//mui
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
//propType
import PropTypes from 'prop-types';
//utils
import { fShortenNumber } from '../../../utils/formatNumber';
//i18n
import { useTranslation } from 'react-i18next';
//----------------------------------------------------

const VideoListItem = (props) => {
  const { _id, imageUrl, title, view } = props.video;
  const toggleDrawer = props.toggleDrawer;
  const navigate = useNavigate();
  const { courseId } = useParams();
  const {t} = useTranslation('videos');

  const handleNavigate = () => {
    navigate(`/course/${courseId}?videoId=${_id}`);
    toggleDrawer();
  };

  const truncatedTitle =
    title && title.length > 30 ? `${title.slice(0, 30)}...` : title;

  return (
    <Card
      sx={{
        my: '0.5rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
        px: '0.25rem',
        gap: '1rem'
      }}
      onClick={handleNavigate}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        sx={{
          width: '5rem',
          height: '5rem',
          borderRadius: '0.4rem',
          objectFit: 'contain',
        }}
        alt="Paella dish"
      />
      <CardContent
        sx={{
          padding: '0px !important', // Ensure all padding is removed
          '&:last-child': {
            paddingBottom: '0px !important' // Ensure paddingBottom is also removed
          }
        }}
      >
        <Typography variant="body1" color="text.primary">
          {truncatedTitle}
        </Typography>
        <Box sx={{ display: 'flex', my: '0.2rem', alignItems: 'center' }}>
          <VisibilityIcon sx={{ width: '1rem', mr: '0.5rem' }} />
          <Typography variant="body2" color="text.secondary">
            {fShortenNumber(view)} {view > 1 ? t("views") : t("view")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

VideoListItem.propTypes = {
  video: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
  }).isRequired,
  toggleDrawer: PropTypes.func
};

export default VideoListItem;
