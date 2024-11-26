import { useState, useEffect, useCallback, startTransition } from 'react';
import {
  Avatar,
  Box,
  Stack,
  TextField,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
//icon
import MicIcon from '@mui/icons-material/Mic';
import { useDocument, useAuth } from '../../../hooks/context';
//i18n
import { useTranslation } from 'react-i18next';
//----------------------------------------------------------

const SearchDocument = () => {
  const { handleSearchDocuments } = useDocument();
  const [searchTerm, setSearchTerm] = useState('');
  const {
    authState: { user },
  } = useAuth();
  const { t } = useTranslation('documents');

  const handleSearch = useCallback(async () => {
    try {
      await handleSearchDocuments(searchTerm);
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm, handleSearchDocuments]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300); // Thường thì chúng ta để debounce time khoảng 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [handleSearch]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const startSpeechRecognition = () => {
    var recognition = new webkitSpeechRecognition() || new SpeechRecognition();

    recognition.onresult = function (event) {
      var result = event.results[0][0].transcript;
      startTransition(() => setSearchTerm(result));
    };

    recognition.start();
  };

  return (
    <Card sx={{ m: '5rem 0 1rem 0', bgcolor: 'primary.main' }}>
      <CardContent>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Box>
            <Avatar alt="Avatar" src={user?.avatar} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              sx={{
                bgcolor: 'white',
                borderRadius: '0.5rem',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <MicIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={startSpeechRecognition}
                    />
                  </InputAdornment>
                ),
                placeholder: t('Search for documents'),
              }}
              value={searchTerm}
              onChange={handleChange}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SearchDocument;
