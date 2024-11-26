//mui

import { Stack, Box, Typography } from "@mui/material";
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------------

const FooterInfo = ()=> {
    const {t} = useTranslation('footer');
    return (
        <Stack sx={{alignItems: {xs: 'center', sm: 'center'}}}>
            <Box sx={{my: '1.2rem'}}>
                <Typography sx={{fontSize: '1rem', fontWeight: 700, color: 'white'}}>IdeaSwap</Typography>
            </Box>
            <Box>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>{t("PhoneNumber")}: 0999999999</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>{t("Email")}: ideaswapsp@gmail.com</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>{t("Address")}: Ha Noi, Viet Nam</Typography>
            </Box>
        </Stack>
    );
}

export default FooterInfo;