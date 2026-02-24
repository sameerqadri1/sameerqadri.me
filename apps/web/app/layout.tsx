import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '../lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Senior Full-Stack Developer | Digital Business Builder',
  description:
    'Transforming complex requirements into high-conversion Shopify Plus and custom full-stack ecosystems. Scaling brands from 0 to 10k+ daily orders.',
  openGraph: {
    title: 'Senior Full-Stack Developer | Digital Business Builder',
    description:
      'Transforming complex requirements into high-conversion Shopify Plus and custom full-stack ecosystems.',
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
        {children}
      </body>
    </html>
  );
}
