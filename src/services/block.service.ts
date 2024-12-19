import { http } from './http';
import { Block, BlockListResponse, CreateBlockRequest, UpdateBlockRequest } from '../types/block';

export const blockService = {
  getBlocks: async (): Promise<BlockListResponse> => {
    const response = await http.get('/Block');
    return response.data;
  },

  getBlock: async (id: number): Promise<Block> => {
    const response = await http.get(`/Block/${id}`);
    return response.data;
  },

  createBlock: async (data: CreateBlockRequest): Promise<Block> => {
    const response = await http.post('/Block', data);
    return response.data;
  },

  updateBlock: async (id: number, data: UpdateBlockRequest): Promise<void> => {
    await http.put(`/Block/${id}`, data);
  },

  deleteBlock: async (id: number): Promise<void> => {
    await http.delete(`/Block/${id}`);
  },
};