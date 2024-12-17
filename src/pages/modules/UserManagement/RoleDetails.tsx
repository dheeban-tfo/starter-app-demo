import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Loader2, Shield, ArrowLeft } from 'lucide-react';
import { roleService } from '../../../services/role.service';
import toast from 'react-hot-toast';

export const RoleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(['roles', 'modules']);
  const queryClient = useQueryClient();

  const { data: role, isLoading: isLoadingRole } = useQuery({
    queryKey: ['role', id],
    queryFn: () => roleService.getRole(Number(id)),
    enabled: !!id,
  });

  const { data: modules, isLoading: isLoadingModules } = useQuery({
    queryKey: ['modules-list'],
    queryFn: roleService.getModules,
  });

  const { mutate: assignPermission, isLoading: isAssigning } = useMutation({
    mutationFn: roleService.assignPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role', id] });
      toast.success(t('roles:permissions.assignSuccess'));
    },
    onError: () => {
      toast.error(t('roles:permissions.assignError'));
    },
  });

  const { mutate: removePermission, isLoading: isRemoving } = useMutation({
    mutationFn: roleService.removePermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role', id] });
      toast.success(t('roles:permissions.removeSuccess'));
    },
    onError: () => {
      toast.error(t('roles:permissions.removeError'));
    },
  });

  const isActionAssigned = (moduleId: number, actionId: number) => {
    return role?.roleModulePermissions.some(
      (p) => p.moduleId === moduleId && p.actionId === actionId
    );
  };

  const handlePermissionToggle = (moduleId: number, actionId: number, moduleName: string) => {
    if (!role) return;

    const isAssigned = isActionAssigned(moduleId, actionId);
    if (isAssigned) {
      removePermission({
        roleId: role.id,
        moduleId,
        actionId,
      });
    } else {
      assignPermission({
        roleId: role.id,
        moduleId,
        actionId,
        moduleName,
      });
    }
  };

  if (isLoadingRole || isLoadingModules) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!role || !modules) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/usermanagement/roles')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {role.name}
            </h2>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {t(`modules:modules.${module.name}`)}
            </h3>
            <div className="flex flex-wrap gap-3">
              {module.actions.map((action) => {
                const isAssigned = isActionAssigned(module.id, action.id);
                return (
                  <button
                    key={action.id}
                    onClick={() => handlePermissionToggle(module.id, action.id, module.name)}
                    disabled={isAssigning || isRemoving}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      isAssigned
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    } hover:opacity-90 disabled:opacity-50`}
                  >
                    {action.name}
                  </button>
                );
              })}
              {module.actions.length === 0 && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {t('modules:userManagement.modules.noActions')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};