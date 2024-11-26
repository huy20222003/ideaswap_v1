import { useNavigate } from 'react-router-dom';
//mui
import {
  Avatar,
  Box,
  Stack,
  TextField,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
//context
import { useCommon, useAuth } from '../../../hooks/context';
//Component
import FormDialogPostBlog from '../../../Components/FormDialog/Blog/FormDialogPostBlog';
//i18n
import { useTranslation } from 'react-i18next';
//------------------------------------------------------------------------

const PostBlog = () => {
  const { setOpenFormDialog } = useCommon();
  const {
    authState: { isAuthenticated, user },
  } = useAuth();
  const navigate = useNavigate();

  const handleOpenPostBlog = () => {
    if (isAuthenticated) {
      setOpenFormDialog(true);
    } else {
      navigate('/auth/login');
    }
  };

  const { t } = useTranslation('blogs');

  return (
    <Card sx={{ my: '1rem', bgcolor: 'primary.main' }}>
      <CardContent>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Box>
            <Avatar alt="Avatar" src={user?.avatar} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              sx={{
                bgcolor: 'white',
                borderRadius: '0.5rem',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ModeEditOutlineOutlinedIcon />
                  </InputAdornment>
                ),
                readOnly: true,
                placeholder: t('Would you write something?'),
              }}
              onClick={handleOpenPostBlog}
            />
          </Box>
          <Box>
            <CameraAltOutlinedIcon
              sx={{
                width: '2rem',
                height: '2rem',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={handleOpenPostBlog}
            />
          </Box>
        </Stack>
      </CardContent>
      <FormDialogPostBlog />
    </Card>
  );
};

export default PostBlog;
