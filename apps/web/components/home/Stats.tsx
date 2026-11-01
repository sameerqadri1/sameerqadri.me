'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '3', label: 'SaaS Products Built' },
  { value: '30+', label: 'Happy Clients' },
  { value: '10+', label: 'Countries Served' },
];

function parseStat(raw: string): { num: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: raw };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function CountUp({ raw }: { raw: string }) {
  const { num, suffix } = parseStat(raw);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;
        observer.disconnect();

        const duration = 1400;
        const startTime = performance.now();

        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * num));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <p ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-1 tabular-nums font-display tracking-tight">
      {display}
      {suffix}
    </p>
  );
}

export function Stats() {
  return (
    <section className="py-12 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-border bg-border gap-[1px]">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="p-6 sm:p-8 bg-card text-center transition-colors hover:bg-muted/40"
            >
              <CountUp raw={value} />
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
