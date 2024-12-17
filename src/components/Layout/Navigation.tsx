import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Loader2 } from 'lucide-react';
import { useModules } from '../../hooks/useModules';
import { useThemeStore } from '../../store/themeStore';
import { ModuleNavItem } from './ModuleNavItem';

export const Navigation: React.FC = () => {
  const { t } = useTranslation('navigation');
  const { data: modules, isLoading } = useModules();
  const { navigation } = useThemeStore();
  const isTopNav = navigation.type === 'top';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <nav className="flex space-x-4">
      <div className="flex items-center space-x-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              isActive
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 mr-2" />
          <span>{t('dashboard')}</span>
        </NavLink>

        {modules?.map((module) => 
          <ModuleNavItem key={module.id} module={module} collapsed={false} isTopNav={true} />
        )}
      </div>
    </nav>
  );
};