//mui
import { Grid, Container } from '@mui/material';
//component
import VideoInfo from '../../section/video/VideoInfo';
import VideoList from '../../section/video/VideoList';
import Scrollbar from '../../Components/scrollbar';
//--------------------------------------------------------------

const VideoPage = () => {
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12} sm={12} md={8} xl={8}>
          <Scrollbar>
            <VideoInfo />
          </Scrollbar>
        </Grid>
        <Grid item xs={12} sm={12} md={4} xl={4}>
          <Scrollbar>
            <VideoList />
          </Scrollbar>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VideoPage;
