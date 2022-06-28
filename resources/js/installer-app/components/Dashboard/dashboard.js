import * as React from 'react';
import Typography from '@mui/material/Typography';
import AuthLayout from '../Layouts/AuthLayout';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import LoadingSpinner from '../LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { lastOrders } from '../../slices/lastOrdersSlice';
import { ROUTE_PREFIX } from '../App/App';
import { Link } from 'react-router-dom';
import dayjs from '../../utilities/dayjs';

const Dashboard = () => {
  const {loading, orders} = useSelector(state => state.lastOrders);
  const dispatch = useDispatch();

  React.useEffect(async () => {
    dispatch(lastOrders());
  }, []);

  return (
    <AuthLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Dashboard
          </Typography>
        </Grid>

        {loading && <Grid item xs={12}>
          <LoadingSpinner />
        </Grid>}

        {orders && orders.map((order, i) => (
          <Grid item md={4} xs={12} key={i}>
            <Card >
              <CardContent>

                <Typography variant="h5" component="div">
                  UUID: # {order.uuid}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="#ed0598" >
                  {order.status}
                </Typography>

                <Typography variant="body2">
                  <b>Schedule</b>: {dayjs(order.date).format('MM.DD.YYYY HH:mm')}
                </Typography>
                <Typography  variant="body2">
                  <b>Customer</b>: {order.user.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`${ROUTE_PREFIX}/orders/edit/${order.id}`}>Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

      </Grid>
    </AuthLayout>
  )
}

export default Dashboard;