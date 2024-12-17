import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/auth.service';
import { LoginRequest, User } from '../types/auth';
import { decodeToken } from '../utils/jwt';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAuth } = useAuthStore();

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await authService.login(credentials);
      const decodedToken = decodeToken(response.token);
      
      const user: User = {
        id: decodedToken.nameid,
        email: decodedToken.email,
        name: decodedToken.name,
        role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        claims: Object.entries(decodedToken).reduce((acc, [key, value]) => {
          if (key.includes('-')) {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, unknown>),
      };
      
      setAuth({ 
        ...user,
      }, response.token);
    } catch (err) {
      setError('Invalid credentials');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};