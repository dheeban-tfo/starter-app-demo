import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Drawer } from '../Common/Drawer';
import { communityService } from '../../services/community.service';

interface CreateCommunityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  address: string;
}

const initialFormData: FormData = {
  name: '',
  address: '',
};

export const CreateCommunityDrawer: React.FC<CreateCommunityDrawerProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('community');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const queryClient = useQueryClient();

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: communityService.createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      toast.success(t('createCommunity.success'));
      onClose();
      setFormData(initialFormData);
    },
    onError: () => {
      toast.error(t('createCommunity.error'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCommunity(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== '');
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={t('createCommunity.title')}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('createCommunity.nameLabel')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white px-3"
            placeholder={t('createCommunity.namePlaceholder')}
            required
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('createCommunity.addressLabel')}
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white p-3"
            placeholder={t('createCommunity.addressPlaceholder')}
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
            disabled={isLoading || !isFormValid()}
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