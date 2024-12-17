import React from 'react';
import { useTranslation } from 'react-i18next';
import { Building2 } from 'lucide-react';

export const CommunityManagement: React.FC = () => {
  const { t } = useTranslation('modules');

  return (
    <>
      <div className="flex items-center mb-6">
        <Building2 className="w-8 h-8 text-primary mr-3" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t('communityManagement.title')}
        </h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-300">
          {t('communityManagement.description')}
        </p>
      </div>
    </>
  );
};