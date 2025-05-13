'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Workspace } from '@/types/workspace';
import { workspaceService } from '@/services/workspaceService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, Mail, MapPin, Image, Plus, AlertCircle, Calendar, ChevronRight, Trash2, Pencil, Eye } from 'lucide-react';
import { format } from 'date-fns';

export function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const data = await workspaceService.getAll();
        setWorkspaces(data);
      } catch (err) {
        setError('Failed to fetch workspaces');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this workspace?')) {
      return;
    }

    try {
      await workspaceService.delete(id);
      setWorkspaces(workspaces.filter(w => w.id !== id));
    } catch (err) {
      setError('Failed to delete workspace');
      console.error(err);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <div className="bg-destructive/10 p-4 rounded-full mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-semibold text-destructive mb-2">Error Loading Workspaces</h2>
        <p className="text-muted-foreground max-w-md mb-6">
          {error}. Please try again or contact support if the problem persists.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="gap-2"
          onClick={() => window.location.reload()}
        >
          <AlertCircle className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-card rounded-lg border shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Workspaces</h1>
          <p className="text-muted-foreground">
            Manage your advertising workspaces and their media items
          </p>
        </div>
        <Button 
          size="lg" 
          onClick={() => router.push('/workspaces/create')}
          className="gap-2 shadow-sm hover:shadow-md transition-all"
        >
          <Plus className="h-5 w-5" />
          Create Workspace
        </Button>
      </div>

      {/* Workspaces Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          // Loading skeletons with improved design
          Array(6).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden border-2">
              <CardHeader className="border-b bg-muted/50">
                <Skeleton className="h-7 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 p-4">
                <div className="flex gap-2 w-full">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 flex-1" />
                </div>
              </CardFooter>
            </Card>
          ))
        ) : workspaces.length === 0 ? (
          // Enhanced empty state
          <div className="col-span-full">
            <Card className="border-2">
              <CardContent className="flex flex-col items-center justify-center py-16 px-8">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <Building2 className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">No Workspaces Yet</h3>
                <p className="text-muted-foreground text-center max-w-md mb-8">
                  Get started by creating your first workspace to manage your advertising spaces and media items
                </p>
                <Button 
                  size="lg"
                  onClick={() => router.push('/workspaces/create')}
                  className="gap-2 shadow-sm hover:shadow-md transition-all"
                >
                  <Plus className="h-5 w-5" />
                  Create Your First Workspace
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Enhanced workspace cards
          workspaces.map((workspace) => (
            <Card 
              key={workspace.id} 
              className="group border-2 hover:border-primary/50 transition-all duration-300"
            >
              <CardHeader className="border-b bg-muted/50 p-6">
                <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center justify-between">
                  <span className="truncate">{workspace.name}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{workspace.location}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{workspace.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Image className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {workspace.mediaItems.length} media {workspace.mediaItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Updated {format(new Date(workspace.updatedAt), 'MMM d, yyyy')}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 p-4">
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => router.push(`/workspaces/${workspace.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => router.push(`/workspaces/${workspace.id}/edit`)}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 gap-2 hover:bg-destructive/90 transition-colors"
                    onClick={() => handleDelete(workspace.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 