//react
import { useState } from 'react';
//mui
import { Box, Typography, Tab, Grid } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//Dayjs
import dayjs from 'dayjs';
//component
import OverviewTab from './OverviewTab';
import VideoTab from './VideoTab';
import FollowerTab from './FollowerTab';
//i18n
import { useTranslation } from 'react-i18next';
//-------------------------------------------------

const ActionTabs = () => {
  const [tabValue, setTabValue] = useState('1');
  const [datimeValue, setDateTimeValue] = useState(dayjs(Date.now()));
  const {t} = useTranslation('dashboardCreator');

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', mt: '4.5rem' }}>
      <Box sx={{ my: '2rem', px: '1rem' }}>
        <Typography variant="h3">Statistics</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={['DateTimePicker', 'DateTimePicker']}
            sx={{ alignItems: 'flex-end' }}
          >
            <DatePicker
              label={t("Select Date")}
              value={datimeValue}
              sx={{ maxWidth: '5rem' }}
              slotProps={{
                // Targets the `IconButton` component.
                openPickerButton: {
                  color: 'primary',
                },
                // Targets the `InputAdornment` component.
                inputAdornment: {
                  position: 'end',
                },
              }}
              onChange={(newValue) => setDateTimeValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Grid container>
        <Grid item md={12}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label={t("Overview")} value="1" />
                  <Tab label={t("Video")} value="2" />
                  <Tab label={t("Follower")} value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <OverviewTab />
              </TabPanel>
              <TabPanel value="2">
                <VideoTab />
              </TabPanel>
              <TabPanel value="3">
                <FollowerTab />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActionTabs;
