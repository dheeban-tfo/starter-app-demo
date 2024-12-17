import { create } from 'zustand';
import { User } from '../types/auth';
import { decodeToken } from '../utils/jwt';

const STORAGE_KEY = 'auth_token';

const extractUserFromToken = (token: string): User | null => {
  try {
    const decodedToken = decodeToken(token);
    return {
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
  } catch {
    return null;
  }
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

const getInitialState = () => {
  const token = localStorage.getItem(STORAGE_KEY);
  if (token) {
    try {
      const user = extractUserFromToken(token);
      return user ? { user, token, isAuthenticated: true } : { user: null, token: null, isAuthenticated: false };
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),
  setAuth: (user, token) => {
    localStorage.setItem(STORAGE_KEY, token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, token: null, isAuthenticated: false });
  },
}));