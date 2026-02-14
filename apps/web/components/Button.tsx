import type { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

const variants = {
  primary:
    'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]',
  secondary:
    'border border-[var(--color-text-muted)] text-[var(--color-text)] hover:border-[var(--color-text)]',
  ghost: 'text-[var(--color-accent)] hover:underline',
};

export function Button({
  href,
  children,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]';

  if (href) {
    return (
      <a
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
