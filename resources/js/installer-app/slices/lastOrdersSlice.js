import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from '../services/OrderService';

export const lastOrders = createAsyncThunk(
  'lastOrders/lastOrders',
  async function () {
    try {
      const response = await OrderService.getLastOrders();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const lastOrdersSlice = createSlice({
  name: 'lastOrders',
  initialState: {
    orders: [],
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [lastOrders.pending]: (state) => {
      state.loading = true;
      state.orders = [];
    },
    [lastOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
  }
});

export default lastOrdersSlice.reducer