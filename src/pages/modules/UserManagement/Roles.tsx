import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Loader2, Shield, Plus } from 'lucide-react';
import { userService } from '../../../services/user.service';
import { CreateRoleDrawer } from '../../../components/UserManagement/CreateRoleDrawer';

export const Roles: React.FC = () => {
  const { t } = useTranslation('modules');
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { data: roles, isLoading, refetch } = useQuery({ 
    queryKey: ['roles'],
    queryFn: userService.getRoles,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('userManagement.roles.title')}
          </h2>
        </div>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('userManagement.roles.create')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles?.map((role) => (
          <div
            onClick={() => navigate(`/usermanagement/roles/${role.id}`)}
            key={role.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {role.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
      
      <CreateRoleDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          refetch();
        }}
      />
    </div>
  );
};