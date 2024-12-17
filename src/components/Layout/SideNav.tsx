import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Loader2, ChevronLeft, ChevronRight, Layout } from 'lucide-react';
import { useModules } from '../../hooks/useModules';
import { useThemeStore } from '../../store/themeStore';
import { ThemeToggle } from './ThemeToggle';
import { UserDropdown } from './UserDropdown';
import { ModuleNavItem } from './ModuleNavItem';

export const SideNav: React.FC = () => {
  const { t } = useTranslation('navigation');
  const { data: modules, isLoading } = useModules();
  const { navigation, setTheme } = useThemeStore();

  const toggleCollapsed = () => {
    setTheme({
      navigation: {
        ...navigation,
        collapsed: !navigation.collapsed,
      },
    });
  };

  const switchToTopNav = () => {
    setTheme({
      navigation: {
        type: 'top',
        collapsed: false,
      },
    });
  };

  const sidebarWidth = navigation.collapsed ? 'w-16' : 'w-64';

  return (
    <div className={`${sidebarWidth} transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg flex flex-col h-screen`}>
      {/* Logo and Toggle */}
      <div className="h-16 flex items-center justify-between px-2 border-b border-gray-200 dark:border-gray-700">
        {!navigation.collapsed && <span className="text-xl font-semibold dark:text-white">Logo</span>}
        <div className="flex items-center space-x-1">
          <button
            onClick={switchToTopNav}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title="Switch to top navigation"
          >
            <Layout className="w-5 h-5" />
          </button>
          <button
            onClick={toggleCollapsed}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title={navigation.collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {navigation.collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          </div>
        ) : (
          <nav className="space-y-1 px-2 flex flex-col">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`
              }
            >
              <LayoutDashboard className="w-5 h-5" />
              {!navigation.collapsed && <span className="ml-3">{t('dashboard')}</span>}
            </NavLink>

            {modules?.map((module) => (
              <ModuleNavItem
                key={module.id}
                module={module}
                collapsed={navigation.collapsed}
              />
            ))}
          </nav>
        )}
      </div>

      {/* Footer */}
      <div className={`border-t border-gray-200 dark:border-gray-700 p-2 mt-auto`}>
        <div className="flex flex-col space-y-2">
          <ThemeToggle />
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};