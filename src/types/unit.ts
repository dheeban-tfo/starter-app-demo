export interface Unit {
  id: number;
  unitNumber: string;
  type: UnitType;
  floorId: number;
  floorNumber: string;
}

export enum UnitType {
  Apartment = 0,
  Studio = 1,
  Penthouse = 2,
}

export interface UnitListResponse {
  items: Unit[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateUnitRequest {
  unitNumber: string;
  type: UnitType;
  floorId: number;
}

export interface UpdateUnitRequest {
  unitNumber: string;
  type: UnitType;
}