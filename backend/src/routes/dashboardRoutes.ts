import { Router, Request, Response } from 'express';
import { prisma } from '../lib/db.js';
import asyncHandler from 'express-async-handler';

const router = Router();

// Get dashboard statistics
router.get(
  '/stats',
  asyncHandler(async (_req: Request, res: Response) => {
    // Get total counts
    const [totalWorkspaces, totalMediaItems] = await Promise.all([
      prisma.workspace.count(),
      prisma.mediaItem.count(),
    ]);

    // Get recent workspaces with media count
    const recentWorkspaces = await prisma.workspace.findMany({
      take: 3,
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: { mediaItems: true },
        },
      },
    });

    // Get recent media items with workspace info
    const recentMediaItems = await prisma.mediaItem.findMany({
      take: 3,
      orderBy: { updatedAt: 'desc' },
      include: {
        workspace: {
          select: { name: true },
        },
      },
    });

    // Format the response
    const stats = {
      totalWorkspaces,
      totalMediaItems,
      recentWorkspaces: recentWorkspaces.map(workspace => ({
        id: workspace.id,
        name: workspace.name,
        location: workspace.location,
        mediaCount: workspace._count.mediaItems,
      })),
      recentMediaItems: recentMediaItems.map(item => ({
        id: item.id,
        customId: item.customId,
        name: item.name,
        type: item.type,
        workspaceName: item.workspace.name,
      })),
    };

    res.json(stats);
  })
);

export default router; 