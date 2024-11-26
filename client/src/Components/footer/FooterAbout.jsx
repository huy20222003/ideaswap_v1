//mui

import { Stack, Box, Typography } from "@mui/material";
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------------

const FooterAbout = ()=> {
    const {t} = useTranslation('footer');
    return (
        <Stack sx={{alignItems: {xs: 'center', sm: 'center'}}}>
            <Box sx={{my: '1.2rem'}}>
                <Typography sx={{fontSize: '1rem', fontWeight: 700, color: 'white'}}>{t("About IdeaSwap")}</Typography>
            </Box>
            <Box>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>{t("Introduction")}</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>{t("Contact")}</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>{t("Contributors")}</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>{t("Rules")}</Typography>
            </Box>
        </Stack>
    );
}

export default FooterAbout;