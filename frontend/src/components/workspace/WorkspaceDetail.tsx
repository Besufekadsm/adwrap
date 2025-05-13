import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Workspace } from '@/types/workspace';
import { workspaceService } from '@/services/workspaceService';
import { Button } from '@/components/ui/button';

interface WorkspaceDetailProps {
  id: number;
}

export function WorkspaceDetail({ id }: WorkspaceDetailProps) {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const data = await workspaceService.getById(id);
        setWorkspace(data);
      } catch (err) {
        setError('Failed to fetch workspace');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this workspace?')) {
      return;
    }

    try {
      await workspaceService.delete(id);
      router.push('/workspaces');
    } catch (err) {
      setError('Failed to delete workspace');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!workspace) {
    return <div>Workspace not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{workspace.name}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/workspaces/${id}/edit`)}
          >
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Details</h2>
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {workspace.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Location:</span> {workspace.location}
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Media Items</h2>
          {workspace.mediaItems.length === 0 ? (
            <p className="text-gray-600">No media items yet</p>
          ) : (
            <ul className="space-y-2">
              {workspace.mediaItems.map((item) => (
                <li
                  key={item.id}
                  className="p-2 border rounded hover:bg-gray-50"
                >
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.type} - {item.customId}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 