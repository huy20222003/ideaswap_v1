//react-router-dom
import { useNavigate } from 'react-router-dom';
//mui
import {
  Card,
  Box,
  Typography,
  CardMedia,
  CardContent,
  Button,
  CardActions,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
//propTypes
import PropTypes from 'prop-types';
//utils
import { fShortenNumber } from '../../../utils/formatNumber';
//i18n
import { useTranslation } from 'react-i18next';
//context
import { useAuth, useDocument } from '../../../hooks/context';
//-------------------------------------------------

const RelatedDocumentItem = ({
  _id,
  imageUrl,
  title,
  countDownload,
  fileUrl,
}) => {
  const truncatedTitle =
    title && title.length > 25 ? `${title.slice(0, 25)}...` : title;

  const { handleUpdateCountDownloadDocument } = useDocument();
  const {
    authState: { isAuthenticated },
  } = useAuth();

  const navigate = useNavigate();
  const { t } = useTranslation('documents');

  const handleNavigateDocumentDetail = () => {
    navigate(`/dashboard/document/${_id}`);
  };

  const handleUpdateCountDownload = async () => {
    if (isAuthenticated) {
      await handleUpdateCountDownloadDocument(_id, {
        countDownload: countDownload + 1,
      });
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <Card
      sx={{
        m: 1,
        p: 1,
        width: '100%',
        maxHeight: '20rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        sx={{
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
            <FileDownloadIcon sx={{ width: '1rem', mr: '0.5rem' }} />
            <Typography variant="body2" color="text.secondary">
              {fShortenNumber(countDownload)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: '0.5rem' }}>
          <Typography
            variant="body1"
            onClick={() => handleNavigateDocumentDetail(_id)}
            sx={{
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {truncatedTitle}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            my: '1rem',
            width: '100%',
          }}
          variant="contained"
          size="small"
          startIcon={<FileDownloadIcon sx={{ color: 'white' }} />}
          href={isAuthenticated ? fileUrl : null}
          target="_blank"
          onClick={handleUpdateCountDownload}
        >
          {t('Download')}
        </Button>
      </CardActions>
    </Card>
  );
};

RelatedDocumentItem.propTypes = {
  _id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  countDownload: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  fileUrl: PropTypes.string.isRequired,
};

export default RelatedDocumentItem;