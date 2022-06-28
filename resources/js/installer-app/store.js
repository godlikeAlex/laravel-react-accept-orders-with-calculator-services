import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import lastOrdersReducer from './slices/lastOrdersSlice';
import ordersReducer from './slices/ordersSlice';
import calendarReducer from './slices/scheduleCalendarSlice';
import drawerReducer from './slices/drawerSlice';


export default configureStore({
  reducer: {
    auth: authReducer,
    lastOrders: lastOrdersReducer,
    orders: ordersReducer,
    calendar: calendarReducer,
    drawer: drawerReducer,
  },
});