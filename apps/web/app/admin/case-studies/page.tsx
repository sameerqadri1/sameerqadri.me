import Link from 'next/link';

export default function AdminCaseStudiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/"
          className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        >
          ← Dashboard
        </Link>
      </div>
      <h1 className="mt-6 text-2xl font-semibold text-[var(--color-text)]">
        Case studies
      </h1>
      <p className="mt-2 text-[var(--color-text-muted)]">
        List, create, and edit case studies. (CRUD UI coming in next step.)
      </p>
    </div>
  );
}
