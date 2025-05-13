import { DashboardStats } from '@/types/dashboard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_URL}/api/dashboard/stats`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard statistics');
    }

    return response.json();
  }
}; 