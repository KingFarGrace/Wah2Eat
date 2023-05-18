import axios from 'axios';

const instance = axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return JSON.parse(response.data);
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;
