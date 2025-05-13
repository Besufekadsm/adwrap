'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Workspace } from '@/types/workspace';
import { workspaceService } from '@/services/workspaceService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Mail, MapPin, AlertCircle, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { MediaTable } from '@/components/workspace/MediaTable';

export default function WorkspaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      if (!params?.id) return;
      
      try {
        const data = await workspaceService.getById(Number(params.id));
        setWorkspace(data);
      } catch (err) {
        setError('Failed to fetch workspace');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [params?.id]);

  const handleDelete = async () => {
    if (!params?.id) return;
    if (!confirm('Are you sure you want to delete this workspace?')) {
      return;
    }

    try {
      await workspaceService.delete(Number(params.id));
      router.push('/workspaces');
    } catch (err) {
      setError('Failed to delete workspace');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-48 bg-muted rounded" />
            <div className="h-48 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
          <div className="bg-destructive/10 p-4 rounded-full mb-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <h2 className="text-2xl font-semibold text-destructive mb-2">Error Loading Workspace</h2>
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
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Workspace Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The workspace you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push('/workspaces')}>
            Back to Workspaces
          </Button>
        </div>
      </div>
    );
  }

  const staticMediaItems = workspace.mediaItems.filter(item => item.type === 'STATIC_BILLBOARD');
  const streetPoleItems = workspace.mediaItems.filter(item => item.type === 'STREET_POLE');

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{workspace.name}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{workspace.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{workspace.email}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => router.push(`/workspaces/${workspace.id}/edit`)}
          >
            <Pencil className="h-4 w-4" />
            Edit Workspace
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="gap-2"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete Workspace
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Media Items</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workspace.mediaItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Static Billboards</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staticMediaItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Street Poles</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streetPoleItems.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Media Items Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Media Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Media</TabsTrigger>
              <TabsTrigger value="static">Static Billboards</TabsTrigger>
              <TabsTrigger value="street">Street Poles</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <MediaTable items={workspace.mediaItems} />
            </TabsContent>
            <TabsContent value="static" className="space-y-4">
              <MediaTable items={staticMediaItems} />
            </TabsContent>
            <TabsContent value="street" className="space-y-4">
              <MediaTable items={streetPoleItems} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 