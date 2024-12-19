import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Drawer } from '../Common/Drawer';
import { floorService } from '../../services/floor.service';
import { Floor } from '../../types/floor';

interface FloorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  floor?: Floor;
  blockId: number;
}

export const FloorDrawer: React.FC<FloorDrawerProps> = ({
  isOpen,
  onClose,
  floor,
  blockId,
}) => {
  const { t } = useTranslation('community');
  const queryClient = useQueryClient();
  const isEditMode = !!floor;

  const [floorNumber, setFloorNumber] = React.useState(0);

  React.useEffect(() => {
    if (floor) {
      setFloorNumber(floor.floorNumber);
    } else {
      setFloorNumber(0);
    }
  }, [floor]);

  const { mutate: saveFloor, isLoading } = useMutation({
    mutationFn: (data: { floorNumber: number }) =>
      isEditMode
        ? floorService.updateFloor(floor.id, data)
        : floorService.createFloor({ ...data, blockId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['floors'] });
      toast.success(t(isEditMode ? 'floor.editSuccess' : 'floor.createSuccess'));
      onClose();
    },
    onError: () => {
      toast.error(t(isEditMode ? 'floor.editError' : 'floor.createError'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveFloor({ floorNumber });
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={t(isEditMode ? 'floor.editTitle' : 'floor.createTitle')}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="floorNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('floor.numberLabel')}
          </label>
          <input
            type="number"
            id="floorNumber"
            value={floorNumber}
            onChange={(e) => setFloorNumber(parseInt(e.target.value) || 0)}
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