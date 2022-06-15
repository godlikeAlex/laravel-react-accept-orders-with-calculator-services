import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getOrders } from '../../slices/ordersSlice';
import ScheduleLayout from '../Layouts/ScheduleLayout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/system';
import { ROUTE_PREFIX } from '../App/App';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dayjs, {dayjsInstance} from '../../utilities/dayjs';


const createDay = (day) => {
    return new Array(24).fill(null).map((_, h) => {
        return day.add(h, 'h');
    });
};

const Day = () => {
    const [day, setDay] = useState([]);
    let {date} = useParams();
    const {orders} = useSelector(state => state.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        const generatedDayByHours = createDay(dayjsInstance(date));
        setDay(generatedDayByHours);
        dispatch(getOrders());
    }, []);

    return (
        <ScheduleLayout>
            <Box className='schedule-header' sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Button component={Link} color='primary' to={`${ROUTE_PREFIX}/orders/`} style={{display: 'flex', alignItems: 'center'}}>
                        <ArrowBackIcon />
                    </Button>
                    <Typography style={{marginLeft: '15px'}} variant='h5'>{dayjsInstance(date).format('MMMM DD')}</Typography>
                </Box>

                <Box>
                    <Button component={Link} color='primary' to={`${ROUTE_PREFIX}/orders/schedule/day/${dayjsInstance(date).set('hour', 0).set('minute', 0).subtract(1, 'day').format('YYYY-MM-DD')}`}>
                        <ChevronLeftIcon  />
                    </Button>

                    <Button component={Link} color='primary' to={`${ROUTE_PREFIX}/orders/schedule/day/${dayjsInstance(date).set('hour', 0).set('minute', 0).add(1, 'day').format('YYYY-MM-DD')}`}>
                        <ChevronRightIcon />
                    </Button>
                </Box>
            </Box>

            
            
            <Grid container>
            {day.map((hour, i) => {
                return (
                    <Grid item xs={12} key={i} sx={{ borderBottom: 1,borderColor: '#d8d8d8' }}>
                        <Grid container>
                            <Grid item xs={4} md={2} sx={{ borderRight: 1,borderColor: '#d8d8d8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <h5>{hour.format('hh A')}</h5>
                            </Grid>

                            <Grid item xs={8} md={10} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', paddingLeft: '15px', paddingRight: '15px', paddingBottom: '15px'}}>
                                {orders[date]?.map((order, keyOrder) => {
                                    if (dayjs(order.date).diff(hour, 'm') >= 0 && dayjs(order.date).diff(hour, 'm') < 60) {
                                        return <Link style={{textDecoration: 'none'}} to={`${ROUTE_PREFIX}/orders/edit/${order.id}`} className='calendar-item-event' key={`${keyOrder}-${order.date}`}>
                                            <div>Your order!</div>
                                            <div>Status: {order.status}</div>
                                            <div>Schedule: {dayjs(order.date).format('MMMM DD ddd YYYY | hh:mm A')}</div>
                                        </Link>
                                    }
                                })}
                            </Grid>

                        </Grid>
                    </Grid>
                )
            })}
            </Grid>
        </ScheduleLayout>
    )
}

export default Day;