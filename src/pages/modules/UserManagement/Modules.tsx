import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Loader2, Boxes } from 'lucide-react';
import { moduleService } from '../../../services/module.service';

export const Modules: React.FC = () => {
  const { t } = useTranslation('modules');
  const { data: modules, isLoading } = useQuery({
    queryKey: ['modules-list'],
    queryFn: moduleService.getModules,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Boxes className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('userManagement.modules.title')}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules?.map((module) => (
          <div
            key={module.id}
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Boxes className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {module.name}
                </h3>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('userManagement.modules.actions')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {module.actions.map((action) => (
                  <span
                    key={action.id}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                  >
                    {action.name}
                  </span>
                ))}
                {module.actions.length === 0 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t('userManagement.modules.noActions')}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};