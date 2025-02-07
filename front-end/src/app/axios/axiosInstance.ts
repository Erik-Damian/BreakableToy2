import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/', // The backend base url
    timeout: 10000, // 10 seconds timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Token gets handled by the backend.
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data; // Return only the data from the response
    },
    (error) => {
        // Handle errors globally (e.g., show a toast notification)
        return Promise.reject(error);
    }
);

export default axiosInstance;