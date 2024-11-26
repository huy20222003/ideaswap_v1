// components/EmojiPicker.js
import { Popover } from '@mui/material';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import PropTypes from 'prop-types';

const EmojiPicker = ({ open, anchorEl, onClose, onEmojiSelect }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{
        zIndex: 1500,
        marginTop: '-4rem',
      }}
    >
      <Picker data={data} onEmojiSelect={onEmojiSelect} />
    </Popover>
  );
};

EmojiPicker.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onEmojiSelect: PropTypes.func.isRequired,
};

export default EmojiPicker;
