import { configureStore } from '@reduxjs/toolkit';
import mailReducer from '../features/mailSlice';
import userReducer from '../features/userSlice';
import emailIdReducer from '../features/emailIdSlice' 

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    user: userReducer,
    emailidlist:emailIdReducer
  },
});
