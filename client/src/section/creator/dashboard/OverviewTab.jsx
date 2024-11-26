import { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from '@mui/material';
import Chart from 'react-apexcharts';
import { fShortenNumber } from '../../../utils/formatNumber';
import {
  useVideo,
  useFollow,
  useAuth,
  useBlog,
  useDocument,
} from '../../../hooks/context';
import VideoHot from './VideoHot';
//i18n
import { useTranslation } from 'react-i18next';
//---------------------------------------------------

const OverviewTab = () => {
  const {
    videoState: { videos },
    handleGetAllVideo,
  } = useVideo();
  const {
    followState: { follows },
    handleGetAllFollows,
  } = useFollow();
  const {
    authState: { user },
  } = useAuth();
  const {t} = useTranslation('dashboardCreator');

  const {
    blogState: { blogs },
    handleGetAllBlog,
  } = useBlog();
  const {
    documentState: { documents },
    handleGetAllDocuments,
  } = useDocument();

  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  const getDaysFromStartOfMonth = useCallback(() => {
    const daysArray = [];
    for (let i = 1; i <= currentDay; i++) {
      daysArray.push(i);
    }
    return daysArray;
  }, [currentDay]);

  const followData = follows.filter((follow) => follow?.userID === user?._id);

  const [series, setSeries] = useState([
    {
      name: t("Blogs"),
      data: [],
    },
    {
      name: t("Documents"),
      data: [],
    },
    {
      name: t("Videos"),
      data: [],
    },
  ]);

  useEffect(() => {
    handleGetAllFollows();
    handleGetAllVideo();
    handleGetAllBlog();
    handleGetAllDocuments();
  }, [
    handleGetAllBlog,
    handleGetAllDocuments,
    handleGetAllFollows,
    handleGetAllVideo,
  ]);

  const videosFilterByUserID = videos.filter(
    (video) => video?.userID === user?._id
  );

  const blogsFilterByUserID = blogs.filter(
    (blog) => blog?.userID === user?._id
  );

  const documentsFilterByUserID = documents.filter(
    (document) => document?.userID === user?._id
  );

  const countItemsByDay = useCallback((items) => {
    const daysArray = getDaysFromStartOfMonth();
    return daysArray.map((day) => {
      return items.filter((item) => {
        const itemDate = new Date(item.createdAt).getDate();
        return itemDate === day;
      }).length;
    });
  }, [getDaysFromStartOfMonth]);

  useEffect(() => {
    const blogsCount = countItemsByDay(blogsFilterByUserID);
    const documentsCount = countItemsByDay(documentsFilterByUserID);
    const videosCount = countItemsByDay(videosFilterByUserID);
  
    setSeries([
      {
        name: t("Blogs"),
        data: blogsCount,
      },
      {
        name: t("Documents"),
        data: documentsCount,
      },
      {
        name: t("Videos"),
        data: videosCount,
      },
    ]);
  }, [blogsFilterByUserID, documentsFilterByUserID, videosFilterByUserID, countItemsByDay, t]);  

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: getDaysFromStartOfMonth(),
    },
  };

  const totalViews = videosFilterByUserID?.reduce(
    (accumulator, currentValue) => {
      if (currentValue.view) {
        return accumulator + currentValue.view;
      } else {
        return accumulator;
      }
    },
    0
  );

  return (
    <Box>
      <Grid container>
        <Grid item md={8}>
          <Card sx={{ m: '1rem' }}>
            <CardContent>
              <Chart
                options={options}
                series={series}
                type="bar"
                width="100%"
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card sx={{ mx: '0.5rem' }}>
            <CardContent>
              <Box>
                <Typography variant="subtitle1">{t("Real Time")}</Typography>
                <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: '1rem',
                      height: '1rem',
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      my: '0.5rem',
                      mr: '0.5rem',
                    }}
                  ></Box>
                  <Typography variant="body2">{t("Real Time")}</Typography>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: '0.5rem' }}>
                <Stack gap="0.5rem">
                  <Typography variant="subtitle1">
                    {fShortenNumber(followData?.length)}
                  </Typography>
                  <Typography variant="body2">
                    {followData.length > 1 ? 'Followers' : 'Follower'}
                  </Typography>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: '0.5rem' }}>
                <Stack gap="0.5rem">
                  <Typography variant="subtitle1">
                    {fShortenNumber(totalViews)}
                  </Typography>
                  <Typography variant="body2">{t("Views")}</Typography>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: '0.5rem' }}>
                <Box sx={{ mt: '-5rem' }}>
                  <VideoHot />
                </Box>
              </Box>
              <Divider />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewTab;
