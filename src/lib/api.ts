import axios, { AxiosError } from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error instanceof AxiosError) {
            const casesForNotRedirect = ['Invalid email or password'];

            if (
                error.response?.status === 401 &&
                !casesForNotRedirect.includes(error.response.data.error)
            ) {
                window.location.href = '/auth/login';
            }
        }

        return Promise.reject(error);
    }
);
