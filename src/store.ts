import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();