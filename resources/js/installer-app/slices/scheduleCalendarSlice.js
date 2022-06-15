import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    monthIndex: null,
    currentMonth: [],
  },
  reducers: {
      initCalendar(state, action) {
        state.monthIndex = action.payload.monthIndex;
        state.currentMonth = action.payload.currentMonth;
      },
      setMonthIndex(state, action) {
          state.monthIndex = action.payload;
      },
      setCurrentMonth(state, action) {
        state.currentMonth = action.payload;
      }
  },
});

export const { initCalendar, setCurrentMonth, setMonthIndex } = calendarSlice.actions;

export default calendarSlice.reducer