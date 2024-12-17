import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Drawer } from '../Common/Drawer';
import { roleService } from '../../services/role.service';

interface CreateRoleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRoleDrawer: React.FC<CreateRoleDrawerProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('roles');
  const [roleName, setRoleName] = useState('');
  const queryClient = useQueryClient();

  const { mutate: createRole, isLoading } = useMutation({
    mutationFn: roleService.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success(t('createRole.success'));
      onClose();
      setRoleName('');
    },
    onError: (error) => {
      toast.error(t('createRole.error'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim()) return;
    createRole({ name: roleName });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={t('createRole.title')}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="roleName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('createRole.nameLabel')}
          </label>
          <input
            type="text"
            id="roleName"
            name="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="mt-1 block w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white px-3"
            placeholder={t('createRole.namePlaceholder')}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            disabled={isLoading || !roleName.trim()}
            className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                {t('common.saving')}
              </>
            ) : (
              t('common.save')
            )}
          </button>
        </div>
      </form>
    </Drawer>
  );
};