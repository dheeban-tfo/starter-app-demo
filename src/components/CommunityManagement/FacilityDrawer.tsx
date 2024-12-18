import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Drawer } from '../Common/Drawer';
import { facilityService } from '../../services/facility.service';
import { Facility } from '../../types/facility';

interface FacilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  facility?: Facility;
  communityId: number;
}

export const FacilityDrawer: React.FC<FacilityDrawerProps> = ({
  isOpen,
  onClose,
  facility,
  communityId,
}) => {
  const { t } = useTranslation('community');
  const queryClient = useQueryClient();
  const isEditMode = !!facility;

  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    capacity: 0,
  });

  React.useEffect(() => {
    if (facility) {
      setFormData({
        name: facility.name,
        description: facility.description,
        capacity: facility.capacity,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        capacity: 0,
      });
    }
  }, [facility]);

  const { mutate: saveFacility, isLoading } = useMutation({
    mutationFn: (data: typeof formData) =>
      isEditMode
        ? facilityService.updateFacility(facility.id, { ...data, communityId })
        : facilityService.createFacility({ ...data, communityId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities', communityId] });
      toast.success(t(isEditMode ? 'facility.editSuccess' : 'facility.createSuccess'));
      onClose();
    },
    onError: () => {
      toast.error(t(isEditMode ? 'facility.editError' : 'facility.createError'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveFacility(formData);
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
      title={t(isEditMode ? 'facility.editTitle' : 'facility.createTitle')}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('facility.nameLabel')}
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
            {t('facility.descriptionLabel')}
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white p-3"
            required
          />
        </div>

        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('facility.capacityLabel')}
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
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