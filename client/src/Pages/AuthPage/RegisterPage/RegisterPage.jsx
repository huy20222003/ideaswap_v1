import { Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import { keyframes } from '@emotion/react';
import { RegisterForm, RegisterBanner } from '../../../section/auth/register';

//---------------------------------------------

// Define animations
const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const RegisterPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Grid container sx={{ my: '1rem' }} spacing={isSmallScreen ? 0 : 5}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ animation: `${slideInFromLeft} 0.5s linear forwards` }}
        >
          <RegisterForm />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ animation: `${slideInFromRight} 0.5s linear forwards` }}
        >
          <RegisterBanner />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
