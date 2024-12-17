import { useQuery } from '@tanstack/react-query';
import { moduleService } from '../services/module.service';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';
import { Module } from '../types/module';

const extractModulePermissions = (claims: Record<string, unknown> = {}) => {
  return Object.entries(claims)
    .filter(([key]) => key.includes('-'))
    .reduce((acc, [key, value]) => {
      const moduleName = key.split('-')[1];
      acc[moduleName] = value as string[];
      return acc;
    }, {} as Record<string, string[]>);
};

const filterModulesByPermissions = (
  modules: Module[],
  permissions: Record<string, string[]>
) => {
  return modules.filter(module => {
    const modulePermissions = permissions[module.name];
    return modulePermissions && modulePermissions.includes('Read');
  });
};

export const useModules = () => {
  const { user } = useAuthStore();
  const query = useQuery({
    queryKey: ['modules'],
    queryFn: moduleService.getModules,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    select: (modules) => {
      if (!user?.claims) return [];
      const modulePermissions = extractModulePermissions(user.claims);
      return filterModulesByPermissions(modules, modulePermissions);
    },
  });
  
  // Refetch modules when user changes
  useEffect(() => {
    if (user) query.refetch();
  }, [user, query.refetch]);

  return { data: query.data, isLoading: query.isLoading };
};