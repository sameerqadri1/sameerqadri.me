// Server component — required for generateStaticParams with output: 'export'
import { CaseStudyDetail } from './CaseStudyDetail';

// Returns empty array: Next.js won't pre-render any slugs at build time.
// All rendering happens client-side at runtime via the API.
export function generateStaticParams() {
  return [];
}

export default function CaseStudyDetailPage() {
  return <CaseStudyDetail />;
}
