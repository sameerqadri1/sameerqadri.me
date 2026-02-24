const TECH_ITEMS = [
  {
    label: 'React',
    logoSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    label: 'Shopify',
    logoSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg',
  },
  {
    label: 'Next.js',
    logoSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  {
    label: 'Node.js',
    logoSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    label: 'GraphQL',
    logoSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  },
  {
    label: 'Tailwind CSS',
    logoSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
];

function MarqueeRow() {
  return (
    <div className="marquee-content">
      {TECH_ITEMS.map(({ label, logoSrc }) => (
        <span
          key={label}
          className="flex items-center gap-4 text-slate-200 font-semibold text-lg"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/60 border border-white/10">
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
