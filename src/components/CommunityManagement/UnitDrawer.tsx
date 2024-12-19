import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Drawer } from '../Common/Drawer';
import { unitService } from '../../services/unit.service';
import { Unit, UnitType } from '../../types/unit';

interface UnitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  unit?: Unit;
  floorId: number;
}

export const UnitDrawer: React.FC<UnitDrawerProps> = ({
  isOpen,
  onClose,
  unit,
  floorId,
}) => {
  const { t } = useTranslation('community');
  const queryClient = useQueryClient();
  const isEditMode = !!unit;

  const [formData, setFormData] = React.useState({
    unitNumber: '',
    type: UnitType.Apartment,
  });

  React.useEffect(() => {
    if (unit) {
      setFormData({
        unitNumber: unit.unitNumber,
        type: unit.type,
      });
    } else {
      setFormData({
        unitNumber: '',
        type: UnitType.Apartment,
      });
    }
  }, [unit]);

  const { mutate: saveUnit, isLoading } = useMutation({
    mutationFn: (data: typeof formData) =>
      isEditMode
        ? unitService.updateUnit(unit.id, data)
        : unitService.createUnit({ ...data, floorId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
      toast.success(t(isEditMode ? 'unit.editSuccess' : 'unit.createSuccess'));
      onClose();
    },
    onError: () => {
      toast.error(t(isEditMode ? 'unit.editError' : 'unit.createError'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUnit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'type' ? parseInt(value) : value,
    }));
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={t(isEditMode ? 'unit.editTitle' : 'unit.createTitle')}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="unitNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('unit.numberLabel')}
          </label>
          <input
            type="text"
            id="unitNumber"
            name="unitNumber"
            value={formData.unitNumber}
            onChange={handleChange}
            className="mt-1 block w-full h-9 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white px-3"
            required
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('unit.typeLabel')}
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full h-9 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white px-3"
            required
          >
            <option value={UnitType.Apartment}>{t('unit.types.apartment')}</option>
            <option value={UnitType.Studio}>{t('unit.types.studio')}</option>
            <option value={UnitType.Penthouse}>{t('unit.types.penthouse')}</option>
          </select>
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