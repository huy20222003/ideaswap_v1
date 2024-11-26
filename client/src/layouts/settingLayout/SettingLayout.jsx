//mui
import { Container, Box, Grid, List, Card } from '@mui/material';
//react-router-dom
import { Outlet } from 'react-router-dom';
//component
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import ListItemSetting from '../../Components/ListItemSetting';
//----------------------------------------------------

const SettingLayout = () => {
  return (
    <>
      <Box>
        <Header />
      </Box>
      <Container maxWidth="md">
        <Card sx={{mt: '5rem'}}>
          <Grid container>
            <Grid item xs={12} sm={12} md={3} xl={3}>
              <Box>
                <List component="nav">
                  <ListItemSetting />
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={9} xl={9}>
              <Outlet />
            </Grid>
          </Grid>
        </Card>
      </Container>
      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default SettingLayout;
