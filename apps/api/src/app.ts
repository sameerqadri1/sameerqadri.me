import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.js';
import { caseStudiesRouter } from './routes/case-studies.js';
import { contactRouter } from './routes/contact.js';
import { healthRouter } from './routes/health.js';
import { adminRouter } from './routes/admin/index.js';
import { uploadRouter } from './routes/upload.js';
import { authMiddleware } from './middleware/auth.js';

export const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'https://sameerqadri.me',
  'https://www.sameerqadri.me',
  'https://sameerqadri1.github.io',
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app')
      ) {
        return cb(null, true);
      }
      cb(null, false);
    },
  })
);
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/case-studies', caseStudiesRouter);
app.use('/api/contact', contactRouter);
app.use('/api/admin', adminRouter);
app.use('/api/upload', authMiddleware, uploadRouter);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({
      success: false,
      error: {
        message:
          process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
      },
    });
  }
);
