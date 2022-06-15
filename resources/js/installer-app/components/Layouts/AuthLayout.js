import React from 'react';
import Box from '@mui/material/Box';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../Header';
import { DrawerHeader, Main } from '../Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../slices/drawerSlice';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ed0598"
    }
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: '#696969'
        }
      }
    }
  }
});

const AuthLayout = (props) => {
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
        <Main open={open}>
          <DrawerHeader />
          <Container sx={{ p: 2, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px;' }}>
            {props.children}
          </Container>
        </Main>
      </Box>
    </ThemeProvider> 
  )
}

export default AuthLayout;