import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { Link} from "react-router-dom";
import { ROUTE_PREFIX } from '../App/App';

const screenWidth = window.innerWidth;
const isMobile = screenWidth < 699;

export const drawerWidth = isMobile ? screenWidth : 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, schedule }) => ({
    flexGrow: 1,
    padding: schedule ? 0 : theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      display: open && isMobile ? 'none': 'block',
      marginLeft: 0,
    }),
  }),
);

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Header({handleDrawerOpen, handleDrawerClose, open}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const logoutUserHandle = () => {
    dispatch(logoutUser());
  };

  const handleLinkClick = () => {
    if (isMobile) {
      handleDrawerClose();
    }
  }

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            EasyWay Installer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          <ListItem key={'user-name'} disablePadding >
            <ListItemButton>
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src={`/storage/${user.avatar}`}
                />
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        <List>
        <ListItem key={'Home'} disablePadding  component={Link} onClick={handleLinkClick} to={`${ROUTE_PREFIX}/dashboard`}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItemButton>
          </ListItem>

          <ListItem key={'Orders'} disablePadding component={Link} onClick={handleLinkClick} to={`${ROUTE_PREFIX}/orders`}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Orders'} />
            </ListItemButton>
          </ListItem>
{/* 
          <ListItem key={'Completed Orders'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DoneAllIcon />
              </ListItemIcon>
              <ListItemText primary={'Completed Orders'} />
            </ListItemButton>
          </ListItem> */}

          <ListItem key={'Settings'} disablePadding component={Link} onClick={handleLinkClick} to={`${ROUTE_PREFIX}/settings`}>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={'Settings'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={'log out'} disablePadding onClick={logoutUserHandle}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
