import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';

export const WelcomeCard: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const { user } = useAuthStore();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-5 py-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {t('welcome')} {user?.name}!
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {t('role')}: <span className="font-medium">{user?.role}</span>
      </p>
    </div>
  );
};