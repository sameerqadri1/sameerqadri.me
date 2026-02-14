import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      data: { status: 'ok', database: 'connected' },
    });
  } catch (e) {
    res.status(503).json({
      success: false,
      error: { message: 'Database unavailable', code: 'DB_ERROR' },
    });
  }
});
