import { http } from './http';
import { Community } from '../types/community';

interface GetCommunitiesResponse {
  items: Community[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export const communityService = {
  getCommunities: async (): Promise<Community[]> => {
    const response = await http.get<GetCommunitiesResponse>('/Community');
    return response.data.items;
  },

  getCommunity: async (id: number): Promise<Community> => {
    const response = await http.get(`/Community/${id}`);
    return response.data;
  },
};