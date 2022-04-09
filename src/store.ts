import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import categoryReducer from './category/category.slice'
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();