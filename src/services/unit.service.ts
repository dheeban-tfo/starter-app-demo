import { http } from './http';
import { Unit, UnitListResponse, CreateUnitRequest, UpdateUnitRequest } from '../types/unit';

export const unitService = {
  getUnits: async (): Promise<UnitListResponse> => {
    const response = await http.get('/Unit');
    return response.data;
  },

  getUnit: async (id: number): Promise<Unit> => {
    const response = await http.get(`/Unit/${id}`);
    return response.data;
  },

  createUnit: async (data: CreateUnitRequest): Promise<Unit> => {
    const response = await http.post('/Unit', data);
    return response.data;
  },

  updateUnit: async (id: number, data: UpdateUnitRequest): Promise<void> => {
    await http.put(`/Unit/${id}`, data);
  },

  deleteUnit: async (id: number): Promise<void> => {
    await http.delete(`/Unit/${id}`);
  },
};