//mui
import { Box, Stack, ButtonBase } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//proptype
import PropTypes from 'prop-types';
//-------------------------------------

const BlogFormImageItem = ({ imageUrl, handleDeleteImage }) => {
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: '4px',
        width: '80px',
        height: '80px',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(145, 158, 171, 0.16)',
      }}
    >
      <Stack
        component={'span'}
        sx={{
          flexShrink: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component={'img'}
          src={imageUrl}
          sx={{
            width: '100%',
            height: '100%',
            flexShrink: 0,
            objectFit: 'cover',
            position: 'absolute',
          }}
        ></Box>
      </Stack>
      <ButtonBase
        sx={{
          position: 'absolute',
          top: '0.25rem',
          right: '0.25rem',
          p: '0.25rem',
          color: 'rgb(255, 255, 255)',
          backgroundColor: 'rgba(22, 28, 36, 0.48)',
          fontSize: '1.125rem',
          borderRadius: '50%',
        }}
      >
        <CloseIcon sx={{ width: '1rem', height: '1rem' }} onClick={handleDeleteImage} />
      </ButtonBase>
    </Stack>
  );
};

BlogFormImageItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  handleDeleteImage: PropTypes.func.isRequired,
};

export default BlogFormImageItem;
