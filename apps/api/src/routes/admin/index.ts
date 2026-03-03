import { Router } from 'express';
import type { Request } from 'express';
import { authMiddleware, type AuthPayload } from '../../middleware/auth.js';
import { adminCaseStudiesRouter } from './case-studies.js';
import { adminSeoRouter } from './seo.js';

export const adminRouter = Router();

adminRouter.use(authMiddleware);

adminRouter.get('/me', (req: Request & { auth?: AuthPayload }, res) => {
  res.json({
    success: true,
    data: { username: req.auth?.sub ?? null },
  });
});

adminRouter.use('/case-studies', adminCaseStudiesRouter);
adminRouter.use('/seo', adminSeoRouter);
