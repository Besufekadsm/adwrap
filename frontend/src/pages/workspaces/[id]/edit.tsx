import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { WorkspaceForm } from '@/components/workspace/WorkspaceForm';
import { workspaceService } from '@/services/workspaceService';
import { UpdateWorkspaceInput } from '@/types/workspace';

export default function EditWorkspacePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState<UpdateWorkspaceInput | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchWorkspace = async () => {
      if (!id) return;
      try {
        const workspace = await workspaceService.getById(Number(id));
        setInitialData(workspace);
      } catch (error) {
        console.error('Failed to fetch workspace:', error);
        router.push('/workspaces');
      }
    };

    fetchWorkspace();
  }, [id, router]);

  const handleSubmit = async (data: { name: string; email: string; location: string }) => {
    if (!id) return;
    try {
      setIsSubmitting(true);
      await workspaceService.update({ ...data, id: Number(id) });
      router.push('/workspaces');
    } catch (error) {
      console.error('Failed to update workspace:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Workspace</h1>
      <WorkspaceForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
} 