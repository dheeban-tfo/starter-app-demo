import { Module } from '../types/module';
import { apiClient } from './apiClient';

export const moduleService = {
  getModules: async (): Promise<Module[]> => {
    const response = await apiClient.get('/RoleManagement/modules');
    return response.data;
  },
};