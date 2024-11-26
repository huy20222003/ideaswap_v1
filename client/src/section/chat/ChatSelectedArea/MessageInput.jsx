// components/MessageInput.js
import { Box, TextField, IconButton, InputAdornment, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import PropTypes from 'prop-types';

const MessageInput = ({
  formik,
  handleToggleEmojiPicker,
  handleImageChange,
  selectedImage,
  imageBase64,
  setSelectedImage,
  setImageBase64,
  setMessageType,
  loading
}) => {
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        px: '1rem',
        py: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid #ccc',
        bgcolor: 'white',
        position: 'sticky',
        bottom: 0,
        zIndex: 1,
      }}
    >
      <IconButton component="label">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
        <ImageIcon color="primary" />
      </IconButton>
      {selectedImage && (
        <Box
          sx={{
            position: 'relative',
            mx: '1rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={imageBase64}
            alt="Selected"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedImage(null);
              setImageBase64(null);
              setMessageType('text');
            }}
            sx={{ position: 'absolute', top: 0, right: 0 }}
          >
            X
          </Button>
        </Box>
      )}
      <TextField
        id="message"
        name="message"
        variant="outlined"
        placeholder="Type a message"
        fullWidth
        sx={{ mx: '1rem' }}
        value={formik.values.message}
        onChange={formik.handleChange}
        error={formik.touched.message && Boolean(formik.errors.message)}
        helperText={formik.touched.message && formik.errors.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleToggleEmojiPicker}>
                <EmojiEmotionsIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <IconButton type="submit" disabled={loading}>
        <SendIcon color="primary" />
      </IconButton>
    </Box>
  );
};

MessageInput.propTypes = {
  formik: PropTypes.shape({
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    values: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }).isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
  }).isRequired,
  handleToggleEmojiPicker: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  selectedImage: PropTypes.object,
  imageBase64: PropTypes.string,
  setSelectedImage: PropTypes.func.isRequired,
  setImageBase64: PropTypes.func.isRequired,
  setMessageType: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MessageInput;
