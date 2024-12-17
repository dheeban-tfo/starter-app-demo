import axios from 'axios';

const API_BASE_URL = 'https://infinitely-pleasant-eft.ngrok-free.app/api';
const STORAGE_KEY = 'auth_token';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setTenantHeader = (tenantId: string) => {
  apiClient.defaults.headers['X-TenantId'] = tenantId;
};