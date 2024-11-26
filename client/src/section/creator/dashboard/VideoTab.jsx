import { useCallback, useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Stack,
} from '@mui/material';
import Chart from 'react-apexcharts';
import VideoHot from './VideoHot';
import {
  useHeart,
  useComment,
  useShare,
  useVideo,
  useAuth,
} from '../../../hooks/context';
import { fShortenNumber } from '../../../utils/formatNumber';
//i18n
import { useTranslation } from 'react-i18next';
//-------------------------------------------------------------------------

const VideoTab = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const {t} = useTranslation('dashboardCreator');

  const {
    heartState: { hearts },
    handleGetAllHearts,
  } = useHeart();
  const {
    commentState: { comments },
    handleGetAllComments,
  } = useComment();
  const {
    shareState: { shares },
    handleGetAllShares,
  } = useShare();
  const { videoState, handleGetAllVideo } = useVideo();
  const {
    authState: { user },
  } = useAuth();

  const videos = videoState?.videos || []; // Default to an empty array if videoState is undefined

  useEffect(() => {
    handleGetAllHearts();
    handleGetAllComments();
    handleGetAllShares();
    handleGetAllVideo();
  }, [
    handleGetAllComments,
    handleGetAllHearts,
    handleGetAllShares,
    handleGetAllVideo,
  ]);

  useEffect(() => {
    const newDailyData = {
      hearts: Array(currentDay).fill(0),
      comments: Array(currentDay).fill(0),
      shares: Array(currentDay).fill(0),
    };

    hearts.forEach((heart) => {
      const day = new Date(heart.date).getDate();
      if (day <= currentDay) newDailyData.hearts[day - 1] += 1;
    });

    comments.forEach((comment) => {
      const day = new Date(comment.date).getDate();
      if (day <= currentDay) newDailyData.comments[day - 1] += 1;
    });

    shares.forEach((share) => {
      const day = new Date(share.date).getDate();
      if (day <= currentDay) newDailyData.shares[day - 1] += 1;
    });
  }, [hearts, comments, shares, currentDay]);

  const getDaysFromStartOfMonth = useCallback(() => {
    const daysArray = [];
    for (let i = 1; i <= currentDay; i++) {
      daysArray.push(i);
    }
    return daysArray;
  }, [currentDay]);

  const videoFilterByUserID = videos.filter(
    (video) => video?.userID === user?._id
  );

  // Tính tổng số hearts, shares, comments cho mỗi ngày từ video của user
  const totalDataByDay = Array(currentDay)
    .fill(null)
    .map((_, index) => {
      const currentDate = new Date();
      currentDate.setDate(index + 1);

      const total = {
        hearts: 0,
        comments: 0,
        shares: 0,
      };

      videoFilterByUserID.forEach((video) => {
        const videoDate = new Date(video.createdAt);
        if (
          videoDate.getFullYear() === currentDate.getFullYear() &&
          videoDate.getMonth() === currentDate.getMonth() &&
          videoDate.getDate() === currentDate.getDate()
        ) {
          // Lọc hearts, comments, shares theo trường bvID theo từng video._id
          const videoHearts = hearts.filter(
            (heart) => heart.bvID === video._id
          );
          const videoComments = comments.filter(
            (comment) => comment.bvID === video._id
          );
          const videoShares = shares.filter(
            (share) => share.bvID === video._id
          );

          total.hearts += videoHearts.length;
          total.comments += videoComments.length;
          total.shares += videoShares.length;
        }
      });

      return total;
    });

  // Chuyển đổi totalDataByDay thành dạng mảng series để cung cấp cho biểu đồ
  const series = [
    { name: t("Hearts"), data: totalDataByDay.map((data) => data.hearts || 0) },
    {
      name: t("Comments"),
      data: totalDataByDay.map((data) => data.comments || 0),
    },
    { name: t("Shares"), data: totalDataByDay.map((data) => data.shares || 0) },
  ];

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: getDaysFromStartOfMonth(),
    },
  };

  const totalViews = videoFilterByUserID?.reduce(
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
                    {fShortenNumber(totalViews)}
                  </Typography>
                  <Typography variant="body2">
                    {totalViews > 1 ? 'Views' : 'View'}
                  </Typography>
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

export default VideoTab;
