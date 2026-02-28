import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

// In Vercel, env vars are injected directly — no dotenv needed.
// Locally, dotenv is loaded in src/index.ts before this module is imported.
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });
