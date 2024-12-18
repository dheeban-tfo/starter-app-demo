import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Building2, Loader2 } from 'lucide-react';
import { communityService } from '../../../services/community.service';

export const Communities: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['modules']);
  
  const { data: communities, isLoading } = useQuery({
    queryKey: ['communities'],
    queryFn: communityService.getCommunities,
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Building2 className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('modules.CommunityManagement')}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {communities?.map((community) => (
          <div
            key={community.id}
            onClick={() => navigate(`/communitymanagement/${community.id}`)}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Building2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {community.name}
              </h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {community.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};