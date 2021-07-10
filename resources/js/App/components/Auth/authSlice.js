import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        loading: true,
        user: null
    },
    reducers: {
        initAuth: (state, { payload }) => {
            const { user } = payload;
            state.user = user;
            state.isAuth = true;
            state.loading = false;
        },
        logout: state => {
            state.isAuth = false;
            state.user = null;
            state.loading = false;
        },
        setAuthLoading: (state, { payload }) => {
            state.loading = payload;
        }
    },
})

export const { initAuth, logout, setAuthLoading } = authSlice.actions

export default authSlice.reducer