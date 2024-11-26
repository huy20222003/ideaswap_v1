//react
import { useState } from 'react';
//react-router-dom
import { Link, useNavigate } from 'react-router-dom';
//mui
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
//components
import Iconify from '../../../Components/iconify';
//sweetalert
import Swal from 'sweetalert2';
//yup
import * as yup from 'yup';
//formik
import { useFormik } from 'formik';
//context
import { useAuth } from '../../../hooks/context';
//cookie
import Cookies from 'js-cookie';
//i18n
import { useTranslation } from 'react-i18next';
//-------------------------------

const LinkStyled = styled(Link)`
  text-decoration: none;
  font-size: 0.875rem;
  color: #229a16;
  margin-left: 0.2rem;
`;

const RegisterForm = () => {
  const navigate = useNavigate();
  document.title = 'Register';
  const {t} = useTranslation('auth');
  const { registerUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .required(t("FirstName is required"))
        .max(200, t("FirstName maximum 200 characters")),
      lastName: yup
        .string()
        .required(t("LastName is required"))
        .max(200, t("LastName maximum 200 characters")),
        username: yup
        .string()
        .required(t("Username is required"))
        .min(8, t("Username must be at least 8 characters long"))
        .matches(/^[a-zA-Z0-9]*$/, t("Username must not contain special characters")),
      email: yup
        .string()
        .required(t("Email is required"))
        .matches(/^\S+@\S+\.\S+$/, t("Invalid email")),
      password: yup
        .string()
        .required(t("Password is required"))
        .min(7)
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{7,}$/,
          t("Minimum password consists of 7 characters, with uppercase letters, lowercase letters, numbers and special characters")
        ),
      confirmPassword: yup
        .string()
        .required(t("ConfirmPassword is required"))
        .oneOf([yup.ref('password')], t("Password do not match")),
    }),
    onSubmit: async (values) => {
      if (formik.values.password !== formik.values.confirmPassword) {
        Swal.fire(t("Error"), t("Password do not match"), 'error');
      } else {
        try {
          setLoading(true);
          const registerData = await registerUser(values);
          if (!registerData.success) {
            Swal.fire(t("Failed"), t("Please check the information again!"), 'error');
            setLoading(false);
          } else {
            const expiration = new Date();
            expiration.setTime(expiration.getTime() + 60 * 60 * 1000);
            Cookies.set('user', registerData.accessToken, {
              expires: expiration,
            });
            Cookies.set('refresh', registerData.refreshToken, { expires: 365 });
            Swal.fire(t("Success"), t("Sign up Success!"), 'success');
            navigate('/auth/login');
          }
        } catch (error) {
          Swal.fire(t("Error"), t("Server Error"), 'error');
        }
      }
    },
  });

  const handleCheck = () => {
    Swal.fire({
      title: t("Question"),
      text: t("Hoang Sa and Truong Sa belong to which country?"),
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Viet Nam',
      cancelButtonText: 'Orthers',
    }).then(async (result) => {
      if (result.isConfirmed) {
        formik.handleSubmit();
      } else {
        Swal.fire(t("Error"), t("Resgister failed!"), 'error');
      }
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ maxWidth: '30rem' }}>
      <Typography variant="h4" sx={{ my: '1rem' }}>
        {t("Register")}
      </Typography>
      <Box sx={{ mt: '0.5rem', mb: '1rem' }}>
        <Stack sx={{ gap: '1.5rem' }}>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: '0.5rem',
            }}
          >
            <Box>
              <TextField
                label={t("First Name")}
                name="firstName"
                id="firstName"
                required
                variant="outlined"
                fullWidth
                error={!!(formik.touched.firstName && formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                autoComplete="firstName"
                {...formik.getFieldProps('firstName')}
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
                    if (document.getElementById('firstName').value === '') {
                      return;
                    } else {
                      document.getElementById('lastName').focus();
                    }
                  }
                }}
              />
            </Box>
            <Box>
              <TextField
                label={t("Last Name")}
                id="lastName"
                name="lastName"
                required
                variant="outlined"
                fullWidth
                error={!!(formik.touched.lastName && formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                autoComplete="lastName"
                {...formik.getFieldProps('lastName')}
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
                    if (document.getElementById('lastName').value === '') {
                      return;
                    } else {
                      document.getElementById('username').focus();
                    }
                  }
                }}
              />
            </Box>
          </Stack>
          <Box>
            <TextField
              label={t("Username")}
              name="username"
              id="username"
              required
              variant="outlined"
              fullWidth
              error={!!(formik.touched.username && formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              autoComplete="username"
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
                    document.getElementById('email').focus();
                  }
                }
              }}
            />
          </Box>
          <Box>
            <TextField
              label={t("Email")}
              name="email"
              id="email"
              required
              variant="outlined"
              fullWidth
              error={!!(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoComplete="email"
              {...formik.getFieldProps('email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  if (document.getElementById('email').value === '') {
                    return;
                  } else {
                    document.getElementById('password').focus();
                  }
                }
              }}
            />
          </Box>
          <Box>
            <TextField
              label={t("Password")}
              name="password"
              id="password"
              required
              variant="outlined"
              fullWidth
              error={!!(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="password"
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
                  event.preventDefault();
                  if (document.getElementById('password').value === '') {
                    return;
                  } else {
                    document.getElementById('confirmPassword').focus();
                  }
                }
              }}
            />
          </Box>
          <Box>
            <TextField
              label={t("Confirm Password")}
              name="confirmPassword"
              id="confirmPassword"
              required
              variant="outlined"
              fullWidth
              error={
                !!(
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                )
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              {...formik.getFieldProps('confirmPassword')}
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
          </Box>
        </Stack>
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
            onClick={handleCheck}
          >
            {t("Register")}
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
          sx={{ px: '1.5rem', mx: '0.2rem' }}
          startIcon={<GoogleIcon />}
        >
          <Typography sx={{ color: 'black', ml: '0.2rem', fontSize: '0.8rem' }}>
            Google
          </Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{ px: '1.5rem', mx: '0.2rem' }}
          startIcon={<FacebookIcon />}
        >
          <Typography sx={{ color: 'black', ml: '0.2rem', fontSize: '0.8rem' }}>
            Facebook
          </Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{ px: '1.5rem', mx: '0.2rem' }}
          startIcon={<TelegramIcon />}
        >
          <Typography sx={{ color: 'black', ml: '0.2rem', fontSize: '0.8rem' }}>
            Telegram
          </Typography>
        </Button>
      </Stack>
      <Stack
        sx={{ flexDirection: 'row', justifyContent: 'center', mt: '1rem' }}
      >
        <Typography variant="body2">{t("Do you already have an account?")}</Typography>
        <LinkStyled to="/auth/login">{t("Login here")}</LinkStyled>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
