import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[var(--color-text-muted)]">
            © {year} Sameer Qadri. All rights reserved.
          </p>
          <nav className="flex gap-6" aria-label="Footer">
            <Link
              href="#featured"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              Work
            </Link>
            <Link
              href="#about"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
