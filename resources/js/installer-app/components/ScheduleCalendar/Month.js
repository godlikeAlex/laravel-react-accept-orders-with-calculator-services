import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { useHistory } from 'react-router-dom';
import { ROUTE_PREFIX } from '../App/App';


const Month = ({month, groupedOrderByDates}) => {
    const history = useHistory();

    const renderBagage = (day) => {
        const formatedDay = day.format('YYYY-MM-DD');
        
        return groupedOrderByDates.hasOwnProperty(formatedDay) 
            && (
                <div className='bagage-calendar'>
                    {groupedOrderByDates[formatedDay].length}
                </div>
            )
    }

    const handleDayClick = (day) => {
        const formatedDay = day.format('YYYY-MM-DD');

        history.push(`${ROUTE_PREFIX}/orders/schedule/day/${formatedDay}`);
    }

    return (
        <>

        <Box className='calendar-grid'>
            {month.map((week, weekIdx) => {
                return (
                    week.map((day, idx) => (
                        <Box 
                            onClick={() => handleDayClick(day)}
                            key={idx}
                            className='calendar-item'
                            sx={{  
                                borderRight: idx == 5 ? 1 : 0, 
                                minHeight: 200, 
                                borderTop: weekIdx === 0 ? 1 : 0,
                                borderColor: '#d8d8d8'
                            }}
                        >
                           <Typography align='center'>
                            {day.format('DD')}
                           </Typography>

                           {renderBagage(day)}

                        </Box>
                    ))
                );
            })}
        </Box> 
        </>
   
    )
};

export default Month;