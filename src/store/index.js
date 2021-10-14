import { configureStore } from '@reduxjs/toolkit';
import user_auth from './authSlice';

export default configureStore({
  reducer: {
    user_auth
  },
});
