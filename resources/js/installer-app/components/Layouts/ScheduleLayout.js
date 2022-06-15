import React from 'react';
import Box from '@mui/material/Box';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../Header';
import { DrawerHeader, Main } from '../Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../slices/drawerSlice';
import { theme } from './AuthLayout';

const ScheduleLayout = (props) => {
  const open = useSelector(state => state.drawer.open);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    dispatch(setOpen(true));
  };

  const handleDrawerClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header {...{handleDrawerOpen, handleDrawerClose, open}} />
        <Main open={open} schedule='true'>
          <DrawerHeader />
            {props.children}
        </Main>
      </Box>
    </ThemeProvider> 
  )
}

export default ScheduleLayout;