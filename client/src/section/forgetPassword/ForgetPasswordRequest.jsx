import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CssBaseline,
  CircularProgress,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useCode, useUser } from '../../hooks/context';
//i18
import { useTranslation } from 'react-i18next';
//---------------------------------------------------------------

const validationSchema = yup.object({
  data: yup.string().required('Username or Email is required'),
});

const ForgetPasswordRequest = () => {
  const { handleSendCode } = useCode();
  const { handleForgetPassword } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('auth');
  document.title = t('Forget Password');

  const formik = useFormik({
    initialValues: {
      data: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const checkUser = await handleForgetPassword(values);
        if (checkUser.success) {
          const response = await handleSendCode({
            email: checkUser?.user?.email,
          });
          if (response.success) {
            Swal.fire(
              'Success',
              t('Password verification code sent!'),
              'success'
            );
            navigate('/verify-code');
          } else {
            Swal.fire('Error', t('Failed to send verification code'), 'error');
          }
        } else {
          Swal.fire('Error', t('Username or Email does not exist'), 'error');
        }
      } catch (error) {
        Swal.fire('Error', t('Server Error'), 'error');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            {t('Reset Password')}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            {t(
              'Enter your email or username address below and we will send you a verification code to reset your password.'
            )}
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              id="data"
              name="data"
              label={t('Username or Email')}
              variant="outlined"
              value={formik.values.data}
              onChange={formik.handleChange}
              error={formik.touched.data && Boolean(formik.errors.data)}
              helperText={formik.touched.data && formik.errors.data}
              margin="normal"
              autoComplete="data"
              autoFocus
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: 'white' }}
              color="primary"
              disabled={loading}
              onClick={formik.handleSubmit}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                t('Send Verification Code')
              )}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 1, color: 'primary' }}
              onClick={() => navigate(-1)}
            >
              {t('Back')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgetPasswordRequest;
