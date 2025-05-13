'use client';

import { Workspace } from '@/types/workspace';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Mail, MapPin } from 'lucide-react';

interface WorkspaceDetailProps {
  workspace: Workspace;
}

export function WorkspaceDetail({ workspace }: WorkspaceDetailProps) {
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Workspace Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>Name</span>
              </div>
              <p className="font-medium">{workspace.name}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </div>
              <p className="font-medium">{workspace.email}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Location</span>
              </div>
              <p className="font-medium">{workspace.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Items */}
      <Card>
        <CardHeader>
          <CardTitle>Media Items</CardTitle>
        </CardHeader>
        <CardContent>
          {workspace.mediaItems.length === 0 ? (
            <p className="text-muted-foreground">No media items found</p>
          ) : (
            <ul className="space-y-4">
              {workspace.mediaItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.type} - {item.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.status === 'ACTIVE' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 