import { forwardRef, useRef, useState, useEffect } from 'react';
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
  TextField,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import axios from 'axios'; // Import Axios
import Swal from 'sweetalert2';
import { useDocument, useAuth } from '../../../../hooks/context';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DocumentFormImage from './DocumentFormImage';
import Cookies from 'js-cookie';
//ckeditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import editorConfig from '../../../../config/editorConfig';
//i18n
import { useTranslation } from 'react-i18next';
//-----------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialogEditDocument = () => {
  const {
    documentState: { document },
    openFormDialogEditDocument,
    setOpenFormDialogEditDocument,
    handleGetAllDocuments,
  } = useDocument();
  const {
    authState: { user },
  } = useAuth();

  const handleClose = () => {
    setOpenFormDialogEditDocument(false);
  };
  const {t} = useTranslation('documents');

  const fileInput = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [progressValue, setProgressValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      file: null,
      userID: user?._id,
      imageBase64: '',
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
      file: yup.mixed().required(t("File is required")),
      userID: yup.string().required('User ID is required'),
    }),
    onSubmit: async (values) => {
      try {
        setShowProgress(true);
        const formData = new FormData();
        formData.append('file', values.file);
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('userID', values.userID);
        formData.append('imageBase64', values?.imageBase64);

        // Sử dụng Axios để gửi dữ liệu form data
        const response = await axios.put(
          `https://ideaswap-server.onrender.com/api/v1/document/update/${document?._id}`,
          // `http://localhost:3000/api/v1/document/update/${document?._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${Cookies.get('user')}`, // Sử dụng token từ cookie
            },
            onUploadProgress: (progressEvent) => {
              // Tính toán và cập nhật giá trị tiến trình
              const { loaded, total } = progressEvent;
              const progress = Math.round((loaded * 100) / total);
              setProgressValue(progress);
            },
          }
        );

        if (response.data.success) {
          setOpenFormDialogEditDocument(false);
          Swal.fire({
            title: t("Update document successful!"),
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'OK',
          });
          handleGetAllDocuments();
        } else {
          Swal.fire({
            title: t("Update document failed!"),
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        setOpenFormDialogEditDocument(false);
        Swal.fire({
          title: t("Server Error"),
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
      } finally {
        formik.setFieldValue('file', null);
        setShowProgress(false); // Ẩn thanh tiến trình và label phần trăm sau khi quá trình xử lý hoàn tất
      }
    },
  });

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/x-rar-compressed'
      ];

      const validExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'rar'];

      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

      if (validTypes.includes(selectedFile.type) || validExtensions.includes(fileExtension)) {
        setFileError('');
        formik.setFieldValue('file', selectedFile);
        setSelectedFileName(selectedFile.name);
      } else {
        setFileError(t("Invalid file type. Only PDF, Word, Excel, RAR files are allowed."));
      }
    }
  };

  useEffect(() => {
    if (document) {
      formik.setValues({
        title: document.title || '',
        description: document.description || '',
        imageBase64: document.imageUrl || '',
        userID: document.userID || '',
      });
    }
  }, [document]);

  return (
    <Dialog
      open={openFormDialogEditDocument}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
    >
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        method="POST"
      >
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <DialogTitle>{t("Edit Document")}</DialogTitle>
          <CloseIcon
            onClick={handleClose}
            sx={{ cursor: 'pointer', mr: '1rem' }}
          />
        </Stack>
        <Divider />
        <DialogContent>
          <Box sx={{ mb: '1rem' }}>
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
          <Box sx={{ mb: '1rem' }}>
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
          <input
            type="file"
            name="file"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            ref={fileInput}
          />
          <Button
            type="button"
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={() => fileInput.current.click()}
          >
            {t("Select File")}
          </Button>
          {selectedFileName && (
            <Typography variant="body1" sx={{ mb: '1rem' }}>
              {t("Selected File:")} {selectedFileName}
            </Typography>
          )}
          {fileError && (
            <Typography variant="body1" sx={{ color: 'red', mb: '1rem' }}>
              {fileError}
            </Typography>
          )}
          <DocumentFormImage formik={formik} />
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
            type="button"
            variant="outlined"
            sx={{ px: '1rem', mx: '0.5rem' }}
            onClick={handleClose}
          >
            {t("Cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<UploadIcon />}
            sx={{ color: 'white', px: '1rem', mx: '0.5rem' }}
          >
            {t("Edit")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialogEditDocument;
