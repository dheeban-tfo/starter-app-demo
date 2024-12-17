import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Loader2, User, ArrowLeft, Shield } from 'lucide-react';
import { userService } from '../../../services/user.service';
import { RoleSelector } from '../../../components/UserManagement/RoleSelector';

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(['modules']);
  const queryClient = useQueryClient();

  const { data: userAccess, isLoading } = useQuery({
    queryKey: ['user-access', id],
    queryFn: () => userService.getUserAccess(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!userAccess) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/usermanagement/users')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {userAccess.firstName} {userAccess.lastName}
            </h2>
          </div>
        </div>
      </div>

      {/* User Info Card */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {t('userManagement.users.title')}
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('userManagement.users.email')}
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {userAccess.email}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <RoleSelector
            userId={id!}
            currentRoleId={userAccess.roles[0]?.roleId}
            onRoleChange={() => {
              // Refetch user access data after role change
              queryClient.invalidateQueries(['user-access', id]);
            }}
          />
        </div>
      </div>

      {/* Roles and Permissions */}
      {userAccess.roles.map((role) => (
        <div key={role.roleId} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {role.roleName}
            </h3>
          </div>

          <div className="space-y-4">
            {Object.entries(
              role.permissions.reduce((acc, curr) => {
                const key = curr.moduleId;
                if (!acc[key]) {
                  acc[key] = [];
                }
                acc[key].push(curr.actionId);
                return acc;
              }, {} as Record<number, number[]>)
            ).map(([moduleId, actionIds]) => (
              <div key={moduleId} className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t(`modules.${moduleId === '1' ? 'UserManagement' : 
                      moduleId === '2' ? 'CommunityManagement' :
                      moduleId === '3' ? 'FacilityManagement' : 'FacilityBooking'}`)}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {actionIds.map((actionId) => (
                    <span
                      key={actionId}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {actionId === 1 ? 'Create' :
                       actionId === 2 ? 'Read' :
                       actionId === 3 ? 'Update' :
                       actionId === 4 ? 'Delete' :
                       actionId === 5 ? 'Export' :
                       actionId === 6 ? 'BulkUpdate' :
                       actionId === 7 ? 'Print' : 'AssignManager'}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};