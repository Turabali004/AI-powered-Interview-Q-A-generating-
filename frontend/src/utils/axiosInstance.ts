import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from '../utils/apiPaths';

// 1. Create the instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor (e.g., adding Auth Tokens)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// 3. Response Interceptor (e.g., handling 401 Unauthenticated)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // Logic for logout or refreshing token
      console.error('Unauthorized! Redirecting...');
    }
    return Promise.reject(error);
  }
);

export default api;