
import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');
const initialUser = localStorage.getItem('user');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken || null,
    user: initialUser ? JSON.parse(initialUser) : null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess(state, action) {
      state.status = 'succeeded';
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;