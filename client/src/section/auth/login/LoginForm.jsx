import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import styled from '@emotion/styled';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Iconify from '../../../Components/iconify';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from '../../../hooks/context';
import Cookies from 'js-cookie';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------------------------------

const LinkStyled = styled(Link)`
  text-decoration: none;
  font-size: 0.875rem;
  color: #229a16;
  margin-left: 0.2rem;
`;

const LoginForm = () => {
  const navigate = useNavigate();
  document.title = 'Login';
  const { loginUser, loadUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {t} = useTranslation('auth');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required(t("Username is required"))
        .matches(
          /^[a-zA-Z0-9]*$/,
          t("Username must not contain special characters")
        ),
      password: yup
        .string()
        .required(t("Password is required"))
        .min(7)
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{7,}$/,
          t("Minimum password consists of 7 characters, with uppercase letters, lowercase letters, numbers and special characters")
        ),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const loginData = await loginUser(values);
        if (!loginData.success) {
          Swal.fire(t("Failed"), t("Login Failed"), 'error');
          setLoading(false);
        } else {
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 60 * 60 * 1000);
          Cookies.set('user', loginData.accessToken, { expires: expiration });
          Cookies.set('refresh', loginData.refreshToken, { expires: 365 });
          await loadUser();
          Swal.fire(t("Success"), t("Login Success!"), 'success');
          navigate('/dashboard/app');
        }
      } catch (error) {
        Swal.fire(t("Error"), t("Server Error"), 'error');
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleNavigateForgetPasswordPage = ()=> {
    navigate('/forget-password');
  }

  return (
    <Box sx={{ maxWidth: '30rem', margin: 'auto' }}>
      <Typography variant="h4" sx={{ my: '0.5rem', textAlign: 'center' }}>
        Login
      </Typography>
      <Typography variant="body2" sx={{ color: 'grey', textAlign: 'center' }}>
        {isMobile
          ? t("Welcome back! Enter your credentials to access your account")
          : t("Wellcome back, Enter your credentials to access your account")}
      </Typography>
      <Box sx={{ mt: '0.5rem', my: '1rem' }}>
        <Stack sx={{ gap: '1.5rem' }}>
          <Box sx={{ width: '100%' }}>
            <TextField
              label={t("Username")}
              name="username"
              id="username"
              required
              variant="outlined"
              fullWidth
              autoComplete="username"
              error={!!(formik.touched.username && formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              {...formik.getFieldProps('username')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  if (document.getElementById('username').value === '') {
                    return;
                  } else {
                    document.getElementById('password').focus();
                  }
                }
              }}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <TextField
              label={t("Password")}
              name="password"
              id="password"
              required
              variant="outlined"
              fullWidth
              error={!!(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              {...formik.getFieldProps('password')}
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
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  formik.handleSubmit();
                }
              }}
            />
            {isMobile && (
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'end',
                  color: 'primary.main',
                  fontSize: '0.75rem',
                  mt: '0.25rem',
                  cursor: 'pointer',
                }}
                onClick={handleNavigateForgetPasswordPage}
              >
                {t("Forget password?")}
              </Typography>
            )}
          </Box>
        </Stack>
        {!isMobile && (
          <Typography
            variant="body2"
            sx={{
              textAlign: 'end',
              color: 'primary.main',
              fontSize: '0.75rem',
              mt: '0.25rem',
              cursor: 'pointer',
            }}
            onClick={handleNavigateForgetPasswordPage}
          >
            {t("Forget password?")}
          </Typography>
        )}
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label={t("Remember me")}
          sx={{ mt: '0.5rem' }}
        />
        {loading ? (
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={30} />
          </Stack>
        ) : (
          <LoadingButton
            fullWidth
            size="medium"
            type="submit"
            variant="contained"
            sx={{ color: 'white', py: '0.5rem', my: '1rem' }}
            loadingIndicator={<CircularProgress size={16} />}
            onClick={formik.handleSubmit}
          >
           {t("Login")}
          </LoadingButton>
        )}
      </Box>
      <Divider sx={{ fontSize: '0.8rem' }}>OR</Divider>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: '1rem',
          mt: '1rem',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="outlined"
          sx={{ px: '1.5rem', mx: '0.2rem', width: 'auto' }}
          startIcon={<GoogleIcon />}
        >
          <Typography sx={{ color: 'black', ml: '0.2rem', fontSize: '0.8rem' }}>
            Google
          </Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{ px: '1.5rem', mx: '0.2rem', width: 'auto' }}
          startIcon={<FacebookIcon />}
        >
          <Typography sx={{ color: 'black', ml: '0.2rem', fontSize: '0.8rem' }}>
            Facebook
          </Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{ px: '1.5rem', mx: '0.2rem', width: 'auto' }}
          startIcon={<TelegramIcon />}
        >
          <Typography sx={{ color: 'black', ml: '0.2rem', fontSize: '0.8rem' }}>
            Telegram
          </Typography>
        </Button>
      </Stack>
      <Stack
        sx={{ flexDirection: 'row', justifyContent: 'center', mt: '2rem' }}
      >
        <Typography variant="body2">{t("Do not have an account?")}</Typography>
        <LinkStyled to="/auth/register">{t("Register here")}</LinkStyled>
      </Stack>
    </Box>
  );
};

export default LoginForm;
