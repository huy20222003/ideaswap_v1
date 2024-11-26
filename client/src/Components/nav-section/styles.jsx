import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton } from '@mui/material';

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start', // Ensure items are aligned to the start
  '&.active': {
    [theme.breakpoints.up('md')]: {
      color: 'white', // Always white on large screens
    },
    [theme.breakpoints.down('md')]: {
      color: '#54D62C', // Change color when active on small screens
      width: '100%',
    },
    '& .MuiListItemIcon-root': {
      [theme.breakpoints.up('md')]: {
        color: 'white', // Always white on large screens
      },
      [theme.breakpoints.down('md')]: {
        color: '#54D62C', // Change icon color when active on small screens
      },
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '0%',
    height: 3,
    backgroundColor: 'white',
    borderRadius: '10%',
    transition: 'width 0.3s ease',
  },
  '&.active::after': {
    width: '80%',
  },
}));

export const StyledNavItemIcon = styled(ListItemIcon)(({ theme }) => ({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'flex-start', // Align icon to the start vertically
  justifyContent: 'center',
  color: 'inherit', // Inherit color from parent
  [theme.breakpoints.up('md')]: {
    color: 'white', // Always white on large screens
  },
}));