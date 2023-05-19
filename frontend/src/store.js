import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/reducers';

// Configure the Redux store using the rootReducer
const store = configureStore({
    reducer: rootReducer, // Set the rootReducer as the main reducer for the store
});

export default store;
