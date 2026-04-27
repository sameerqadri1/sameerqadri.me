import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Sameer Qadri | AI Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 20% 20%, #1d4ed8 0%, #0f172a 55%, #020617 100%)',
          color: '#f8fafc',
          padding: '72px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 2,
            textTransform: 'uppercase',
            opacity: 0.85,
            marginBottom: 18,
          }}
        >
          Sameer Qadri
        </div>
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.04,
            fontWeight: 800,
            maxWidth: 960,
          }}
        >
          AI Software Engineer for SaaS, AI Agents & Web
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 32,
            opacity: 0.9,
          }}
        >
          Next.js • Node.js • Production Systems
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
