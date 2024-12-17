export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface RoleModulePermission {
  roleId: number;
  moduleId: number;
  actionId: number;
  moduleName: string;
}

export interface RoleDetails extends Role {
  roleModulePermissions: RoleModulePermission[];
}