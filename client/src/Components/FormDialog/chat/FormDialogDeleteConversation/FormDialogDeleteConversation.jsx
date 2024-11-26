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
import { useConversation, useAuth } from '../../../../hooks/context';
//sweetalert2
import Swal from 'sweetalert2';
//i18n
import { useTranslation } from 'react-i18next';
//----------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialogDeleteCourse = () => {
  const {
    conversationState: {conversation},
    openFormDeleteConversation,
    setOpenFormDeleteConversation,
    handleDeleteConversation,
    handleGetConversationsByUserId,
  } = useConversation();

  const {authState: {user}} = useAuth();
  
  const handleClose = () => {
    setOpenFormDeleteConversation(false);
  };
  const {t} = useTranslation('chat');

  const handleDeleteConversationById = async () => {
    try {
      const response = await handleDeleteConversation(conversation?._id);
      if (response.success) {
        await handleGetConversationsByUserId(user?._id);
        setOpenFormDeleteConversation(false);
        Swal.fire(t("Success"), t("Delete Successful!"), 'success');
      } else {
        setOpenFormDeleteConversation(false);
        Swal.fire(t("Error"), t("Delete failed!"), 'error');
      }
    } catch (error) {
      Swal.fire(t("Error"), t("Server Error"), 'error');
    }
  };

  return (
    <Dialog
      open={openFormDeleteConversation}
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
        <DialogTitle>{t('Delete Conversation')}</DialogTitle>
        <CloseIcon
          onClick={handleClose}
          sx={{ cursor: 'pointer', mr: '1rem' }}
        />
      </Stack>
      <Divider />
      <DialogContent>
        <DialogContentText>
          {t("Are you sure you want to delete this conversation?")}
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="text">{t("Cancel")}</Button>
        <Button
          variant="contained"
          sx={{ color: '#fff' }}
          onClick={handleDeleteConversationById}
        >
          {t("Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default FormDialogDeleteCourse;
