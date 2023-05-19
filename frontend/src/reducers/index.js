import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';

// Combine multiple reducers into a single root reducer
const rootReducer = combineReducers({
    auth: authReducer, // Registering the authReducer under the 'auth' key in the store
});

export default rootReducer;
