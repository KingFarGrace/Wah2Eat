import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false, // Initial state for isLoggedIn
    userData: null, // Initial state for userData
};

// Load state from local storage if available
const persistedState = localStorage.getItem('authState');
const parsedPersistedState = JSON.parse(persistedState);

// Create a slice of the Redux store for the authentication-related state
const authSlice = createSlice({
    name: 'auth', // Name of the slice
    initialState: parsedPersistedState || initialState, // Use persisted state if available, otherwise use initial state
    reducers: {
        loginSuccess: (state, action) => {
            // Reducer function for handling successful login
            state.isLoggedIn = true; // Update isLoggedIn to true
            state.userData = action.payload; // Update userData with the payload (user data)
            // Save state to local storage
            localStorage.setItem('authState', JSON.stringify(state));
        },
        logout: (state) => {
            // Reducer function for handling logout
            state.isLoggedIn = false; // Update isLoggedIn to false
            state.userData = null; // Clear userData
            // Clear state from local storage on logout
            localStorage.removeItem('authState');
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions; // Extract the action creators
export default authSlice.reducer; // Export the reducer function
