import { forwardRef, useRef } from 'react';
//mui
import {
  Dialog,
  DialogTitle,
  Stack,
  Divider,
  DialogContent,
  DialogContentText,
  Slide,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//context
import { useUser, useCode, useAuth } from '../../../../hooks/context';
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
//----------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialogVerifyCode = ({ newPassword }) => {
  const {
    openFormDialogVerifyCode,
    setOpenFormDialogVerifyCode,
    handleVerifyCode,
  } = useCode();

  const { handleUpdateUser } = useUser();
  const {
    authState: { user },
  } = useAuth();
  const { t } = useTranslation('setting');

  const handleClose = () => {
    setOpenFormDialogVerifyCode(false);
  };

  const inputRefs = useRef([]);

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
      code1: yup.string().required(t("Code is required")),
      code2: yup.string().required(t("Code is required")),
      code3: yup.string().required(t("Code is required")),
      code4: yup.string().required(t("Code is required")),
      code5: yup.string().required(t("Code is required")),
      code6: yup.string().required(t("Code is required")),
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
          const response = await handleUpdateUser(user?._id, {
            password: newPassword,
          });
          if (response.success) {
            Swal.fire(t("Success"), t("Updated password successfully!"), 'success');
            formik.resetForm();
            handleClose();
          } else {
            Swal.fire(t("Failed"), t("Password update failed!"), 'error');
          }
        } else {
          Swal.fire(t("Failed"), t("Verification code is incorrect!"), 'error');
        }
      } catch (error) {
        Swal.fire(t("Error"), t("Server Error"), 'error');
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
    <Dialog
      open={openFormDialogVerifyCode}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 1rem',
        }}
      >
        <DialogTitle>{t("Verify Code")}</DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <DialogContent sx={{ width: '100%' }}>
        <DialogContentText>
          <Box display="flex" justifyContent="space-between">
            {[...Array(6)].map((_, index) => (
              <TextField
                key={index}
                name={`code${index + 1}`}
                id={`code${index + 1}`}
                required
                variant="outlined"
                inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                sx={{ width: '3rem', marginRight: index < 5 ? '0.5rem' : '0' }}
                value={formik.values[`code${index + 1}`]}
                onChange={(e) => handleChange(e, index)}
                onBlur={formik.handleBlur}
                error={!!(formik.touched[`code${index + 1}`] && formik.errors[`code${index + 1}`])}
                inputRef={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </Box>
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          {t("Cancel")}
        </Button>
        <Button
          variant="contained"
          sx={{ color: '#fff' }}
          onClick={formik.handleSubmit}
        >
          {t("Verify")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialogVerifyCode.propTypes = {
  newPassword: PropTypes.string.isRequired,
};

export default FormDialogVerifyCode;
