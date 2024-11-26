//react
import { useState, useEffect } from 'react';
//mui
import {
  Box,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//Dayjs
import dayjs from 'dayjs';
//yup
import * as yup from 'yup';
//formik
import { useFormik } from 'formik';
//context
import { useAuth, useUser } from '../../../hooks/context';
//sweetalert2
import Swal from 'sweetalert2';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------

const ProfileInfo = () => {
  document.title = 'Setting';
  const {t} = useTranslation('setting');
  const [datimeValue, setDateTimeValue] = useState(dayjs(Date.now()));
  const [gender, setGender] = useState('Male');
  const {
    authState: { user },
  } = useAuth();

  const { handleUpdateUser } = useUser();

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      _id: user?._id,
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      gender: user?.gender || gender,
      address: user?.address || '',
      birthday: datimeValue,
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
        .max(100, t("Username maximum 100 characters")),
      gender: yup.string(),
      email: yup
        .string()
        .required(t("Email is required"))
        .matches(/^\S+@\S+\.\S+$/, t("Invalid email")),
      phoneNumber: yup.string().max(10, t("PhoneNumber maximum 10 characters")),
      address: yup.string().max(500, t("Address maximum 500 characters")),
    }),
    onSubmit: async (values) => {
      try {
        const response = await handleUpdateUser(values._id, values);
        if (response.success) {
          Swal.fire(t("Success"), t("Successfully updated"), 'success');
        } else {
          Swal.fire(t("Error"), t("Update information failed"), 'error');
        }
      } catch (error) {
        Swal.fire(t("Error"), t("Server Error"), 'error');
      }
    },
  });

  useEffect(() => {
    if (user?.birthday) {
      const birthdayDate = dayjs(user.birthday); // Chuyển đổi định dạng
      setDateTimeValue(birthdayDate); // Gán vào state datimeValue
    }
  }, [user.birthday]);

  useEffect(() => {
    formik.setFieldValue('birthday', datimeValue);
  }, [datimeValue]);

  return (
    <Box sx={{ mt: '1rem' }}>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: '0.5rem',
          justifyContent: 'space-between',
          mb: '1rem',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <TextField
            label={t("FirstName")}
            name="firstName"
            id="firstName"
            required
            variant="outlined"
            fullWidth
            autoComplete="FirstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            error={!!(formik.touched.firstName && formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <TextField
            label={t("LastName")}
            name="lastName"
            id="lastName"
            required
            variant="outlined"
            fullWidth
            autoComplete="LastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={!!(formik.touched.lastName && formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Box>
      </Stack>
      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            xl: 'row',
            lg: 'row',
          },
          gap: '0.5rem',
          justifyContent: 'space-between',
          alignItems: 'end',
          mb: '1rem',
        }}
      >
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['DateTimePicker', 'DateTimePicker']}
              sx={{ alignItems: 'flex-end' }}
            >
              <DatePicker
                label={t("BirthDay")}
                value={datimeValue}
                sx={{ maxWidth: '5rem' }}
                slotProps={{
                  // Targets the `IconButton` component.
                  openPickerButton: {
                    color: 'primary',
                  },
                  // Targets the `InputAdornment` component.
                  inputAdornment: {
                    position: 'end',
                  },
                }}
                onChange={(newValue) => setDateTimeValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{t("Gender")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.gender}
              label={t("Gender")}
              onChange={handleChange}
            >
              <MenuItem value={'Male'}>{t("Male")}</MenuItem>
              <MenuItem value={'Female'}>{t("Female")}</MenuItem>
              <MenuItem value={'Unknow'}>{t("Unknow")}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Stack gap="1rem">
        <Box sx={{ width: '100%' }}>
          <TextField
            label={t("Username")}
            name="username"
            id="username"
            required
            variant="outlined"
            fullWidth
            autoComplete="Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            error={!!(formik.touched.username && formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <TextField
            label={t("Email")}
            name="email"
            id="email"
            required
            variant="outlined"
            fullWidth
            autoComplete="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <TextField
            label={t("PhoneNumber")}
            name="phoneNumber"
            id="phoneNumber"
            variant="outlined"
            fullWidth
            autoComplete="PhoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <TextField
            label={t("Address")}
            name="address"
            id="address"
            variant="outlined"
            fullWidth
            autoComplete="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.address && formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Box>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Box>
            <Button
              variant="contained"
              size="medium"
              sx={{ px: '1.5rem', color: '#fff' }}
              onClick={formik.handleSubmit}
            >
              {t("Change")}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProfileInfo;
