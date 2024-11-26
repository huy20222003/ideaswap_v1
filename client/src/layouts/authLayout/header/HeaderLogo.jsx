//mui
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//----------------------------------------------

const HeaderLogo = () => {
  const navigate = useNavigate();
  const handleNavigate = async () => {
    navigate(`/dashboard/app`);
  };
  return (
    <Box
      component="img"
      src="/assets/logos/logo_IdeaSwap_nbg.png"
      width="3rem"
      height="3rem"
      sx={{ mx: '1rem', cursor: 'pointer' }}
      onClick={handleNavigate}
    />
  );
};

export default HeaderLogo;
