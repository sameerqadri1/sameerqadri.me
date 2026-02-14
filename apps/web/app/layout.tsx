import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Sameer Qadri | Portfolio',
  description: 'Portfolio and case studies — sameerqadri.me',
  openGraph: {
    title: 'Sameer Qadri | Portfolio',
    description: 'Portfolio and case studies — sameerqadri.me',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
