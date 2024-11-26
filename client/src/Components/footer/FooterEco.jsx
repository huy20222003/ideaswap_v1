//mui

import { Stack, Box, Typography } from "@mui/material";
//i18n
import { useTranslation } from 'react-i18next';
//--------------------------------------------------------

const FooterEco = ()=> {
    const {t} = useTranslation('footer');
    return (
        <Stack sx={{alignItems: {xs: 'center', sm: 'center'}}}>
            <Box sx={{my: '1.2rem'}}>
                <Typography sx={{fontSize: '1rem', fontWeight: 700, color: 'white'}}>{t("IdeaSwap Ecosystem")}</Typography>
            </Box>
            <Box>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>{t("Social media IdeaSwap")}</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>{t("IdeaSwap AI")}</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>{t("IdeaSwap Cloud")}</Typography>
            </Box>
        </Stack>
    );
}

export default FooterEco;