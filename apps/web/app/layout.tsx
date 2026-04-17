import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { cn } from '../lib/utils';
import { RevealObserver } from '../components/RevealObserver';
import { CookieConsentBanner } from '../components/CookieConsentBanner';
import { buildBaseMetadata } from '../seo';
import { seoConfig } from '../seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = buildBaseMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = 'G-RYSBD4Y6VJ';
  const gtmContainerId = process.env.NEXT_PUBLIC_GTM_ID;
  const googleSiteVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');
  const globalServiceSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${baseUrl}#person`,
        name: 'Sameer Qadri',
        url: baseUrl,
        jobTitle: 'Full Stack Engineer',
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${baseUrl}#service`,
        name: seoConfig.siteName,
        url: baseUrl,
        founder: { '@id': `${baseUrl}#person` },
        areaServed: [
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'Saudi Arabia' },
          { '@type': 'Country', name: 'Australia' },
          { '@type': 'Country', name: 'Pakistan' },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="google-site-verification"
          content={googleSiteVerification}
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <Script
          id="jsonld-global-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalServiceSchema) }}
        />
        <Script
          id="gtm-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('consent','default',{'ad_storage':'denied','analytics_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','functionality_storage':'granted','security_storage':'granted','wait_for_update':500});`,
          }}
        />
        {gtmContainerId ? (
          <Script
            id="gtm-script"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmContainerId}');`,
            }}
          />
        ) : null}
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="beforeInteractive"
            />
            <Script
              id="google-analytics"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaMeasurementId}');`,
              }}
            />
          </>
        ) : null}
      </head>
      <body
        className={cn(
          'min-h-screen bg-background text-foreground font-sans antialiased',
          inter.variable,
        )}
      >
        {gtmContainerId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmContainerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}
        <RevealObserver />
        <CookieConsentBanner />
        {children}
      </body>
    </html>
  );
}
