import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';

NavSection.propTypes = {
  data: PropTypes.array,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func, // Add onClose prop for handling drawer close
};

export default function NavSection({ data = [], isOpen, onClose, ...other }) {
  return (
    <Box {...other}>
      <List
        disablePadding
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' },
          m: { md: '0 8rem' },
          flexDirection: { xs: 'column', md: 'row' }, // Changed to column on small screens
        }}
      >
        {data.map((item, index) => (
          <NavItem key={index} item={item} isOpen={isOpen} onClose={onClose} />
        ))}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func, // Add onClose prop for handling drawer close
};

function NavItem({ item, isOpen, onClose }) {
  const { path, icon, info, title } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      onClick={onClose} // Close drawer on item click
      sx={{
        textDecoration: 'none',
        color: 'text.secondary',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // Ensure items are aligned to the start
        mx: { xs: 1, md: 2 },
        my: { xs: 1, md: 0 }, // Add margin for vertical spacing
        width: '100%',
      }}
      activeClassName="active" // Ensure active class is applied
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      {isOpen && (
        <ListItemText
          primary={title}
          sx={{
            ml: 2,
            display: { md: 'none', xl: 'none', lg: 'none' },
          }}
        />
      )}
      {info && info}
    </StyledNavItem>
  );
}
