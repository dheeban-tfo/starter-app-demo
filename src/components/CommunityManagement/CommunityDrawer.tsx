import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Drawer } from '../Common/Drawer';
import { CommunityForm } from './CommunityForm';
import { communityService } from '../../services/community.service';
import { Community } from '../../types/community';

interface CommunityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  community?: Community;
}

export const CommunityDrawer: React.FC<CommunityDrawerProps> = ({
  isOpen,
  onClose,
  community,
}) => {
  const { t } = useTranslation('community');
  const queryClient = useQueryClient();
  const isEditMode = !!community;

  const { mutate: saveCommunity, isLoading } = useMutation({
    mutationFn: (data: Partial<Community>) =>
      isEditMode
        ? communityService.updateCommunity(community.id, data)
        : communityService.createCommunity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      toast.success(t(isEditMode ? 'editCommunity.success' : 'createCommunity.success'));
      onClose();
    },
    onError: () => {
      toast.error(t(isEditMode ? 'editCommunity.error' : 'createCommunity.error'));
    },
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={t(isEditMode ? 'editCommunity.title' : 'createCommunity.title')}
    >
      <CommunityForm
        onSubmit={saveCommunity}
        initialData={community}
        isLoading={isLoading}
      />
    </Drawer>
  );
};