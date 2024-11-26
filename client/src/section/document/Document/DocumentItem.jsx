import { useNavigate } from 'react-router-dom';
//mui
import { Box, Typography, Button, styled, Stack } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//propTypes
import PropTypes from 'prop-types';
//context
import { useDocument, useAuth } from '../../../hooks/context';
//i18n
import { useTranslation } from 'react-i18next';
//utils
import { fShortenNumber } from '../../../utils/formatNumber';
//----------------------------------------------------------------

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

const DocumentItem = ({ document }) => {
  const { _id, title, imageUrl, user, countDownload, fileUrl } = document;
  const { t } = useTranslation('documents');
  const {
    authState: { isAuthenticated },
  } = useAuth();

  const navigate = useNavigate();

  const { handleUpdateCountDownloadDocument } = useDocument();

  const shortenedTitle =
    title.length > 50 ? title.substring(0, 50) + '...' : title;

  const handleUpdateCountDownload = async () => {
    if (isAuthenticated) {
      await handleUpdateCountDownloadDocument(_id, {
        countDownload: countDownload + 1,
      });
    } else {
      navigate('/auth/login');
    }
  };

  const handleNavigateDocumentDetail = async(documentId) => {
    navigate(`/dashboard/document/${documentId}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: '#EEEEEE',
        borderRadius: '0.4rem',
        p: '0.5rem',
        my: '0.5rem',
        flexDirection: {
          xs: 'column',
          sm: 'column',
          md: 'row',
          xl: 'row',
          lg: 'row',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component={'img'}
          src={imageUrl}
          sx={{
            width: '5rem',
            height: '5rem',
            borderRadius: '0.4rem',
            mx: '1rem',
            objectFit: 'cover',
          }}
        ></Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="body1"
            onClick={() => handleNavigateDocumentDetail(_id)}
            sx={{
              textDecoration: 'none', // Không có gạch chân mặc định
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline', // Gạch chân khi hover
              },
            }}
          >
            {shortenedTitle}
          </Typography>

          <Stack
            sx={{ flexDirection: 'row', gap: '0.25rem', alignItems: 'center' }}
          >
            <Typography variant="body2">
              {' '}
              {t('Author')}: {user?.firstName + ' ' + user?.lastName}
            </Typography>
            <LightTooltip title="Creator" placement="right">
              <CheckCircleIcon sx={{ color: '#3366FF', fontSize: '1rem' }} />
            </LightTooltip>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            p: '0.5rem',
          }}
        >
          <Button
            sx={{ bgcolor: 'primary.main', color: 'white', mb: '0.5rem' }}
            variant="contained"
            size="small"
            startIcon={<FileDownloadIcon sx={{ color: 'white' }} />}
            href={isAuthenticated ? fileUrl : null}
            target="_blank"
            onClick={handleUpdateCountDownload}
          >
            {t('Download')}
          </Button>
          <Typography variant="body2">
            {fShortenNumber(countDownload)} {countDownload > 1 ? t('downloads') : t('download')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

DocumentItem.propTypes = {
  document: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    countDownload: PropTypes.number.isRequired,
    fileUrl: PropTypes.string.isRequired,
    user: PropTypes.object,
  }).isRequired,
};

export default DocumentItem;
