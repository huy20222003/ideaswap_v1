import { useState, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Define your locales
const locales = {
  en: { label: 'English', icon: '/assets/icons/langs/ic_flag_en.svg' },
  vi: { label: 'Tiếng Việt', icon: '/assets/icons/langs/ic_flag_vi.svg' },
};

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/langs/ic_flag_en.svg',
  },
  {
    value: 'vi',
    label: 'Tiếng Việt',
    icon: '/assets/icons/langs/ic_flag_vi.svg',
  },
];

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);
  const { i18n } = useTranslation();

  // Retrieve the language from localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
    if (storedLanguage && locales[storedLanguage]) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]); // The empty array ensures this runs only on mount

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng); // Save the selected language to localStorage
    handleClose();
  };

  const currentLanguage = locales[i18n.language] || locales.en;

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <img src={currentLanguage.icon} alt={currentLanguage.label} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === i18n.language}
              onClick={() => handleChangeLanguage(option.value)}
            >
              <Box
                component="img"
                alt={option.label}
                src={option.icon}
                sx={{ width: 28, mr: 2 }}
              />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
