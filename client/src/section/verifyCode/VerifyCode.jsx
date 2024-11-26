import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
//mui
import {
  Container,
  Divider,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
} from '@mui/material';
//context
import { useCode, useUser } from '../../hooks/context';
//sweetalert2
import Swal from 'sweetalert2';
//proptype
import PropTypes from 'prop-types';
//yup
import * as yup from 'yup';
//formik
import { useFormik } from 'formik';
//i18n
import { useTranslation } from 'react-i18next';

const VerifyCode = () => {
  const { handleVerifyCode } = useCode();
  const { t } = useTranslation('auth');
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const {
    userState: { user },
  } = useUser();

  const formik = useFormik({
    initialValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: '',
      email: user?.email,
    },
    validationSchema: yup.object({
      code1: yup.string().required(t('Code is required')),
      code2: yup.string().required(t('Code is required')),
      code3: yup.string().required(t('Code is required')),
      code4: yup.string().required(t('Code is required')),
      code5: yup.string().required(t('Code is required')),
      code6: yup.string().required(t('Code is required')),
      email: yup.string().required('Email is required'),
    }),
    onSubmit: async (values) => {
      const code = `${values.code1}${values.code2}${values.code3}${values.code4}${values.code5}${values.code6}`;
      try {
        const res = await handleVerifyCode({
          code,
          email: values.email,
        });
        if (res.success) {
          navigate('/reset-password');
          const data = { code, email: values.email };
          localStorage.setItem('data', btoa(JSON.stringify(data)));
        } else {
          Swal.fire(t('Failed'), t('Verification code is incorrect!'), 'error');
        }
      } catch (error) {
        Swal.fire(t('Error'), t('Server Error'), 'error');
      }
    },
  });

  const handleChange = (e, index) => {
    formik.handleChange(e);
    if (e.target.value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            {t('Verify Code')}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            {t('Please enter the 6-digit code sent to your email.')}
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3, width: '100%' }}
          >
            <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
              {[...Array(6)].map((_, index) => (
                <TextField
                  key={index}
                  name={`code${index + 1}`}
                  id={`code${index + 1}`}
                  required
                  variant="outlined"
                  inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                  sx={{
                    width: '3rem',
                    marginRight: index < 5 ? '0.5rem' : '0',
                  }}
                  value={formik.values[`code${index + 1}`]}
                  onChange={(e) => handleChange(e, index)}
                  onBlur={formik.handleBlur}
                  error={
                    !!(
                      formik.touched[`code${index + 1}`] &&
                      formik.errors[`code${index + 1}`]
                    )
                  }
                  inputRef={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ color: 'white' }}
            >
              {t('Verify')}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
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

VerifyCode.propTypes = {
  newPassword: PropTypes.string.isRequired,
};

export default VerifyCode;
