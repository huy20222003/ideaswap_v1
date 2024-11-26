//mui
import { Box, Divider, Grid } from '@mui/material';
//component
import FooterInfo from './FooterInfo';
import FooterAbout from './FooterAbout';
import FooterEco from './FooterEco';
import FooterMedia from './FooterMedia';
//-------------------------------------------

const Footer = () => {
  return (
    <Box
      sx={{
        mt: '4rem',
        backgroundColor: 'primary.main',
      }}
    >
      <Divider />
      <Grid container>
        <Grid item xs={12} md={3} xl={3} lg={3} sm={12}></Grid>
        <Grid item xs={12} md={3} xl={3} lg={3} sm={12}>
          <FooterInfo />
        </Grid>
        <Grid item xs={12} md={3} xl={3} lg={3} sm={12}>
          <FooterAbout />
        </Grid>
        <Grid item xs={12} md={3} xl={3} lg={3} sm={12}>
          <FooterEco />
        </Grid>
      </Grid>
      <Divider sx={{ my: '1rem' }} />
      <Box sx={{ my: '1rem' }}>
        <FooterMedia />
      </Box>
    </Box>
  );
};

export default Footer;
