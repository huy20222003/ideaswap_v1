import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Tooltip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
//@mui icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import styled from '@emotion/styled';
//i18n
import { useTranslation } from 'react-i18next';
//-------------------------------------------------------------

const NavLinkCustom = styled(NavLink)`
  && {
    margin: 0;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 0.7rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    display: block;
    text-decoration: none;
    color: ${({ active }) => (active ? '#54D62C' : '#000')}; /* Đổi màu khi active */
  }
`;

const MainListItems = () => {
  const [activeItem, setActiveItem] = useState('dashboard'); // State để lưu trạng thái của mỗi mục
  const {t} = useTranslation('dashboardCreator');

  return (
    <>
      <Tooltip title={t("Dashboard")} placement="right">
        <NavLinkCustom
          to="/creator/dashboard"
          active={activeItem === 'dashboard'} // Kiểm tra xem mục này có đang active không
          onClick={() => setActiveItem('dashboard')} // Khi click, đặt mục này là active
        >
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon sx={{ color: activeItem === 'dashboard' ? '#54D62C' : '#000' }} /> {/* Đổi màu của icon */}
            </ListItemIcon>
            <ListItemText sx={{ fontSize: '0.7rem' }} primary={t("Dashboard")} />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
      <Tooltip title={t("Content")} placement="right">
        <NavLinkCustom
          to="/creator/content"
          active={activeItem === 'content'} // Kiểm tra xem mục này có đang active không
          onClick={() => setActiveItem('content')} // Khi click, đặt mục này là active
        >
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon sx={{ color: activeItem === 'content' ? '#54D62C' : '#000' }} /> {/* Đổi màu của icon */}
            </ListItemIcon>
            <ListItemText primary={t("Content")} />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
    </>
  );
};

const SecondaryListItems = () => {
  const {t} = useTranslation('dashboardCreator');
  return (
    <>
      <Tooltip title={t("Logout")} placement="right">
        <NavLinkCustom to="/auth/login">
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t("Logout")} />
          </ListItemButton>
        </NavLinkCustom>
      </Tooltip>
    </>
  );
};

export { MainListItems, SecondaryListItems };
