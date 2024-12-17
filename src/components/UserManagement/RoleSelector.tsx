import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { userService } from '../../services/user.service';
import { roleService } from '../../services/role.service';

interface RoleSelectorProps {
  userId: string;
  currentRoleId?: number;
  onRoleChange?: () => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ userId, currentRoleId, onRoleChange }) => {
  const { t } = useTranslation('users');
  const queryClient = useQueryClient();

  const { data: roles, isLoading: isLoadingRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: userService.getRoles,
  });

  const { mutate: assignRole, isLoading: isAssigning } = useMutation({
    mutationFn: (roleId: number) => roleService.assignRoleToUser(userId, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries(['user-access', userId]);
      toast.success(t('roleSelector.assignSuccess'));
      onRoleChange?.();
    },
    onError: () => {
      toast.error(t('roleSelector.assignError'));
    },
  });

  const { mutate: removeRole, isLoading: isRemoving } = useMutation({
    mutationFn: (roleId: number) => roleService.removeRoleFromUser(userId, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries(['user-access', userId]);
      toast.success(t('roleSelector.removeSuccess'));
      onRoleChange?.();
    },
    onError: () => {
      toast.error(t('roleSelector.removeError'));
    },
  });

  const handleRoleChange = async (roleId: number) => {
    if (currentRoleId) {
      await removeRole(currentRoleId);
    }
    assignRole(roleId);
  };

  if (isLoadingRoles) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
        <Shield className="w-4 h-4 mr-2 text-primary" />
        {t('roleSelector.title')}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roles?.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleChange(role.id)}
            disabled={isAssigning || isRemoving || role.id === currentRoleId}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              role.id === currentRoleId
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {role.name}
          </button>
        ))}
      </div>
    </div>
  );
};