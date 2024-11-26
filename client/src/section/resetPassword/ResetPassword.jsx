import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Iconify from '../../Components/iconify/Iconify';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useUser } from '../../hooks/context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
//------------------------------------------------------------------

export default function ResetPassword() {
  const { t } = useTranslation('auth');
  const {
    userState: { user },
    handleResetPassword,
  } = useUser();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      newPassword: yup
        .string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{7,}$/,
          t(
            'Minimum password consists of 7 characters, with uppercase letters, lowercase letters, numbers and special characters'
          )
        )
        .required(t('New password is required')),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], t('Passwords do not match'))
        .required(t('Confirm new password is required')),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const encodedData = localStorage.getItem('data');
        const decodedData = atob(encodedData);
        const data = JSON.parse(decodedData);
        const response = await handleResetPassword(user?._id, {
          newPassword: values?.newPassword,
          email: data.email,
          code: data.code
        });

        if (response.success) {
          Swal.fire('Success', t('Password changed successfully.'), 'success');
          navigate('/auth/login');
          formik.setFieldValue('newPassword', '');
          formik.setFieldValue('confirmPassword', '');
        } else {
          Swal.fire('Error', t(response.data.message), 'error');
        }
      } catch (error) {
        Swal.fire('Error', t('An error occurred while changing the password.'), 'error');
      }
      setSubmitting(false);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {t('Change Password')}
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="newPassword"
              name="newPassword"
              label={t('New Password')}
              autoComplete="new-password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...formik.getFieldProps('newPassword')}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  if (document.getElementById('newPassword').value === '') {
                    return;
                  } else {
                    document.getElementById('confirmPassword').focus();
                  }
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label={t('Confirm New Password')}
              autoComplete="new-password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...formik.getFieldProps('confirmPassword')}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  formik.handleSubmit();
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: 'white' }}
              disabled={formik.isSubmitting}
            >
              {t('Change Password')}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => navigate(-1)}
            >
              {t('Back')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
