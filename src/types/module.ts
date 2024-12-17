export interface ModuleAction {
  id: number;
  name: string;
}

export interface Module {
  id: number;
  name: string;
  actions: ModuleAction[];
}

export interface ModulePermissions {
  [key: string]: string[];
}