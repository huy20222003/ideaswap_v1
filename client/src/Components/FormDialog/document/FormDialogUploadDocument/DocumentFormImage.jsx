import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types'; // Import PropTypes
//i18n
import { useTranslation } from 'react-i18next';
//------------------------------------------------------

import DocumentFormImageItem from './DocumentFormImageItem';

const DocumentFormImage = ({ formik }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const {t} = useTranslation('documents');

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = () => {
      formik.setFieldValue('imageBase64', reader.result);
      setImageUrl(URL.createObjectURL(file));
      setImageSelected(true);
    };
    reader.onerror = () => {
      console.error('Error occurred while reading the file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setImageUrl('');
    formik.setFieldValue('imageBase64', '');
    setImageSelected(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
  });

  return (
    <>
      <Stack>
        <Box sx={{ position: 'relative' }}>
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <Stack
              sx={{
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component={'img'}
                sx={{ width: '50%', height: '50%', maxHeight: '2rem' }}
                src="/assets/images/chooseFile.svg"
              ></Box>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{t("Drop or Select file")}</Typography>
                <Typography variant="body2">
                  {t("Drop files here or click browse through your machine")}
                </Typography>
              </Stack>
            </Stack>
          </div>
          {imageSelected && imageUrl && (
            <Box
              sx={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                flex: 1,
              }}
            >
              <DocumentFormImageItem
                imageUrl={imageUrl}
                handleDeleteImage={handleDeleteImage}
              />
            </Box>
          )}
          {!imageSelected && ( // Hiển thị thông báo dưới phần chọn ảnh
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1, color: 'red' }}>
              {t("Please select an image")}
            </Typography>
          )}
        </Box>
      </Stack>
    </>
  );
};

// PropTypes validation
DocumentFormImage.propTypes = {
  formik: PropTypes.object.isRequired, // Đảm bảo formik là một object và bắt buộc phải có
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '8px',
  outline: 'none',
  padding: '5px',
  cursor: 'pointer',
  backgroundColor: 'rgba(145, 158, 171, 0.08)',
  transition:
    'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
};

export default DocumentFormImage;
