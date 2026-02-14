import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article';
}

export function Card({
  title,
  subtitle,
  children,
  className = '',
  as: Component = 'div',
}: CardProps) {
  return (
    <Component
      className={`rounded-xl border border-white/10 bg-[var(--color-bg-elevated)] p-6 transition hover:border-white/20 ${className}`}
    >
      {title && (
        <h3 className="text-xl font-semibold text-[var(--color-text)]">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          {subtitle}
        </p>
      )}
      <div className={title || subtitle ? 'mt-4' : ''}>{children}</div>
    </Component>
  );
}
