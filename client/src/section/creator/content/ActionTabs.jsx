//react
import { useState } from 'react';
//mui
import { Box, Typography, Tab, Grid, Button, Stack } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
//component
import VideoManage from './VideoManage';
import CourseManage from './CourseManage';
import DocumentManage from './DocumentManage';
import FormDialogAddCourse from '../../../Components/FormDialog/creator/FormDialogAddCourse';
import FormDialogUploadVideo from '../../../Components/FormDialog/creator/FormDialogUploadVideo';
import FormDialogUploadDocument from '../../../Components/FormDialog/document/FormDialogUploadDocument';
//context
import { useCourse, useCommon, useDocument } from '../../../hooks/context';
//i18n
import { useTranslation } from 'react-i18next';
//-------------------------------------------------

const ActionTabs = () => {
  const [tabValue, setTabValue] = useState('1');
  const { setOpenFormDialog } = useCommon();
  const { setOpenFormDialogAddCourse } = useCourse();
  const { setOpenFormDialogAddDocument } = useDocument();
  const {t} = useTranslation('contentCreator');

  const handleOpenFormUploadVideo = () => {
    setOpenFormDialog(true);
  };

  const handleOpenFormUploadDocument = () => {
    setOpenFormDialogAddDocument(true);
  };

  const handleOpenFormAddCourse = () => {
    setOpenFormDialogAddCourse(true);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', mt: '4.5rem' }}>
      <Box sx={{ my: '2rem', px: '1rem' }}>
        <Typography variant="h3">{t("Statistics")}</Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="text"
            size="medium"
            startIcon={<FileUploadOutlinedIcon />}
            onClick={handleOpenFormUploadVideo}
          >
            {t("Upload Video")}
          </Button>
          <Button
            variant="text"
            size="medium"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={handleOpenFormAddCourse}
          >
            {t("Add Course")}
          </Button>
          <Button
            variant="text"
            size="medium"
            startIcon={<FileUploadOutlinedIcon />}
            onClick={handleOpenFormUploadDocument}
          >
            {t("Upload Document")}
          </Button>
        </Stack>
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
                  <Tab label={t("Video")} value="1" />
                  <Tab label={t("Course")} value="2" />
                  <Tab label={t("Document")} value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <VideoManage />
              </TabPanel>
              <TabPanel value="2">
                <CourseManage />
              </TabPanel>
              <TabPanel value="3">
                <DocumentManage />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
      <FormDialogAddCourse />
      <FormDialogUploadDocument />
      <FormDialogUploadVideo />
    </Box>
  );
};

export default ActionTabs;
