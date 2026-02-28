import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaNeon } from '@prisma/adapter-neon';

// Neon's serverless driver works over HTTP — no persistent TCP connections,
// which is required for Vercel serverless functions (cold starts).
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaNeon({ connectionString });
export const prisma = new PrismaClient({ adapter });
