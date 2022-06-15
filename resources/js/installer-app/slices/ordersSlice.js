import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from '../services/OrderService';

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async function () {
    try {
      const response = await OrderService.getOrders();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: {},
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [getOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
  }
});

export default ordersSlice.reducer