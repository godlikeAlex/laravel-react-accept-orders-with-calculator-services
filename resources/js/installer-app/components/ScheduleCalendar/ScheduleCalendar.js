import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import Month from './Month';
import { useDispatch, useSelector } from 'react-redux';
import { setMonthIndex } from '../../slices/scheduleCalendarSlice';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import './style.css';
import dayjs, { dayjsInstance } from '../../utilities/dayjs';


function getMonth(month = dayjsInstance().month()) {
    month = Math.floor(month);
    const year = dayjsInstance().year();
    const firstDayOfTheMonth = dayjsInstance(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(5).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        currentMonthCount++;
        return dayjsInstance(new Date(year, month, currentMonthCount));
      });
    });
    return daysMatrix;
}

const ScheduleCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState([]);
  const {orders} = useSelector(state => state.orders);
  const {monthIndex} = useSelector(state => state.calendar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!monthIndex) {
      dispatch(setMonthIndex(dayjsInstance().month()));
    }
  }, []);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <Box className='schedule-header' sx={{paddingLeft: 0, paddingRight: 0, paddingBottom: 0}}>
        <Box 
          sx={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            paddingLeft: '15px', paddingRight: '15px', paddingBottom: '15px'
          }}
        >
          <Box>
            <Typography variant='h3'>
              {dayjsInstance().set('month', monthIndex).format('MMMM')}
            </Typography>
          </Box>

          <Box>
              <Button color='primary' onClick={() => dispatch(setMonthIndex(monthIndex - 1))}>
                  <ChevronLeftIcon  />
              </Button>

              <Button color='primary' onClick={() => dispatch(setMonthIndex(monthIndex + 1))}>
                  <ChevronRightIcon />
              </Button>
          </Box>
        </Box>

        <Box className='calendar-grid' sx={{width: '100%'}}>
            {new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat').map((item, i) => (
                <Box className='calendar-item' key={`${i}-${item}`} sx={{paddingTop: 0, borderTop: 1, borderBottom: 0, borderRight: i < 6 ? 1 : 0, borderColor: '#d8d8d8'}}>
                    <Typography align='center'>
                        {item}
                    </Typography>
                </Box>
            ))}
        </Box>
      </Box>

      

      <Month month={currentMonth} groupedOrderByDates={orders} />                    
    </>
  )
}

export default ScheduleCalendar;