import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
