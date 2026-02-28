import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '../lib/utils';
import { RevealObserver } from '../components/RevealObserver';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Sameer Qadri — Full Stack Engineer',
  description:
    'Full Stack Engineer specializing in headless systems, AI agents, and SaaS products. 50+ projects delivered across 10+ countries.',
  openGraph: {
    title: 'Sameer Qadri — Full Stack Engineer',
    description:
      'Full Stack Engineer specializing in headless systems, AI agents, and SaaS products. 50+ projects delivered across 10+ countries.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background text-foreground font-sans antialiased',
          inter.variable,
        )}
      >
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
