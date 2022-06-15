import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Dashboard from '../Dashboard';
import Orders from '../Orders';
import Day from '../ScheduleCalendar/Day';
import Login from '../Login';
import ProtectedRoute from '../ProtectedRoute';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../../slices/authSlice';
import { useSelector } from 'react-redux';
import EditOrder from '../EditOrder';
import Settings from '../Settings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ROUTE_PREFIX = '/app/installer';


const App = () => {
  const [appLoading, setAppLoading] = useState(true);
  const dispatch = useDispatch();
  const authChecked = useSelector(state => state.auth.authChecked);

  useEffect(() => {
    const token = localStorage.getItem('installer-token');
    if (token) {
      dispatch(refreshUser());
    } else {
      setAppLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authChecked) {
      setAppLoading(false);
    }
  }, [authChecked]);

  if (appLoading) {
    return <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex',  position: 'absolute', width: '100vw', height: '100vh', backgroundColor: 'white', zIndex: 9999999, top: 0 }}>
        <CircularProgress />
    </div>
  }

  return (
    <Router>
      <Switch>
        <Route path={`${ROUTE_PREFIX}/login`} exact component={Login} />
        <ProtectedRoute path={`${ROUTE_PREFIX}/dashboard`} exact component={Dashboard} />
        <ProtectedRoute path={`${ROUTE_PREFIX}/settings`} exact component={Settings} />
        <ProtectedRoute path={`${ROUTE_PREFIX}/orders`} exact component={Orders} />
        <ProtectedRoute path={`${ROUTE_PREFIX}/orders/schedule/day/:date`} exact component={Day} />
        <ProtectedRoute path={`${ROUTE_PREFIX}/orders/edit/:orderId`} exact component={EditOrder} />
      </Switch>

      <ToastContainer />
    </Router>
  )
}

export default App;