import { http } from './http';
import { User, Role, UserAccess } from '../types/user';

interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await http.get('/v1/User');
    return response.data;
  },
  
  createUser: async (data: CreateUserRequest): Promise<User> => {
    const response = await http.post('/v1/User', data);
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await http.get(`/v1/User/${id}`);
    return response.data;
  },

  getUserAccess: async (id: string): Promise<UserAccess> => {
    const response = await http.get(`/RoleManagement/UserAccess/${id}`);
    return response.data;
  },

  getRoles: async (): Promise<Role[]> => {
    const response = await http.get('/RoleManagement/GetRoles');
    return response.data;
  },
};