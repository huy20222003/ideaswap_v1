//mui
import { Box } from '@mui/material';
//component
import AccountActionTabs from '../../section/account';
//--------------------------------------------

const AccountPage = () => {
  document.title = "Account";
  return (
    <Box sx={{ mt: '5rem' }}>
      <AccountActionTabs />
    </Box>
  );
};

export default AccountPage;
