import type { Metadata } from 'next';
import { buildCaseStudiesMetadata } from '../../seo';

export const metadata: Metadata = buildCaseStudiesMetadata();

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

