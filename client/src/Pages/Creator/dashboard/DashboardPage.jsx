// @mui
import { Box } from '@mui/material';
//component
import { ActionTabs } from '../../../section/creator/dashboard';
// ----------------------------------------------------------------------

const DashboardPage = () => {
  document.title = 'Dashboard';
  return (
    <>
      <Box>
        <ActionTabs />
      </Box>
    </>
  );
};

export default DashboardPage;
