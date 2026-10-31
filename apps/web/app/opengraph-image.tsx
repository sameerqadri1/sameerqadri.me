import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Sameer Qadri | Full Stack & AI Systems Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const ogContainerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: '#121316',
  color: '#ededed',
  padding: '72px',
  fontFamily: 'system-ui, sans-serif',
} as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={ogContainerStyle}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            opacity: 0.85,
            marginBottom: 18,
          }}
        >
          Sameer Qadri
        </div>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.05,
            fontWeight: 600,
            maxWidth: 960,
          }}
        >
          Headless Systems, AI Agents &amp; Production SaaS
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 28,
            opacity: 0.8,
          }}
        >
          Next.js, Node.js, PostgreSQL, AI Systems
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
