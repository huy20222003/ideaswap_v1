import { useState } from 'react';
//mui
import {
  Box,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//yup
import * as yup from 'yup';
//formik
import { useFormik } from 'formik';
//sweetalert2
import Swal from 'sweetalert2';
//context
import { useCode, useAuth } from '../../../hooks/context';
//component
import FormDialogVerifyCode from '../../../Components/FormDialog/Code/FormDialogVerifyCode';
import Iconify from '../../../Components/iconify/Iconify';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------

const Password = () => {
  const { handleSendCode, setOpenFormDialogVerifyCode } = useCode();
  const { t } = useTranslation('setting');
  const {
    authState: { user },
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      newPassword: yup
        .string()
        .required(t('Password is required'))
        .min(7)
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{7,}$/,
          t(
            'Minimum password consists of 7 characters, with uppercase letters, lowercase letters, numbers and special characters'
          )
        ),
      confirmPassword: yup
        .string()
        .required(t('ConfirmPassword is required'))
        .oneOf([yup.ref('newPassword')], t('Password do not match')),
    }),
    onSubmit: async (values) => {
      if (values.newPassword !== values.confirmPassword) {
        Swal.fire(t('Error'), t('Password do not match'), 'error');
      } else {
        setLoading(true);
        try {
          const response = await handleSendCode({ email: user?.email });
          if (response.success) {
            setOpenFormDialogVerifyCode(true);
          } else {
            Swal.fire(t('Error'), t('Email has not been sent!'), 'error');
          }
        } catch (error) {
          Swal.fire(t('Error'), t('Server Error'), 'error');
        } finally {
          setLoading(false);
        }
      }
    },
  });

  return (
    <Box>
      <Box sx={{ mb: '1.5rem' }}>
        <TextField
          label={t('New Password')}
          name="newPassword"
          id="newPassword"
          required
          variant="outlined"
          fullWidth
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!(formik.touched.newPassword && formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
          autoComplete="password"
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
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ mb: '1.5rem' }}>
        <TextField
          label={t('Confirm Password')}
          name="confirmPassword"
          id="confirmPassword"
          required
          variant="outlined"
          fullWidth
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            !!(formik.touched.confirmPassword && formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          autoComplete="password"
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
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Box>
          <Button
            variant="contained"
            size="medium"
            sx={{ px: '1.5rem', color: '#fff' }}
            onClick={formik.handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              t('Change')
            )}
          </Button>
        </Box>
      </Stack>
      <FormDialogVerifyCode newPassword={formik.values.newPassword} />
    </Box>
  );
};

export default Password;
