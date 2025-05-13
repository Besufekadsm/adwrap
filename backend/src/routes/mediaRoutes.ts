import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/db.js';
import { AppError } from '../middleware/errorHandler.js';
import asyncHandler from 'express-async-handler';
import { MediaType } from '@prisma/client';

const router = Router();

// Validation schemas
const staticMediaFaceSchema = z.object({
  faceNumber: z.number().int().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
});

const routeSchema = z.object({
  routeName: z.string().min(1),
});

const createMediaItemSchema = z.object({
  name: z.string().min(1),
  type: z.enum([MediaType.STATIC_BILLBOARD, MediaType.STREET_POLE]),
  workspaceId: z.number().int().positive(),
  staticMediaFaces: z.array(staticMediaFaceSchema).optional(),
  routes: z.array(routeSchema).optional(),
});

// Helper function to generate custom ID
async function generateCustomId(workspaceId: number, type: MediaType): Promise<string> {
  const prefix = type === MediaType.STATIC_BILLBOARD ? 'BB' : 'SP';
  const lastItem = await prisma.mediaItem.findFirst({
    where: {
      workspaceId,
      type,
    },
    orderBy: {
      customId: 'desc',
    },
  });

  if (!lastItem) {
    return `${prefix}-1`;
  }

  const lastNumber = parseInt(lastItem.customId.split('-')[1]);
  return `${prefix}-${lastNumber + 1}`;
}

// Get media items by workspace
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { workspace_id } = req.query;
    if (!workspace_id) {
      throw new AppError(400, 'Workspace ID is required');
    }

    const mediaItems = await prisma.mediaItem.findMany({
      where: {
        workspaceId: Number(workspace_id),
      },
      include: {
        faces: true,
        routes: true,
      },
    });

    res.json(mediaItems);
  })
);

// Get media item by ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const mediaItem = await prisma.mediaItem.findUnique({
      where: { id: Number(id) },
      include: {
        faces: true,
        routes: true,
      },
    });

    if (!mediaItem) {
      throw new AppError(404, 'Media item not found');
    }

    res.json(mediaItem);
  })
);

// Create media item
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const data = createMediaItemSchema.parse(req.body);
    const customId = await generateCustomId(data.workspaceId, data.type);

    const mediaItem = await prisma.mediaItem.create({
      data: {
        name: data.name,
        type: data.type,
        customId,
        workspaceId: data.workspaceId,
        faces: data.type === MediaType.STATIC_BILLBOARD
          ? {
              create: data.staticMediaFaces,
            }
          : undefined,
        routes: data.type === MediaType.STREET_POLE
          ? {
              create: data.routes,
            }
          : undefined,
      },
      include: {
        faces: true,
        routes: true,
      },
    });

    res.status(201).json(mediaItem);
  })
);

// Update media item
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = createMediaItemSchema.partial().parse(req.body);

    const mediaItem = await prisma.mediaItem.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        faces: data.staticMediaFaces
          ? {
              deleteMany: {},
              create: data.staticMediaFaces,
            }
          : undefined,
        routes: data.routes
          ? {
              deleteMany: {},
              create: data.routes,
            }
          : undefined,
      },
      include: {
        faces: true,
        routes: true,
      },
    });

    res.json(mediaItem);
  })
);

// Delete media item
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.mediaItem.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  })
);

export default router; 