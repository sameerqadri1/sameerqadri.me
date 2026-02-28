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
    const msg = e instanceof Error ? e.message : 'Unknown error';
    console.error('Health check DB error:', e);
    res.status(503).json({
      success: false,
      error: { message: `Database unavailable: ${msg}`, code: 'DB_ERROR' },
    });
  }
});
