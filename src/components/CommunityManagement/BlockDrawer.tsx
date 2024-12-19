import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Drawer } from '../Common/Drawer';
import { blockService } from '../../services/block.service';
import { Block } from '../../types/block';

interface BlockDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  block?: Block;
  communityId: number;
}

export const BlockDrawer: React.FC<BlockDrawerProps> = ({
  isOpen,
  onClose,
  block,
  communityId,
}) => {
  const { t } = useTranslation('community');
  const queryClient = useQueryClient();
  const isEditMode = !!block;

  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    numberOfFloors: 0,
  });

  React.useEffect(() => {
    if (block) {
      setFormData({
        name: block.name,
        description: block.description || '',
        numberOfFloors: block.numberOfFloors,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        numberOfFloors: 0,
      });
    }
  }, [block]);

  const { mutate: saveBlock, isLoading } = useMutation({
    mutationFn: (data: typeof formData) =>
      isEditMode
        ? blockService.updateBlock(block.id, data)
        : blockService.createBlock({ ...data, communityId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocks'] });
      toast.success(t(isEditMode ? 'block.editSuccess' : 'block.createSuccess'));
      onClose();
    },
    onError: () => {
      toast.error(t(isEditMode ? 'block.editError' : 'block.createError'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveBlock(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={t(isEditMode ? 'block.editTitle' : 'block.createTitle')}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('block.nameLabel')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full h-9 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white px-3"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('block.descriptionLabel')}
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white p-3"
          />
        </div>

        <div>
          <label
            htmlFor="numberOfFloors"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('block.floorsLabel')}
          </label>
          <input
            type="number"
            id="numberOfFloors"
            name="numberOfFloors"
            value={formData.numberOfFloors}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full h-9 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white px-3"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md border border-gray-300 dark:border-gray-600"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
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
}