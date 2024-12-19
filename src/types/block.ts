export interface Block {
  id: number;
  name: string;
  communityId: number;
  communityName?: string;
  numberOfFloors: number;
  description?: string;
}

export interface BlockListResponse {
  items: Block[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateBlockRequest {
  name: string;
  description: string;
  communityId: number;
  numberOfFloors: number;
}

export interface UpdateBlockRequest {
  name: string;
  description: string;
  numberOfFloors: number;
}