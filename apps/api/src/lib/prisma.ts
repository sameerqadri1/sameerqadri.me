import { PrismaClient } from '@prisma/client';
import { neon } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(connectionString);
const adapter = new PrismaNeon(sql);
export const prisma = new PrismaClient({ adapter });
