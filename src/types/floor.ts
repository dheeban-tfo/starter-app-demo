export interface Floor {
  id: number;
  floorNumber: number;
  blockId: number;
  blockName?: string;
  numberOfUnits: number;
}

export interface FloorListResponse {
  items: Floor[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateFloorRequest {
  floorNumber: number;
  blockId: number;
}

export interface UpdateFloorRequest {
  floorNumber: number;
}