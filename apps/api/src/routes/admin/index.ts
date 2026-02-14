import { Router } from 'express';
import type { Request } from 'express';
import { authMiddleware, type AuthPayload } from '../../middleware/auth.js';

export const adminRouter = Router();

adminRouter.use(authMiddleware);

adminRouter.get('/me', (req: Request & { auth?: AuthPayload }, res) => {
  res.json({
    success: true,
    data: { username: req.auth?.sub ?? null },
  });
});
