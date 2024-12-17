import axios from 'axios';
import { LoginRequest, LoginResponse } from '../types/auth';
import { Profile } from '../types/profile';

const API_BASE_URL = 'https://infinitely-pleasant-eft.ngrok-free.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/Auth/login', credentials, {
      headers: {
        'X-TenantId': credentials.tenantId,
      },
    });
    return response.data;
  },
};

export const profileApi = {
  getProfile: async (): Promise<Profile> => {
    const response = await api.get('/Profile');
    return response.data;
  },
};