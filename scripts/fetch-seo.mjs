import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.log('[fetch-seo] NEXT_PUBLIC_API_URL not set, skipping SEO fetch.');
    return;
  }

  const url = `${apiUrl.replace(/\/$/, '')}/api/seo`;
  console.log(`[fetch-seo] Fetching SEO config from ${url}`);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(
        `[fetch-seo] Failed to fetch SEO config. Status ${res.status}`
      );
      return;
    }
    const json = await res.json();
    if (!json.success || !json.data) {
      console.error('[fetch-seo] API did not return success:true with data');
      return;
    }

    const targetPath = path.join(
      process.cwd(),
      'apps',
      'web',
      'seo.generated.json'
    );
    await fs.writeFile(
      targetPath,
      JSON.stringify(json.data, null, 2) + '\n',
      'utf8'
    );
    console.log(`[fetch-seo] Wrote SEO config to ${targetPath}`);
  } catch (err) {
    console.error('[fetch-seo] Error fetching SEO config:', err);
  }
}

main();

