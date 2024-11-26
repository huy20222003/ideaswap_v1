//react
import { useState, useEffect, useCallback } from 'react';
//react-router-dom
import { useParams, useNavigate } from 'react-router-dom';
//mui
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  styled,
  CardActions,
  Button,
  IconButton,
} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//context
import { useDocument, useUser, useAuth } from '../../../hooks/context';
//html-parser
import HTMLReactParser from 'html-react-parser';
//i18n
import { useTranslation } from 'react-i18next';
//ultils
import { fShortenNumber } from '../../../utils/formatNumber';
//------------------------------------------

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

const DocumentDetail = () => {
  const {
    documentState: { document },
    handleGetDocumentById,
    handleUpdateCountDownloadDocument,
  } = useDocument();

  const {
    userState: { user },
    handleGetUserById,
  } = useUser();

  const { _id } = useParams();

  const navigate = useNavigate();

  const [reload, setReload] = useState(false);

  const {
    authState: { isAuthenticated },
  } = useAuth();

  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  const fetchDocument = useCallback(async () => {
    await handleGetDocumentById(_id);
  }, [_id, handleGetDocumentById]);

  const fetchUser = useCallback(async () => {
    document?.userID && (await handleGetUserById(document?.userID));
  }, [document?.userID, handleGetUserById]);

  useEffect(() => {
    fetchDocument();
    fetchUser();
  }, [fetchDocument, fetchUser, reload]);

  const truncatedDescription = expanded
    ? document?.description
    : `${document?.description.slice(0, 200)}`;

  const { t } = useTranslation('documents');

  const handleUpdateCountDownload = async () => {
    if (isAuthenticated) {
      const response = await handleUpdateCountDownloadDocument(_id, {
        countDownload: document?.countDownload + 1,
      });
      if (response.success) {
        setReload((prev) => !prev);
      }
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <Box sx={{ p: '0.5rem', mt: '4.5rem' }}>
      <Card>
        <CardMedia
          component="img"
          image={document?.imageUrl}
          alt={document?.title}
          sx={{
            objectFit: {
              xs: 'contain',
              sm: 'contain',
              md: 'cover',
              xl: 'cover',
              lg: 'cover',
            },
            height: { xs: '200', sm: '200', md: '300', xl: '350', lg: '350' },
          }}
        />
        <CardContent>
          <Typography variant="h6">{document?.title}</Typography>
          <Typography variant="body2">
            {HTMLReactParser(truncatedDescription)}
            {document?.description.length > 200 && (
              <Typography
                variant="body2"
                color="text.secondary"
                onClick={toggleExpand}
                sx={{ cursor: 'pointer', display: 'inline' }}
              >
                {expanded ? t('Show less') : t('Show more')}
              </Typography>
            )}
          </Typography>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
                gap: '0.25rem',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {t('Author')}:
              </Typography>
              <Typography variant="body2">
                {user?.firstName + ' ' + user?.lastName}
              </Typography>
              <LightTooltip title="Creator" placement="right">
                <CheckCircleIcon sx={{ color: '#3366FF', fontSize: '1rem' }} />
              </LightTooltip>
            </Stack>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconButton>
                <FileDownloadIcon />
              </IconButton>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {fShortenNumber(document?.countDownload)}{' '}
                {document?.countDownload > 1 ? t('downloads') : t('download')}
              </Typography>
            </Stack>
          </Stack>
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
            size="medium"
            startIcon={<FileDownloadIcon sx={{ color: 'white' }} />}
            href={isAuthenticated ? document?.fileUrl : null}
            target="_blank"
            onClick={handleUpdateCountDownload}
          >
            {t('Download')}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default DocumentDetail;
