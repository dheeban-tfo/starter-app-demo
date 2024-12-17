import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { getModuleIcon } from '../../utils/moduleIcons';
import { Module } from '../../types/module';

interface ModuleNavItemProps {
  module: Module;
  collapsed: boolean;
  isTopNav?: boolean;
}

export const ModuleNavItem: React.FC<ModuleNavItemProps> = ({ module, collapsed, isTopNav }) => {
  const { t } = useTranslation('navigation');
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const subItems = React.useMemo(() => {
    switch (module.name) {
      case 'UserManagement':
        return [
          { path: 'users', label: t('modules.UserManagement.users') },
          { path: 'roles', label: t('modules.UserManagement.roles') },
          { path: 'modules', label: t('modules.UserManagement.modules') },
        ];
        break;
      default:
        return [];
    }
  }, [module.name, t]);

  const basePath = `/${module.name.toLowerCase()}`;
  const isActive = location.pathname.startsWith(basePath);

  if (!subItems.length) {
    return (
      <NavLink
        to={basePath}
        className={({ isActive }) =>
          `flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`
        }
      >
        {getModuleIcon(module.name)}
        {!collapsed && <span className="ml-3">{t(`modules.${module.name}`)}</span>}
      </NavLink>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        }`}
      >
        <div className="flex items-center flex-1">
          {getModuleIcon(module.name)}
          {!collapsed && (
            <>
              <span className="ml-3 flex-1">{t(`modules.${module.name}`)}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </>
          )}
        </div>
      </button>

      {isOpen && (
        <div
          className={`${
            isTopNav ? 'absolute left-0 top-full mt-1' :
            collapsed ? 'absolute left-full top-0 ml-2' :
            'relative mt-1'
          } min-w-[200px] py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-[100]`}
        >
          {subItems.map((item) => (
            <NavLink
              key={item.path}
              to={`${basePath}/${item.path}`}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};