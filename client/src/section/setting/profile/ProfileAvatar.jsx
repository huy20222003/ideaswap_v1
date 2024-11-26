import { useState } from 'react';
import { Avatar, Box, Typography, Button, Popover, ImageList, ImageListItem, Tabs, Tab, Pagination, CircularProgress } from '@mui/material';
import { useAuth, useUser } from '../../../hooks/context';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const ProfileAvatar = () => {
  const {
    authState: { user },
    loadUser,
  } = useAuth();
  const { handleUpdateUser } = useUser();
  const { t } = useTranslation('setting');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async function (e) {
      const base64String = e.target.result;
      await updateProfilePicture(base64String);
      handleClose();
    };

    reader.readAsDataURL(file);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 8;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleConvertToBase64 = async () => {
    if (!selectedImage) return;

    const img = new Image();
    img.src = selectedImage;
    img.crossOrigin = 'Anonymous'; // This is necessary for converting images from a different origin
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg');
      updateProfilePicture(dataURL);
      handleClose();
    };
  };

  const updateProfilePicture = async (base64String) => {
    setLoading(true);
    const response = await handleUpdateUser(user?._id, { imageBase64: base64String });
    setLoading(false);
    if (response.success) {
      Swal.fire({
        title: t('Success'),
        text: t('Successfully updated profile picture'),
        icon: 'success',
      });
    } else {
      Swal.fire({
        title: t('Error'),
        text: t('Updating profile picture failed'),
        icon: 'error',
      });
    }
    await loadUser();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const images = [
    '/assets/images/avatars/avatar_1.jpg',
    '/assets/images/avatars/avatar_2.jpg',
    '/assets/images/avatars/avatar_3.jpg',
    '/assets/images/avatars/avatar_4.jpg',
    '/assets/images/avatars/avatar_5.jpg',
    '/assets/images/avatars/avatar_6.jpg',
    '/assets/images/avatars/avatar_7.jpg',
    '/assets/images/avatars/avatar_8.jpg',
    '/assets/images/avatars/avatar_9.jpg',
    '/assets/images/avatars/avatar_10.jpg',
    '/assets/images/avatars/avatar_11.jpg',
    '/assets/images/avatars/avatar_12.jpg',
    '/assets/images/avatars/avatar_13.jpg',
    '/assets/images/avatars/avatar_14.jpg',
    '/assets/images/avatars/avatar_15.jpg',
    '/assets/images/avatars/avatar_16.jpg',
    '/assets/images/avatars/avatar_17.jpg',
    '/assets/images/avatars/avatar_18.jpg',
    '/assets/images/avatars/avatar_19.jpg',
    '/assets/images/avatars/avatar_20.jpg',
    '/assets/images/avatars/avatar_21.jpg',
    '/assets/images/avatars/avatar_22.jpg',
    '/assets/images/avatars/avatar_23.jpg',
    '/assets/images/avatars/avatar_24.jpg',
  ];

  const paginatedImages = images.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ bgcolor: 'primary.lighter', p: '0.4rem', borderRadius: '0.4rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        {loading ? (
          <CircularProgress
            sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        ) : (
          <Avatar alt={user?.firstName} src={user?.avatar} sx={{ width: '6rem', height: '6rem' }} />
        )}
        <Box sx={{ flex: 1, ml: '1rem', py: '0.5rem' }}>
          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            {user?.firstName + ' ' + user?.lastName}
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{ color: '#fff', mt: '1rem', px: '1.5rem' }}
            onClick={handleClick}
          >
            {t('Change')}
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{ width: '100%' }}
          >
            <Box sx={{ p: 2, width: { xs: '100%', sm: '500px' } }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Upload Image" />
                <Tab label="Choose Avatar" />
              </Tabs>
              {tabValue === 0 && (
                <Box sx={{ mt: 2 }}>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ color: '#fff', mt: '1rem', px: '1.5rem' }}
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    {t('Upload Image')}
                  </Button>
                </Box>
              )}
              {tabValue === 1 && (
                <Box sx={{ mt: 2 }}>
                  <Typography>{t("Select an Avatar")}</Typography>
                  <ImageList sx={{ width: '100%', height: 300 }} cols={3} rowHeight={100}>
                    {paginatedImages.map((image) => (
                      <ImageListItem key={image} onClick={() => handleImageClick(image)}>
                        <img
                          src={image}
                          alt={image}
                          style={{
                            cursor: 'pointer',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            outline: selectedImage === image ? '2px solid blue' : 'none',
                          }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                  <Pagination
                    count={Math.ceil(images.length / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    sx={{ mt: 2 }}
                  />
                  <Button
                    onClick={handleConvertToBase64}
                    disabled={!selectedImage}
                    variant="contained"
                    sx={{ mt: 2, color: '#fff' }}
                  >
                    {t('Change')}
                  </Button>
                </Box>
              )}
            </Box>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileAvatar;
