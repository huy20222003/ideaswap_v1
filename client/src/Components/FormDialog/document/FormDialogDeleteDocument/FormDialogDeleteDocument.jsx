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
import { useDocument } from '../../../../hooks/context';
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

const FormDialogDeleteCourse = ({ documentId }) => {
  const {
    openFormDialogDeleteDocument,
    setOpenFormDialogDeleteDocument,
    handleDeleteDocument,
    handleGetAllDocuments,
  } = useDocument();
  const handleClose = () => {
    setOpenFormDialogDeleteDocument(false);
  };
  const {t} = useTranslation('documents');

  const handleDeleteVideoById = async () => {
    try {
      const response = await handleDeleteDocument(documentId);
      if (response.success) {
        handleGetAllDocuments();
        setOpenFormDialogDeleteDocument(false);
        Swal.fire(t("Success"), t("Delete Successful!"), 'success');
      } else {
        setOpenFormDialogDeleteDocument(false);
        Swal.fire(t("Error"), t("Delete failed!"), 'error');
      }
    } catch (error) {
      Swal.fire(t("Error"), t("Server error!"), 'error');
    }
  };

  return (
    <Dialog
      open={openFormDialogDeleteDocument}
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
        <DialogTitle>{t("Delete Document")}</DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <DialogContent>
        <DialogContentText>
          {t("Are you sure you want to delete this document?")}
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

FormDialogDeleteCourse.propTypes = {
    documentId: PropTypes.string.isRequired, 
  };

export default FormDialogDeleteCourse;
