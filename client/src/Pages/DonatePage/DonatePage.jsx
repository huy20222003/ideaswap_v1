//mui
import { Card, Container, Box, Divider } from '@mui/material';
//component
import { DonateInfo, DonateAbout } from '../../section/donate';
//-----------------------------------------------------------------

const DonatePage = () => {
  document.title = 'Donate';
  return (
    <Container maxWidth="md">
      <Card sx={{ mt: '5rem', p: '1rem' }}>
        <Box>
          <DonateInfo />
        </Box>
        <Divider />
        <Box>
          <DonateAbout />
        </Box>
      </Card>
    </Container>
  );
};

export default DonatePage;
