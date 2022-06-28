import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../slices/ordersSlice';
import AuthLayout from '../Layouts/AuthLayout';
import ScheduleLayout from '../Layouts/ScheduleLayout';
import LoadingSpinner from '../LoadingSpinner';
import ScheduleCalendar from '../ScheduleCalendar';

const Orders = () => {
  const {loading, orders} = useSelector(state => state.orders);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <ScheduleLayout>
      {loading ? <LoadingSpinner /> : <ScheduleCalendar />}
    </ScheduleLayout>
  );
}

export default Orders;