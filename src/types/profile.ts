export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  modulePermissions: {
    [key: string]: string[];
  };
}