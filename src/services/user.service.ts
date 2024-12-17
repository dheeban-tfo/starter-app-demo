import { http } from './http';
import { User, Role } from '../types/user';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await http.get('/v1/User');
    return response.data;
  },

  getRoles: async (): Promise<Role[]> => {
    const response = await http.get('/RoleManagement/GetRoles');
    return response.data;
  },
};