//react
import { useState, useEffect } from 'react';
//mui
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
//i18n
import { useTranslation } from 'react-i18next';
//------------------------------------------------------

const Language = () => {
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
  const {t, i18n} = useTranslation(['setting']);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]); // The empty array ensures this runs only on mount

  const handleChange = (event) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
    localStorage.setItem('i18nextLng', event.target.value);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: 'primary.lighter',
        p: '1rem',
        borderRadius: '0.4rem',
      }}
    >
      <Typography variant="h6" sx={{color: 'primary.main'}}>{t("Language")}</Typography>
      <FormControl sx={{ minWidth: '10rem' }}>
        <InputLabel id="demo-simple-select-label">{t("Language")}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Language"
          size="small"
          onChange={handleChange}
        >
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'vn'}>Tiếng Việt</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Language;
