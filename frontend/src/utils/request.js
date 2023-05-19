import axios from 'axios';

// Create a new axios instance
const instance = axios.create({
    baseURL: '', // Specify the base URL for all HTTP requests
    timeout: 5000, // Set the request timeout to 5000 milliseconds
    headers: {
        'Content-Type': 'application/json', // Set the default Content-Type header to application/json
    },
});

// Add request interceptors
instance.interceptors.request.use(
    config => {
        // Modify the request config before sending the request
        return config;
    },
    error => {
        // Handle any request errors
        return Promise.reject(error);
    }
);

// Add response interceptors
instance.interceptors.response.use(
    response => {
        // Modify the response data before resolving the promise
        return JSON.parse(response.data); // Parse the response data as JSON
    },
    error => {
        // Handle any response errors
        return Promise.reject(error);
    }
);

export default instance;
