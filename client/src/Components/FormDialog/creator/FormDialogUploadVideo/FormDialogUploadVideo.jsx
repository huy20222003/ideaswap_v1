import { forwardRef, useEffect, useState } from 'react';
//mui
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
//context
import {
  useCommon,
  useAuth,
  useCourse,
  useVideo,
  useNotification,
} from '../../../../hooks/context';
//component
import VideoFormImage from './VideoFormImage';
//ultils
import { fShortenNumber } from '../../../../utils/formatNumber';
//formik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//sweetalert
import Swal from 'sweetalert2';
//ckeditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import editorConfig from '../../../../config/editorConfig';
import HTMLReactParser from 'html-react-parser';
//i18n
import { useTranslation } from 'react-i18next';
//------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialogUploadVideo = () => {
  const { openFormDialog, setOpenFormDialog } = useCommon();
  const {
    authState: { user },
  } = useAuth();
  const {t} = useTranslation('videos');

  const {
    courseState: { courses },
    handleGetAllCourses,
  } = useCourse();

  const {handleGetAllNotifications} = useNotification();

  const { handleCreateVideo, handleGetAllVideo } = useVideo();
  const [progressValue, setProgressValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    handleGetAllCourses();
  }, [handleGetAllCourses]);

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  const coursesFilter = courses.filter((course) => course.userID === user?._id);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      imageBase64: '',
      videoUrl: '',
      userID: user?._id,
      courseID: '',
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
      videoUrl: yup
        .string()
        .url(t("Invalid video URL"))
        .required(t("Video URL is required")),
      userID: yup.string().required('User ID is required'),
      courseID: yup.string().required('Course ID is required'),
    }),
    onSubmit: async (values) => {
      try {
        setShowProgress(true);
        const response = await handleCreateVideo(values, setProgressValue);
        if (response.success) {
          setOpenFormDialog(false);
          handleGetAllVideo();
          Swal.fire({
            title: t("Upload Video successful!"),
            text: t("Your video is awaiting approval"),
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'OK',
          });
          handleGetAllNotifications();
        } else {
          Swal.fire({
            title: t("Upload Video failed!"),
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        setOpenFormDialog(false);
        Swal.fire({
          title: t("Server Error"),
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      } finally {
        formik.setFieldValue('title', '');
        formik.setFieldValue('description', '');
        formik.setFieldValue('imageBase64', '');
        formik.setFieldValue('imageUrl', '');
        formik.setFieldValue('videoUrl', '');
        setShowProgress(false); // Ẩn thanh tiến trình và label phần trăm sau khi quá trình xử lý hoàn tất
      }
    },
  });

  const handleChange = (event) => {
    formik.setFieldValue('courseID', event.target.value);
  };

  return (
    <Dialog
      open={openFormDialog}
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
        <DialogTitle>{t("Upload Video")}</DialogTitle>
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
            <Box sx={{ mb: '1.5rem' }}>
              <TextField
                variant="outlined"
                label={t("VideoUrl")}
                id="videoUrl"
                name="videoUrl"
                fullWidth
                multiline
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.videoUrl}
                error={
                  formik.touched.videoUrl && Boolean(formik.errors.videoUrl)
                }
                helperText={formik.touched.videoUrl && formik.errors.videoUrl}
              />
            </Box>
            <VideoFormImage formik={formik} />
            <Box sx={{ mt: '1.5rem' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("Course")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.courseID}
                  label={t("Course")}
                  onChange={handleChange}
                >
                  {coursesFilter.map((course) => (
                    <MenuItem key={course?._id} value={course?._id}>
                      {course?.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {showProgress && ( // Hiển thị thanh tiến trình và label phần trăm khi showProgress là true
              <Box sx={{ my: '0.5rem' }}>
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
                <Box sx={{ mt: '0.5rem' }}>
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
          {t("Upload")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogUploadVideo;
