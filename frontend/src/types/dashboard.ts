export interface DashboardStats {
  totalWorkspaces: number;
  totalMediaItems: number;
  recentWorkspaces: Array<{
    id: number;
    name: string;
    location: string;
    mediaCount: number;
  }>;
  recentMediaItems: Array<{
    id: number;
    customId: string;
    name: string;
    type: 'STATIC_BILLBOARD' | 'STREET_POLE';
    workspaceName: string;
  }>;
} 