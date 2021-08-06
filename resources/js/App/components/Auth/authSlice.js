import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        loading: true,
        user: null,
        token: null
    },
    reducers: {
        initAuth: (state, { payload }) => {
            const { user, token } = payload;
            state.user = user;
            state.isAuth = true;
            state.loading = false;
            state.token = token
        },
        updateUser: (state, { payload }) => {
            state.user = {
                ...state.user,
                ...payload
            }
        },
        logout: state => {
            state.isAuth = false;
            state.user = null;
            state.loading = false;
            state.token = null
        },
        setAuthLoading: (state, { payload }) => {
            state.loading = payload;
        }
    },
})

export const { initAuth, logout, setAuthLoading, updateUser } = authSlice.actions

export default authSlice.reducer