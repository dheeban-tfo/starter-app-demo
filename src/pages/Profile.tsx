import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProfileCard } from '../components/Profile/ProfileCard';
import { PermissionsCard } from '../components/Profile/PermissionsCard';
import { ThemeSettings } from '../components/Profile/ThemeSettings';
import { profileService } from '../services/profile.service';

export const Profile: React.FC = () => {
  const { t } = useTranslation('profile');
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
    retry: 1,
  });

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-200">
                {t('error.loading')}
              </p>
            </div>
          </div>
        </div>
      )}

      {profile && (
        <div className="space-y-6">
          <ProfileCard profile={profile} />
          <ThemeSettings />
          <PermissionsCard profile={profile} />
        </div>
      )}
    </>
  );
};