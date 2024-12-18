import { http } from './http';
import { Facility, CreateFacilityRequest, UpdateFacilityRequest } from '../types/facility';

export const facilityService = {
  getFacilities: async (): Promise<Facility[]> => {
    const response = await http.get('/Facility');
    return response.data;
  },

  getFacility: async (id: number): Promise<Facility> => {
    const response = await http.get(`/Facility/${id}`);
    return response.data;
  },

  createFacility: async (data: CreateFacilityRequest): Promise<Facility> => {
    const response = await http.post('/Facility', data);
    return response.data;
  },

  updateFacility: async (id: number, data: UpdateFacilityRequest): Promise<void> => {
    await http.put(`/Facility/${id}`, data);
  },
};