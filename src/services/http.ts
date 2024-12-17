import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'https://infinitely-pleasant-eft.ngrok-free.app/api';
const STORAGE_KEY = 'auth_token';

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

export const setTenantHeader = (tenantId: string) => {
  http.defaults.headers['X-TenantId'] = tenantId;
};