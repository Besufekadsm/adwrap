import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/db.js';
import { AppError } from '../middleware/errorHandler.js';
import asyncHandler from 'express-async-handler';

const router = Router();

// Validation schemas
const createWorkspaceSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  location: z.string().min(1),
});

const updateWorkspaceSchema = createWorkspaceSchema.partial();

// Get all workspaces
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const workspaces = await prisma.workspace.findMany({
      include: {
        mediaItems: true,
      },
    });
    res.json(workspaces);
  })
);

// Get workspace by ID
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const workspace = await prisma.workspace.findUnique({
      where: { id: Number(id) },
      include: {
        mediaItems: true,
      },
    });

    if (!workspace) {
      throw new AppError(404, 'Workspace not found');
    }

    res.json(workspace);
  })
);

// Create workspace
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const data = createWorkspaceSchema.parse(req.body);
    const workspace = await prisma.workspace.create({
      data,
    });
    res.status(201).json(workspace);
  })
);

// Update workspace
router.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = updateWorkspaceSchema.parse(req.body);

    const workspace = await prisma.workspace.update({
      where: { id: Number(id) },
      data,
    });

    res.json(workspace);
  })
);

// Delete workspace
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.workspace.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  })
);

export default router; 