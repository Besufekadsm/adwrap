export interface Workspace {
  id: number;
  name: string;
  email: string;
  location: string;
  mediaItems: MediaItem[];
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: number;
  customId: string;
  type: MediaType;
  name: string;
  workspaceId: number;
  faces?: StaticMediaFace[];
  routes?: Route[];
  createdAt: string;
  updatedAt: string;
}

export interface StaticMediaFace {
  id: number;
  faceNumber: number;
  width: number;
  height: number;
  mediaItemId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: number;
  routeName: string;
  mediaItemId: number;
  createdAt: string;
  updatedAt: string;
}

export enum MediaType {
  STATIC_BILLBOARD = 'STATIC_BILLBOARD',
  STREET_POLE = 'STREET_POLE',
}

export interface CreateWorkspaceInput {
  name: string;
  email: string;
  location: string;
}

export interface UpdateWorkspaceInput extends Partial<CreateWorkspaceInput> {
  id: number;
}

export interface CreateMediaItemInput {
  name: string;
  type: MediaType;
  workspaceId: number;
  staticMediaFaces?: {
    faceNumber: number;
    width: number;
    height: number;
  }[];
  routes?: {
    routeName: string;
  }[];
}

export interface UpdateMediaItemInput extends Partial<CreateMediaItemInput> {
  id: number;
} 