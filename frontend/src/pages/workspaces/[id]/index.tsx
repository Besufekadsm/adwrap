import { useRouter } from 'next/router';
import { WorkspaceDetail } from '@/components/workspace/WorkspaceDetail';

export default function WorkspaceDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <WorkspaceDetail id={Number(id)} />
    </div>
  );
} 