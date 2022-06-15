import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async function ({email, password}, { rejectWithValue }) {
    try {
      const response = await AuthService.login(email, password);

      localStorage.setItem('installer-token', response.data.access_token);

      return response.data;
    } catch (error) {
      return rejectWithValue('Whhooops...');
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async function (_, { rejectWithValue }) {
    try {
      const response = await AuthService.refreshToken();

      localStorage.setItem('installer-token', response.data.access_token);

      return response.data;
    } catch (error) {
      return rejectWithValue('Whhooops...');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async function (_, { rejectWithValue }) {
    try {
      const response = await AuthService.logout();

      localStorage.removeItem('installer-token');

      return response.data;
    } catch (error) {
      return rejectWithValue('Whhooops...');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authChecked: false,
    auth: false,
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    updateProfile(state, action) {
      state.user.name = action.payload.name;
      state.user.avatar = action.payload.avatar;
      state.user.email = action.payload.email;
    }
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.auth = true;
      state.user = action.payload?.user;
      state.loading = false;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      console.log('error happens :)');
      state.error = 'Whoops... Something went wrong 😢';
    },

    [refreshUser.pending]: (state) => {
      // state.loading = true;
      // state.error = null;
      state.authChecked = false;
    },
    [refreshUser.fulfilled]: (state, action) => {
      state.auth = true;
      state.user = action.payload?.user;
      state.loading = false;
      state.authChecked = true;
    },
    [refreshUser.rejected]: (state, action) => {
      state.loading = false;
      state.authChecked = true;
      state.error = action.payload;
    },

    [logoutUser.fulfilled]: (state, action) => {
      state.auth = false;
      state.user = null;
      state.authChecked = false;
    }
  }
});

export const { updateProfile } = authSlice.actions;

export default authSlice.reducer