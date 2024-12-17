import { Profile } from '../types/profile';
import { apiClient } from './apiClient';

export const profileService = {
  getProfile: async (): Promise<Profile> => {
    const response = await apiClient.get('/Profile');
    return response.data;
  },
};