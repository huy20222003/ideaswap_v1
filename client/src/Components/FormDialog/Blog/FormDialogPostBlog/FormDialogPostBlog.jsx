///react
import { forwardRef, useState } from 'react';
//mui
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  Stack,
  Divider,
  Typography,
  Avatar,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
//context
import {
  useCommon,
  useAuth,
  useBlog,
  useNotification,
} from '../../../../hooks/context';
//component
import BlogFormImage from './BlogFormImage';
//fomik
import { useFormik } from 'formik';
//yup
import * as yup from 'yup';
//sweetalert
import Swal from 'sweetalert2';
import { fDateTime } from '../../../../utils/formatTime';
//ckeditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import editorConfig from '../../../../config/editorConfig';
//i18n
import { useTranslation } from 'react-i18next';
//------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const FormDialogPostBlog = () => {
  const { openFormDialog, setOpenFormDialog } = useCommon();
  const {
    authState: { user },
  } = useAuth();
  const { handleCreateBlog } = useBlog();
  const { handleGetAllNotifications } = useNotification();
  const { t } = useTranslation('blogs');

  const [progressValue, setProgressValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      content: '',
      imageBase64: '',
      userID: user?._id,
    },
    validationSchema: yup.object({
      content: yup
        .string()
        .required(t('Content is required'))
        .max(5000, t('The maximum number of characters is 5000')),
      userID: yup.string().required('UserID is required'),
    }),
    onSubmit: async (values) => {
      try {
        setShowProgress(true);
        const response = await handleCreateBlog(values, setProgressValue);
        if (response.success) {
          setOpenFormDialog(false);
          Swal.fire({
            title: t('Create Blog successful!'),
            text: t('Your blog is awaiting approval.'),
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'OK',
          });
          handleGetAllNotifications();
        } else {
          Swal.fire({
            title: t('Create Blog failed!'),
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        setOpenFormDialog(false);
        Swal.fire({
          title: t('Server Error'),
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      } finally {
        setShowProgress(false); // Ẩn thanh tiến trình và label phần trăm sau khi quá trình xử lý hoàn tất
      }
    },
  });

  const [showBlogFormImage, setShowBlogFormImage] = useState(false);
  const toggleBlogFormImage = () => {
    setShowBlogFormImage(!showBlogFormImage); // Đảo ngược trạng thái hiển thị của BlogFormImage
  };

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <DialogTitle>{t('Post Blog')}</DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <DialogContent>
        <Box sx={{ mb: '1rem' }}>
          <Stack sx={{ flexDirection: 'row', gap: '0.5rem' }}>
            <Avatar alt="Remy Sharp" src={user?.avatar} />
            <Stack>
              <Typography variant="subtitle2">
                {user?.firstName + user?.lastName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                {fDateTime(Date.now())}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ mb: '1.5rem' }}>
          <CKEditor
            editor={ClassicEditor}
            data={formik.values.content}
            config={editorConfig}
            onReady={(editor) => {
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              formik.setFieldValue('content', data);
            }}
          />
          {formik.touched.content && formik.errors.content && (
            <span style={{ color: 'red' }}>{formik.errors.content}</span>
          )}

          <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            {formik.values.content?.length}/5000
          </Stack>
        </Box>
        <Stack
          sx={{
            gap: '1rem',
            my: '1rem',
            width: '100%',
            p: '0.5rem',
            justifyContent: 'center',
            alignItems: 'flex-start',
            border: '0.1rem #ccc solid',
            borderRadius: '0.4rem',
          }}
        >
          <CollectionsOutlinedIcon
            sx={{ cursor: 'pointer', color: '#54D62C' }}
            onClick={toggleBlogFormImage}
          />
        </Stack>
        {showBlogFormImage && <BlogFormImage formik={formik} />}{' '}
        {/* Hiển thị BlogFormImage nếu showBlogFormImage là true */}
        {showProgress && ( // Hiển thị thanh tiến trình và label phần trăm khi showProgress là true
          <Box sx={{ my: '0.5rem' }}>
            <LinearProgress variant="determinate" value={progressValue} />
            <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Typography variant="body2" color="text.secondary">
                {progressValue}%
              </Typography>
            </Stack>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{ px: '1rem', mx: '0.5rem' }}
          onClick={handleClose}
        >
          {t('Cancel')}
        </Button>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          sx={{ color: 'white', px: '1rem', mx: '0.5rem' }}
          onClick={formik.handleSubmit}
        >
          {t('Post')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogPostBlog;
