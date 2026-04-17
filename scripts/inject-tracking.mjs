import fs from 'node:fs/promises';
import path from 'node:path';

const MARKER = '<!-- sq-tracking-injected -->';

async function collectHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function buildHeadSnippet({ gtmId, gaId, verification }) {
  const parts = [MARKER];

  if (verification) {
    parts.push(
      `<meta name="google-site-verification" content="${verification}">`
    );
  }

  parts.push(
    `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_storage':'denied','analytics_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','functionality_storage':'granted','security_storage':'granted','wait_for_update':500});</script>`
  );

  if (gtmId) {
    parts.push(
      `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>`
    );
  }

  if (gaId) {
    parts.push(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>`
    );
    parts.push(
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');</script>`
    );
  }

  return parts.join('');
}

function buildBodySnippet(gtmId) {
  if (!gtmId) return '';
  return `${MARKER}<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;
}

async function main() {
  const outDir = path.join(process.cwd(), 'apps', 'web', 'out');
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TSZSFLF8';
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-RYSBD4Y6VJ';
  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '';

  const htmlFiles = await collectHtmlFiles(outDir);
  let updated = 0;

  const headSnippet = buildHeadSnippet({ gtmId, gaId, verification });
  const bodySnippet = buildBodySnippet(gtmId);

  for (const filePath of htmlFiles) {
    let html = await fs.readFile(filePath, 'utf8');
    if (html.includes(MARKER)) continue;

    const withHead = html.replace('<head>', `<head>${headSnippet}`);
    const withBody = withHead.replace('<body', `${bodySnippet}<body`);
    if (withBody !== html) {
      await fs.writeFile(filePath, withBody, 'utf8');
      updated += 1;
    }
  }

  console.log(`[inject-tracking] Updated ${updated} HTML files.`);
}

main().catch((err) => {
  console.error('[inject-tracking] Failed:', err);
  process.exit(1);
});
