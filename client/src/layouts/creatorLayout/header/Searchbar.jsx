//mui
import { Box, Stack, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------------------------------

const Searchbar = () => {
  const {t} = useTranslation('navbar');
  return (
    <Box>
      <Stack
        sx={{ flexDirection: 'row', alignItems: 'center', height: '4rem' }}
      >
        <Box>
          <TextField
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              placeholder: t('Search on IdeaSwap'),
            }}
            sx={{ bgcolor: 'white', borderRadius: '0.5rem', width: '35rem' }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Searchbar;
