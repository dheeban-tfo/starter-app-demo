import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Plus, Pencil, Trash2, Home } from 'lucide-react';
import toast from 'react-hot-toast';
import { unitService } from '../../services/unit.service';
import { Unit, UnitType } from '../../types/unit';

interface UnitListProps {
  floorId: number;
  onEdit: (unit: Unit) => void;
  onAdd: () => void;
}

export const UnitList: React.FC<UnitListProps> = ({ floorId, onEdit, onAdd }) => {
  const { t } = useTranslation('community');
  const queryClient = useQueryClient();

  const { data: units, isLoading } = useQuery({
    queryKey: ['units'],
    queryFn: unitService.getUnits,
  });

  const { mutate: deleteUnit } = useMutation({
    mutationFn: unitService.deleteUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
      toast.success(t('unit.deleteSuccess'));
    },
    onError: () => {
      toast.error(t('unit.deleteError'));
    },
  });

  const handleDelete = async (id: number) => {
    if (window.confirm(t('unit.deleteConfirm'))) {
      deleteUnit(id);
    }
  };

  const getUnitTypeName = (type: UnitType): string => {
    switch (type) {
      case UnitType.Apartment:
        return t('unit.types.apartment');
      case UnitType.Studio:
        return t('unit.types.studio');
      case UnitType.Penthouse:
        return t('unit.types.penthouse');
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const floorUnits = units?.items.filter(u => u.floorId === floorId) || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Home className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {t('unit.title')}
          </h3>
        </div>
        <button
          onClick={onAdd}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Plus className="w-4 h-4 mr-1" />
          {t('unit.add')}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('unit.number')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('unit.type')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('common.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {floorUnits.map((unit) => (
              <tr key={unit.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {unit.unitNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {getUnitTypeName(unit.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(unit)}
                    className="text-primary hover:text-primary/80 mr-3"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(unit.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {floorUnits.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  {t('unit.noUnits')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}