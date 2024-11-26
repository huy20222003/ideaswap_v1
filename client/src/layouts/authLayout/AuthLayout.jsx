//react-router-dom
import { Outlet } from "react-router-dom";
//mui
import { Container, Box } from "@mui/material";
//Components
import Header from "../authLayout/header";
//-----------------------------------------

const AuthLayout = ()=> {
    return (
        <Container maxWidth='xl'>
            <Box>
                <Header />
            </Box>
            <Box>
                <Outlet/>
            </Box>
        </Container>
    );
}

export default AuthLayout;