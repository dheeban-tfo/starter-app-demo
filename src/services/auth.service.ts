import { LoginRequest, LoginResponse } from '../types/auth';
import { apiClient, setTenantHeader } from './apiClient';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    setTenantHeader(credentials.tenantId);
    const response = await apiClient.post('/Auth/login', credentials);
    return response.data;
  },
};