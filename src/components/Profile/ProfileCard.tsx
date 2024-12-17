import React from 'react';
import { useTranslation } from 'react-i18next';
import { Profile } from '../../types/profile';

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const { t } = useTranslation('profile');

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {t('personalInfo')}
      </h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('name')}
          </h3>
          <p className="mt-1 text-lg text-gray-900 dark:text-white">
            {profile.firstName} {profile.lastName}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('email')}
          </h3>
          <p className="mt-1 text-lg text-gray-900 dark:text-white">
            {profile.email}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('roles')}
          </h3>
          <div className="mt-1 space-x-2">
            {profile.roles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};