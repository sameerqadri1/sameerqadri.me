import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { caseStudiesRouter } from './routes/case-studies.js';
import { healthRouter } from './routes/health.js';

const app = express();
const PORT = process.env.API_PORT ?? 3001;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'https://sameerqadri.me',
  'https://www.sameerqadri.me',
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(null, false);
    },
  })
);
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/case-studies', caseStudiesRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: { message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message },
  });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
