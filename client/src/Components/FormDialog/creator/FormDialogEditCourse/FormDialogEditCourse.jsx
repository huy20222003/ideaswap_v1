import { forwardRef, useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  DialogTitle,
  Button,
  Stack,
  Divider,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useCourse, useAuth } from '../../../../hooks/context';
import CourseFormImage from './CourseFormImage';
import { fShortenNumber } from '../../../../utils/formatNumber';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
//ckeditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import editorConfig from '../../../../config/editorConfig';
import HTMLReactParser from 'html-react-parser';
//i18n
import { useTranslation } from 'react-i18next';
//----------------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialogEditCourse = () => {
  const {
    courseState: { course },
    openFormDialogEditCourse,
    setOpenFormDialogEditCourse,
    handleUpdateCourse,
    handleGetAllCourses,
  } = useCourse();
  const {t} = useTranslation('courses');

  const {
    authState: { user },
  } = useAuth();

  const [progressValue, setProgressValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const handleClose = () => {
    setOpenFormDialogEditCourse(false);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      imageBase64: '',
      userID: user?._id || '', // Ensuring user ID is always available
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .required(t("Title is required"))
        .max(100, t("The maximum number of characters is 100")),
      description: yup
        .string()
        .required(t("Description is required"))
        .max(5000, t("The maximum number of characters is 5000")),
      imageBase64: yup.string().required(t("Image URL is required")),
      userID: yup.string().required('User ID is required'),
    }),
    onSubmit: async (values) => {
      try {
        setShowProgress(true);
        const response = await handleUpdateCourse(
          course?._id,
          values,
          setProgressValue
        );
        const successMessage = response.success
          ? t("Update course successful!")
          : t("Update course failed!");
        setOpenFormDialogEditCourse(false);
        handleGetAllCourses();
        Swal.fire({
          title: successMessage,
          icon: response.success ? 'success' : 'error',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      } catch (error) {
        setOpenFormDialogEditCourse(false);
        Swal.fire({
          title: t("Server Error"),
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      } finally {
        setShowProgress(false); // Ẩn thanh tiến trình và label phần trăm sau khi quá trình xử lý hoàn tất
      }
    },
  });

  useEffect(() => {
    if (course) {
      formik.setValues({
        title: course.title || '',
        description: course.description || '',
        imageBase64: course.imageUrl || '',
        userID: course.userID || '',
      });
    }
  }, [course]);

  return (
    <Dialog
      open={openFormDialogEditCourse}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { width: 'auto', maxWidth: 'none' } }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <DialogTitle>{t("Edit Course")}</DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <DialogContent>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <Box sx={{ mb: '1.5rem' }}>
              <TextField
                variant="outlined"
                label={t("Title")}
                id="title"
                name="title"
                fullWidth
                multiline
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {formik.values.title.length}/100
              </Stack>
            </Box>
            <Box sx={{ mb: '1.5rem' }}>
              <CKEditor
                editor={ClassicEditor}
                data={formik.values.description}
                config={editorConfig}
                onReady={(editor) => {
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  formik.setFieldValue('description', data);
                }}
              />
              <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {formik.values.description.length}/5000
              </Stack>
            </Box>
            <CourseFormImage formik={formik} />
            {showProgress && ( // Hiển thị thanh tiến trình và label phần trăm khi showProgress là true
              <Box sx={{ mb: '0.5rem' }}>
                <LinearProgress variant="determinate" value={progressValue} />
                <Stack
                  sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {progressValue}%
                  </Typography>
                </Stack>
              </Box>
            )}
          </Box>
          <Box>
            <Card sx={{ mx: '1rem', width: '15rem' }}>
              <CardMedia
                component="img"
                sx={{
                  p: '0.2rem',
                  borderRadius: '0.4rem',
                  height: '10rem',
                  objectFit: 'contain',
                }}
                image={formik.values.imageBase64}
                alt={''}
              />
              <CardContent sx={{ p: '0.1rem' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: '0.2rem',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <VisibilityIcon sx={{ width: '1rem', mr: '0.5rem' }} />
                    <Typography variant="body2" color="text.secondary">
                      {fShortenNumber(0)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowUpwardIcon sx={{ color: 'green' }} />
                    <Typography variant="body2" sx={{ mx: '0.2rem' }}>
                      {0}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ my: '0.5rem' }}>
                  <Typography variant="subtitle2" sx={{ px: '0.5rem' }}>
                    {formik.values.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ px: '0.5rem' }}
                  >
                    {HTMLReactParser(formik.values.description)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={formik.handleSubmit}
          variant="contained"
          startIcon={<UploadIcon />}
          sx={{ color: '#fff' }}
        >
          {t("Edit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogEditCourse;
