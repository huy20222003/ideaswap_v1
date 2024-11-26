//react
import { forwardRef } from 'react';
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//context
import { useVideo } from '../../../../hooks/context';
//sweetalert2
import Swal from 'sweetalert2';
//proptype
import PropTypes from 'prop-types';
//i18n
import { useTranslation } from 'react-i18next';
//----------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialogDeleteVideo = ({ videoId }) => {
  const {
    openFormDialogDeleteVideo,
    setOpenFormDialogDeletevideo,
    handleDeleteVideo,
    handleGetAllVideo,
  } = useVideo();
  const handleClose = () => {
    setOpenFormDialogDeletevideo(false);
  };
  const {t} = useTranslation('videos');

  const handleDeleteVideoById = async () => {
    try {
      const response = await handleDeleteVideo(videoId);
      if (response.success) {
        handleGetAllVideo();
        setOpenFormDialogDeletevideo(false);
        Swal.fire(t("Success"), t("Delete Successful!"), 'success');
      } else {
        setOpenFormDialogDeletevideo(false);
        Swal.fire(t("Error"), t("Delete failed!"), 'error');
      }
    } catch (error) {
      Swal.fire(t("Error"), t("Server error"), 'error');
    }
  };

  return (
    <Dialog
      open={openFormDialogDeleteVideo}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      sx={{ width: 'auto', maxWidth: 'xl' }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <DialogTitle>{t("Delete Video")}</DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <DialogContent>
        <DialogContentText>
          {t("Are you sure you want to delete this video?")}
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="text" onClick={handleClose}>{t("Cancel")}</Button>
        <Button
          variant="contained"
          sx={{ color: '#fff' }}
          onClick={handleDeleteVideoById}
        >
          {t("Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialogDeleteVideo.propTypes = {
    videoId: PropTypes.string.isRequired, // Validate videoId as a required string
  };

export default FormDialogDeleteVideo;
