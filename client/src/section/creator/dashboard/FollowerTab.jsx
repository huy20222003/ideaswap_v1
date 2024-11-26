//react
import { useState, useEffect } from 'react';
//mui
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from '@mui/material';
//chart
import Chart from 'react-apexcharts';
//utils
import { fShortenNumber } from '../../../utils/formatNumber';
//context
import { useVideo, useFollow, useAuth } from '../../../hooks/context';
//component
import VideoHot from './VideoHot';
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------------

const FollowerTab = () => {
  const {
    videoState: { videos },
    handleGetAllVideo,
  } = useVideo();
  const {t} = useTranslation('dashboardCreator');

  const {
    followState: { follows },
    handleGetAllFollows,
  } = useFollow();
  const {
    authState: { user },
  } = useAuth();

  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  useEffect(() => {
    handleGetAllFollows();
    handleGetAllVideo();
  }, [handleGetAllFollows, handleGetAllVideo]);

  const videosFilterByUserID = videos.filter(
    (video) => video?.userID === user?._id
  );
  const followData = follows.filter((follow) => follow?.userID === user?._id);

  const getFollowDataByDay = () => {
    const followDataByDay = new Array(currentDay).fill(0);
    followData.forEach((follow) => {
      const followDate = new Date(follow.createdAt);
      const followDay = followDate.getDate();
      followDataByDay[followDay - 1]++;
    });
    return followDataByDay;
  };

  const getDaysFromStartOfMonth = () => {
    const daysArray = [];
    for (let i = 1; i <= currentDay; i++) {
      daysArray.push(i);
    }
    return daysArray;
  };

  const [options] = useState({
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: getDaysFromStartOfMonth(),
    },
  });

  const [series] = useState([
    {
      name: 'Follower',
      data: getFollowDataByDay(),
    },
  ]);

  // Giả sử totalViews là biến để lưu tổng số lượt xem
  const totalViews = videosFilterByUserID?.reduce(
    (accumulator, currentValue) => {
      // Kiểm tra nếu currentValue có thuộc tính views
      if (currentValue.view) {
        // Nếu có, thì thêm views của currentValue vào accumulator
        return accumulator + currentValue.view;
      } else {
        // Nếu không, trả về accumulator mà không thay đổi
        return accumulator;
      }
    },
    0
  ); // 0 là giá trị khởi tạo cho accumulator

  return (
    <Box>
      <Grid container>
        <Grid item md={8}>
          <Card sx={{ mx: '0.5rem' }}>
            <CardContent>
              <Chart
                options={options}
                series={series}
                type="line"
                width="100%"
                height="350"
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
                  <Typography variant="body2">{t("Followers")}</Typography>
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

export default FollowerTab;
