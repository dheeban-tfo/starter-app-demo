import { http } from './http';
import { Role, RoleDetails } from '../types/user';
import { Module } from '../types/module';

interface CreateRoleRequest {
  name: string;
}

interface AssignPermissionRequest {
  roleId: number;
  moduleId: number;
  actionId: number;
  moduleName: string;
}

interface RemovePermissionRequest {
  roleId: number;
  moduleId: number;
  actionId: number;
}

export const roleService = {
  createRole: async (data: CreateRoleRequest): Promise<Role> => {
    const response = await http.post('/RoleManagement/CreateRole', data);
    return response.data;
  },
  
  getRole: async (id: number): Promise<RoleDetails> => {
    const response = await http.get(`/RoleManagement/GetRole/${id}`);
    return response.data;
  },

  getModules: async (): Promise<Module[]> => {
    const response = await http.get('/RoleManagement/modules');
    return response.data;
  },

  assignPermission: async (data: AssignPermissionRequest): Promise<void> => {
    await http.post('/RoleManagement/AssignPermissionToRole', data);
  },

  removePermission: async (data: RemovePermissionRequest): Promise<void> => {
    await http.delete('/RoleManagement/RemovePermissionFromRole', { data });
  },

  assignRoleToUser: async (userId: string, roleId: number): Promise<void> => {
    await http.post('/RoleManagement/AssignRoleToUser', { userId, roleId });
  },

  removeRoleFromUser: async (userId: string, roleId: number): Promise<void> => {
    await http.delete('/RoleManagement/RemoveRoleFromUser', { data: { userId, roleId } });
  },
};