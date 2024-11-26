//mui

import { Stack, Box, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
//--------------------------------------------------------

const FooterMedia = () => {
  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', sm: 'column' },
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mx: '4rem' }}>
        <Typography sx={{ fontSize: '0.8rem', color: 'white' }}>
          © 2024 - Ecosystem IdeaSwap, All rights reserved
        </Typography>
      </Box>
      <Stack
        sx={{ mx: '5rem', flexDirection: 'row', gap: '0.5rem', pb: '0.5rem' }}
      >
        <Box
          component="a"
          href="https://www.facebook.com/groups/724644672792538/"
        >
          <FacebookIcon sx={{ color: 'white' }} />
        </Box>
        <LinkedInIcon sx={{ color: 'white' }} />
        <XIcon sx={{ color: 'white' }} />
        <TelegramIcon sx={{ color: 'white' }} />
        <YouTubeIcon sx={{ color: 'white' }} />
      </Stack>
    </Stack>
  );
};

export default FooterMedia;
