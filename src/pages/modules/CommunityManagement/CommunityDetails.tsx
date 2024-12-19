import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Building2, ArrowLeft, Loader2, Plus, Dumbbell, Building, Layers } from 'lucide-react';
import { communityService } from '../../../services/community.service';
import { facilityService } from '../../../services/facility.service';
import { blockService } from '../../../services/block.service';
import { FacilityDrawer } from '../../../components/CommunityManagement/FacilityDrawer';
import { BlockDrawer } from '../../../components/CommunityManagement/BlockDrawer';
import { FloorDrawer } from '../../../components/CommunityManagement/FloorDrawer';
import { FloorList } from '../../../components/CommunityManagement/FloorList';
import { Facility } from '../../../types/facility';
import { Block } from '../../../types/block';
import { Floor } from '../../../types/floor';

export const CommunityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(['modules']);
  const [isFacilityDrawerOpen, setIsFacilityDrawerOpen] = React.useState(false);
  const [isBlockDrawerOpen, setIsBlockDrawerOpen] = React.useState(false);
  const [selectedFacility, setSelectedFacility] = React.useState<Facility>();
  const [selectedBlock, setSelectedBlock] = React.useState<Block>();
  const [selectedFloor, setSelectedFloor] = React.useState<Floor>();
  const [isFloorDrawerOpen, setIsFloorDrawerOpen] = React.useState(false);
  const [activeBlockId, setActiveBlockId] = React.useState<number | null>(null);

  const { data: community, isLoading } = useQuery({
    queryKey: ['community', id],
    queryFn: () => communityService.getCommunity(Number(id)),
    enabled: !!id,
  });

  const { data: facilities, isLoading: isLoadingFacilities } = useQuery({
    queryKey: ['facilities', Number(id)],
    queryFn: facilityService.getFacilities,
    enabled: !!id,
  });

  const { data: blocks, isLoading: isLoadingBlocks } = useQuery({
    queryKey: ['blocks'],
    queryFn: blockService.getBlocks,
  });

  const handleEdit = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsFacilityDrawerOpen(true);
  };

  const handleCloseFacilityDrawer = () => {
    setIsFacilityDrawerOpen(false);
    setSelectedFacility(undefined);
  };

  const handleEditBlock = (block: Block) => {
    setSelectedBlock(block);
    setIsBlockDrawerOpen(true);
  };

  const handleCloseBlockDrawer = () => {
    setIsBlockDrawerOpen(false);
    setSelectedBlock(undefined);
  };

  const handleEditFloor = (floor: Floor) => {
    setSelectedFloor(floor);
    setIsFloorDrawerOpen(true);
  };

  const handleCloseFloorDrawer = () => {
    setIsFloorDrawerOpen(false);
    setSelectedFloor(undefined);
  };

  const handleAddFloor = (blockId: number) => {
    setActiveBlockId(blockId);
    setIsFloorDrawerOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!community) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/communitymanagement')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <Building2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {community.name}
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Community Information
        </h3>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {community.name}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Address
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {community.address}
            </dd>
          </div>
        </dl>
      </div>

      {/* Blocks Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Blocks
            </h3>
          </div>
          <button
            onClick={() => setIsBlockDrawerOpen(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Block
          </button>
        </div>

        {isLoadingBlocks ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blocks?.items.filter(b => b.communityId === Number(id)).map((block) => (
              <div
                key={block.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    {block.name}
                  </h4>
                  <button
                    onClick={() => handleEditBlock(block)}
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {block.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Floors: {block.numberOfFloors}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <FloorList
                    blockId={block.id}
                    onEdit={handleEditFloor}
                    onAdd={() => handleAddFloor(block.id)}
                  />
                </div>

              </div>
            ))}
            {blocks?.items.filter(b => b.communityId === Number(id)).length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 col-span-2 text-center py-8">
                No blocks added yet
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Facilities Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Dumbbell className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Facilities
            </h3>
          </div>
          <button
            onClick={() => setIsFacilityDrawerOpen(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Facility
          </button>
        </div>

        {isLoadingFacilities ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facilities?.filter(f => f.communityId === Number(id)).map((facility) => (
              <div
                key={facility.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    {facility.name}
                  </h4>
                  <button
                    onClick={() => handleEdit(facility)}
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {facility.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Capacity: {facility.capacity} people
                </div>
              </div>
            ))}
            {facilities?.filter(f => f.communityId === Number(id)).length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 col-span-2 text-center py-8">
                No facilities added yet
              </p>
            )}
          </div>
        )}
      </div>

      <FacilityDrawer
        isOpen={isFacilityDrawerOpen}
        onClose={handleCloseFacilityDrawer}
        facility={selectedFacility}
        communityId={Number(id)}
      />
      <BlockDrawer
        isOpen={isBlockDrawerOpen}
        onClose={handleCloseBlockDrawer}
        block={selectedBlock}
        communityId={Number(id)}
      />
      <FloorDrawer
        isOpen={isFloorDrawerOpen}
        onClose={handleCloseFloorDrawer}
        floor={selectedFloor}
        blockId={activeBlockId!}
      />
    </div>
  );
};