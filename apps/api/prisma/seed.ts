/**
 * Self-contained seed script.
 * Automatically generates the Prisma client if it hasn't been built yet.
 *
 * Run from apps/api:
 *   npx tsx prisma/seed.ts
 *
 * Or from the monorepo root:
 *   npm run db:seed -w @portfolio/api
 */
import 'dotenv/config';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientPath = join(__dirname, '../src/generated/prisma/client.js');

if (!existsSync(clientPath)) {
  console.log('⚙️   Prisma client not found — running prisma generate...');
  execSync('npx prisma generate', {
    cwd: join(__dirname, '..'),
    stdio: 'inherit',
  });
  console.log('✓   Client generated.\n');
}

// Dynamic import so the client is loaded after generation
const { PrismaClient } = await import('../src/generated/prisma/client.js');
const { PrismaPg } = await import('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('❌  DATABASE_URL is not set. Add it to apps/api/.env');
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const CASE_STUDIES = [
  {
    slug: 'headless-shopify-fashion-store',
    title: 'Headless Shopify Storefront for a Fashion Brand',
    subtitle: 'Custom Next.js frontend connected to Shopify Storefront API',
    summary:
      'Rebuilt a legacy Shopify theme into a blazing-fast headless storefront using Next.js and the Shopify Storefront API — reducing page load by 60% and increasing mobile conversion by 28%.',
    body: `<h2>Overview</h2>
<p>The client was running a high-traffic fashion brand on a bloated Shopify theme that scored 32/100 on PageSpeed. Cart abandonment on mobile was at 78%. They needed a complete frontend overhaul without disrupting inventory, orders, or their Shopify admin workflow.</p>
<h2>Solution</h2>
<p>Built a fully headless Next.js 14 storefront using the Shopify Storefront API (GraphQL) with Incremental Static Regeneration for near-instant product page loads.</p>
<h2>Results</h2>
<ul>
  <li>PageSpeed score: 32 → 96/100</li>
  <li>Page load time: 4.2s → 1.1s</li>
  <li>Mobile conversion rate: +28%</li>
  <li>Bounce rate: -34%</li>
</ul>`,
    coverImageUrl:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
    tags: ['Next.js', 'Shopify', 'GraphQL', 'Tailwind CSS', 'Headless'],
    client: 'Fashion Brand (NDA)',
    year: 2024,
    featured: true,
    order: 1,
    published: true,
  },
  {
    slug: 'ai-ecommerce-chatbot',
    title: 'AI Customer Support Chatbot for E-Commerce',
    subtitle: 'LLM-powered assistant with product knowledge and order tracking',
    summary:
      'Built an AI-powered chatbot for a mid-size e-commerce store that handles 70% of customer queries autonomously — cutting support tickets by half and driving 18% more conversions through contextual product recommendations.',
    body: `<h2>Overview</h2>
<p>A growing e-commerce brand was spending $8,000/month on customer support agents to answer repetitive questions. They wanted an AI solution that felt natural, not robotic.</p>
<h2>Solution</h2>
<p>Built a RAG pipeline using OpenAI GPT-4o, Pinecone for vector search over the product catalog, and Shopify Admin API for real-time order status lookups.</p>
<h2>Results</h2>
<ul>
  <li>70% of queries resolved without human intervention</li>
  <li>Support tickets reduced by 52%</li>
  <li>Monthly support cost reduced from $8,000 to $2,200</li>
</ul>`,
    coverImageUrl:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80',
    tags: ['AI', 'LLM', 'OpenAI', 'Node.js', 'RAG', 'Shopify', 'React'],
    client: 'E-Commerce Brand (NDA)',
    year: 2024,
    featured: true,
    order: 2,
    published: true,
  },
  {
    slug: 'saas-agency-project-management',
    title: 'SaaS Project Management Platform for Agencies',
    subtitle: 'Multi-tenant web app with real-time collaboration and billing',
    summary:
      'Designed and built a full-stack SaaS product for a digital agency to manage client projects, invoicing, and team tasks — replacing Notion, spreadsheets, and email with one streamlined platform.',
    body: `<h2>Overview</h2>
<p>A fast-growing digital agency was managing 40+ active client projects across Notion, Google Sheets, and email. Nothing was connected. They needed a purpose-built tool.</p>
<h2>What Was Built</h2>
<ul>
  <li>Client portal — view progress, leave feedback, approve deliverables</li>
  <li>Internal dashboard — task boards, time tracking, deadline management</li>
  <li>Invoicing module — auto-generated invoices + Stripe integration</li>
  <li>Real-time notifications via WebSockets</li>
</ul>
<h2>Tech Stack</h2>
<p>Next.js 14 · Node.js · PostgreSQL (Neon) · Stripe · Socket.io · Vercel + Railway</p>
<h2>Impact</h2>
<ul>
  <li>Replaced 5 separate tools with one platform</li>
  <li>Invoice collection time: 14 days → 3 days</li>
  <li>Agency now white-labelling the platform to their own clients</li>
</ul>`,
    coverImageUrl:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'SaaS', 'WebSockets'],
    client: 'Digital Agency (NDA)',
    year: 2024,
    featured: true,
    order: 3,
    published: true,
  },
];

async function main() {
  console.log('🌱  Seeding case studies...\n');
  for (const data of CASE_STUDIES) {
    const existing = await prisma.caseStudy.findUnique({ where: { slug: data.slug } });
    if (existing) {
      await prisma.caseStudy.update({ where: { slug: data.slug }, data });
      console.log(`  ↺  Updated: ${data.title}`);
    } else {
      await prisma.caseStudy.create({ data });
      console.log(`  ✓  Created: ${data.title}`);
    }
  }
  console.log('\n✅  Seed complete.');
}

main()
  .catch((e) => {
    console.error('\n❌  Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
