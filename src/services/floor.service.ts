import { http } from './http';
import { Floor, FloorListResponse, CreateFloorRequest, UpdateFloorRequest } from '../types/floor';

export const floorService = {
  getFloors: async (): Promise<FloorListResponse> => {
    const response = await http.get('/Floor');
    return response.data;
  },

  getFloor: async (id: number): Promise<Floor> => {
    const response = await http.get(`/Floor/${id}`);
    return response.data;
  },

  createFloor: async (data: CreateFloorRequest): Promise<Floor> => {
    const response = await http.post('/Floor', data);
    return response.data;
  },

  updateFloor: async (id: number, data: UpdateFloorRequest): Promise<void> => {
    await http.put(`/Floor/${id}`, data);
  },

  deleteFloor: async (id: number): Promise<void> => {
    await http.delete(`/Floor/${id}`);
  },
};