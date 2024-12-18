import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { Community } from '../../types/community';

interface CommunityFormProps {
  onSubmit: (data: Partial<Community>) => void;
  initialData?: Community;
  isLoading?: boolean;
}

export const CommunityForm: React.FC<CommunityFormProps> = ({
  onSubmit,
  initialData,
  isLoading,
}) => {
  const { t } = useTranslation('community');
  const [formData, setFormData] = React.useState<Partial<Community>>(() => ({
    id: initialData?.id,
    name: initialData?.name || '',
    address: initialData?.address || '',
    isActive: initialData?.isActive ?? true,
  }));

  React.useEffect(() => {
    setFormData({
      id: initialData?.id,
      name: initialData?.name || '',
      address: initialData?.address || '',
      isActive: initialData?.isActive ?? true,
    });
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('form.nameLabel')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white px-3"
          placeholder={t('form.namePlaceholder')}
          required
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('form.addressLabel')}
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white p-3"
          placeholder={t('form.addressPlaceholder')}
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label
          htmlFor="isActive"
          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
        >
          {t('form.activeLabel')}
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          disabled={isLoading}
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
  );
};