import { MediaItem, CreateMediaItemInput, UpdateMediaItemInput } from '@/types/workspace';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const mediaService = {
  async getAll(workspaceId: number): Promise<MediaItem[]> {
    const response = await fetch(`${API_URL}/api/media?workspace_id=${workspaceId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch media items');
    }
    return response.json();
  },

  async getById(id: number): Promise<MediaItem> {
    const response = await fetch(`${API_URL}/api/media/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch media item');
    }
    return response.json();
  },

  async create(data: CreateMediaItemInput): Promise<MediaItem> {
    const response = await fetch(`${API_URL}/api/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create media item');
    }
    return response.json();
  },

  async update(data: UpdateMediaItemInput): Promise<MediaItem> {
    const response = await fetch(`${API_URL}/api/media/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update media item');
    }
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/api/media/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete media item');
    }
  },
}; 