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
import { useCourse } from '../../../../hooks/context';
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

const FormDialogDeleteCourse = ({ courseId }) => {
  const {
    openFormDialogDeleteCourse,
    setOpenFormDialogDeleteCourse,
    handleDeleteCourse,
    handleGetAllCourses,
  } = useCourse();
  const handleClose = () => {
    setOpenFormDialogDeleteCourse(false);
  };

  const {t} = useTranslation('courses');

  const handleDeleteVideoById = async () => {
    try {
      const response = await handleDeleteCourse(courseId);
      if (response.success) {
        handleGetAllCourses();
        setOpenFormDialogDeleteCourse(false);
        Swal.fire(t("Success"), t("Delete Successful!"), 'success');
      } else {
        setOpenFormDialogDeleteCourse(false);
        Swal.fire(t("Error"), t("Delete failed!"), 'error');
      }
    } catch (error) {
      Swal.fire(t("Error"), t("Server error!"), 'error');
    }
  };

  return (
    <Dialog
      open={openFormDialogDeleteCourse}
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
        <DialogTitle>{t("Delete Course")}</DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <DialogContent>
        <DialogContentText>
          {t("Are you sure you want to delete this course?")}
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
    courseId: PropTypes.string.isRequired, 
  };

export default FormDialogDeleteCourse;
