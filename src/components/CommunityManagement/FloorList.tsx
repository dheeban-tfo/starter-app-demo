import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { UnitList } from './UnitList';
import { UnitDrawer } from './UnitDrawer';
import toast from 'react-hot-toast';
import { floorService } from '../../services/floor.service';
import { Floor, Unit } from '../../types/floor';

interface FloorListProps {
  blockId: number;
  onEdit: (floor: Floor) => void;
  onAdd: () => void;
}

export const FloorList: React.FC<FloorListProps> = ({ blockId, onEdit, onAdd }) => {
  const { t } = useTranslation('community');
  const queryClient = useQueryClient();
  const [selectedFloorId, setSelectedFloorId] = React.useState<number | null>(null);
  const [isUnitDrawerOpen, setIsUnitDrawerOpen] = React.useState(false);
  const [selectedUnit, setSelectedUnit] = React.useState<Unit>();

  const { data: floors, isLoading } = useQuery({
    queryKey: ['floors'],
    queryFn: floorService.getFloors,
  });

  const { mutate: deleteFloor } = useMutation({
    mutationFn: floorService.deleteFloor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['floors'] });
      toast.success(t('floor.deleteSuccess'));
    },
    onError: () => {
      toast.error(t('floor.deleteError'));
    },
  });

  const handleDelete = async (id: number) => {
    if (window.confirm(t('floor.deleteConfirm'))) {
      deleteFloor(id);
    }
  };

  const handleEditUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setIsUnitDrawerOpen(true);
  };

  const handleAddUnit = (floorId: number) => {
    setSelectedFloorId(floorId);
    setIsUnitDrawerOpen(true);
  };

  const handleCloseUnitDrawer = () => {
    setIsUnitDrawerOpen(false);
    setSelectedUnit(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const blockFloors = floors?.items.filter(f => f.blockId === blockId) || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {t('floor.title')}
        </h3>
        <button
          onClick={onAdd}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Plus className="w-4 h-4 mr-1" />
          {t('floor.add')}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('floor.number')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('floor.units')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('common.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {blockFloors.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  {t('floor.noFloors')}
                </td>
              </tr>
            ) : (
              blockFloors.map((floor) => (
                <React.Fragment key={floor.id}>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {t('floor.floorNumber', { number: floor.floorNumber })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {floor.numberOfUnits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onEdit(floor)}
                        className="text-primary hover:text-primary/80 mr-3"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(floor.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                      <UnitList
                        floorId={floor.id}
                        onEdit={handleEditUnit}
                        onAdd={() => handleAddUnit(floor.id)}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      <UnitDrawer
        isOpen={isUnitDrawerOpen}
        onClose={handleCloseUnitDrawer}
        unit={selectedUnit}
        floorId={selectedFloorId!}
      />
    </div>
  );
};