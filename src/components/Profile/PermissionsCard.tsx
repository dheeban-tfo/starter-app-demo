import React from 'react';
import { useTranslation } from 'react-i18next';
import { Profile } from '../../types/profile';

interface PermissionsCardProps {
  profile: Profile;
}

export const PermissionsCard: React.FC<PermissionsCardProps> = ({ profile }) => {
  const { t } = useTranslation('profile');

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {t('permissions')}
      </h2>
      
      <div className="space-y-6">
        {Object.entries(profile.modulePermissions).map(([module, permissions]) => (
          <div key={module}>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {module}
            </h3>
            <div className="flex flex-wrap gap-2">
              {permissions.map((permission) => (
                <span
                  key={`${module}-${permission}`}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                >
                  {permission}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};