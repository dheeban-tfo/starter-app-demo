export interface Facility {
  id: number;
  name: string;
  description: string;
  capacity: number;
  communityId: number;
}

export interface CreateFacilityRequest {
  name: string;
  description: string;
  capacity: number;
  communityId: number;
}

export interface UpdateFacilityRequest {
  name: string;
  description: string;
  capacity: number;
  communityId: number;
}