const TECH_ITEMS = [
  {
    label: 'React',
    logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    label: 'Next.js',
    logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  {
    label: 'Node.js',
    logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    label: 'TypeScript',
    logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    label: 'Python',
    logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    label: 'Django',
    logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  },
  {
    label: 'GraphQL',
    logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  },
  {
    label: 'PostgreSQL',
    logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    label: 'Docker',
    logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    label: 'Tailwind CSS',
    logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    label: 'Shopify',
    logoSrc: '/shopify.svg',
  },
  {
    label: 'AWS',
    logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  },
];

function MarqueeRow() {
  return (
    <div className="marquee-content">
      {TECH_ITEMS.map(({ label, logoSrc }) => (
        <span
          key={label}
          className="flex items-center gap-4 text-foreground font-semibold text-lg"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border">
            <img
              src={logoSrc}
              alt={`${label} logo`}
              className="h-6 w-6 object-contain"
              loading="lazy"
            />
          </span>
          <span>{label}</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee-container" aria-hidden>
      <MarqueeRow />
      <MarqueeRow />
    </div>
  );
}
