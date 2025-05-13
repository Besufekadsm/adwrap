import { useState } from 'react';
import { useRouter } from 'next/router';
import { WorkspaceForm } from '@/components/workspace/WorkspaceForm';
import { workspaceService } from '@/services/workspaceService';
import { CreateWorkspaceInput } from '@/types/workspace';

export default function CreateWorkspacePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: CreateWorkspaceInput) => {
    try {
      setIsSubmitting(true);
      await workspaceService.create(data);
      router.push('/workspaces');
    } catch (error) {
      console.error('Failed to create workspace:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create Workspace</h1>
      <WorkspaceForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
} 