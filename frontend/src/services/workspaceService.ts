import { Workspace, CreateWorkspaceInput, UpdateWorkspaceInput } from '@/types/workspace';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const workspaceService = {
  async getAll(): Promise<Workspace[]> {
    const response = await fetch(`${API_URL}/api/workspaces`);
    if (!response.ok) {
      throw new Error('Failed to fetch workspaces');
    }
    return response.json();
  },

  async getById(id: number): Promise<Workspace> {
    const response = await fetch(`${API_URL}/api/workspaces/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch workspace');
    }
    return response.json();
  },

  async create(data: CreateWorkspaceInput): Promise<Workspace> {
    const response = await fetch(`${API_URL}/api/workspaces`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create workspace');
    }
    return response.json();
  },

  async update(data: UpdateWorkspaceInput): Promise<Workspace> {
    const response = await fetch(`${API_URL}/api/workspaces/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update workspace');
    }
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/api/workspaces/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete workspace');
    }
  },
}; 