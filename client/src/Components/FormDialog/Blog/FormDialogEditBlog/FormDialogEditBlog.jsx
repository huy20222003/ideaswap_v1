import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { fDateTime } from '../../../../utils/formatTime';
import BlogFormImage from './BlogFormImage';
import { useAuth, useBlog } from '../../../../hooks/context';
//ckeditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import editorConfig from '../../../../config/editorConfig';
//i18n
import { useTranslation } from 'react-i18next';
//----------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const FormDialogEditBlog = () => {
  const {
    authState: { user },
  } = useAuth();
  const {
    blogState: { blog },
    handleUpdateBlog,
    handleGetAllBlog,
    openFormDialogEditBlog,
    setOpenFormDialogEditBlog,
  } = useBlog();
  const [progressValue, setProgressValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const { t } = useTranslation('blogs');

  const [showBlogFormImage, setShowBlogFormImage] = useState(false);

  useEffect(() => {
    // Cập nhật showBlogFormImage dựa trên blog.url khi blog thay đổi
    setShowBlogFormImage(!!blog?.url); // Sử dụng !! để chuyển đổi thành giá trị boolean
  }, [blog]); // Theo dõi thay đổi của biến blog để cập nhật lại showBlogFormImage

  useEffect(() => {
    handleGetAllBlog();
  }, [handleGetAllBlog, openFormDialogEditBlog]);

  const handleClose = () => {
    setOpenFormDialogEditBlog(false);
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
      imageBase64: yup.string().required('Image base64 is required'),
    }),
    onSubmit: async (values) => {
      try {
        setShowProgress(true);
        const response = await handleUpdateBlog(
          blog?._id,
          values,
          setProgressValue
        );
        if (response.success) {
          setOpenFormDialogEditBlog(false);
          Swal.fire({
            title: t('Update Blog successful!'),
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        setOpenFormDialogEditBlog(false);
        Swal.fire({
          title: t('Update Blog failed!'),
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      } finally {
        setShowProgress(false); // Ẩn thanh tiến trình và label phần trăm sau khi quá trình xử lý hoàn tất
      }
    },
  });

  useEffect(() => {
    if (blog) {
      formik.setValues({
        content: blog.content || '',
        imageBase64: blog.url || '',
        userID: user?._id,
      });
    }
  }, [blog, user?._id]);

  return (
    <Dialog
      open={openFormDialogEditBlog}
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
        <DialogTitle>{t('Edit Blog')}</DialogTitle>
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
          <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            {formik.values.description?.length}/5000
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
            onClick={() => setShowBlogFormImage(!showBlogFormImage)}
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

FormDialogEditBlog.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default FormDialogEditBlog;
