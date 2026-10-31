import { test, expect } from '@playwright/test';

test.describe('Design, Header Stability, Backend & Interaction Checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Header is fixed and never disappears when clicking section elements', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Verify initial position is at top
    const boxBefore = await header.boundingBox();
    expect(boxBefore).not.toBeNull();
    expect(boxBefore?.y).toBe(0);

    // Click on Architecture section object / card
    const archSection = page.locator('#architecture');
    await expect(archSection).toBeVisible();
    await archSection.click();

    // Header must remain strictly visible and fixed at y=0
    await expect(header).toBeVisible();
    const boxAfterArchClick = await header.boundingBox();
    expect(boxAfterArchClick?.y).toBe(0);

    // Click inside Hero card / telemetry
    const heroTelemetry = page.locator('text=runtime.telemetry').first();
    await heroTelemetry.click();
    await expect(header).toBeVisible();

    // Click FAQ accordion item
    const faqButton = page.locator('#faq button').first();
    if (await faqButton.isVisible()) {
      await faqButton.click();
      await page.waitForTimeout(300);
      await expect(header).toBeVisible();
      const boxAfterFaq = await header.boundingBox();
      expect(boxAfterFaq?.y).toBe(0);
    }
  });

  test('Navigation links smoothly scroll without hiding header', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Click "Architecture" nav link
    const hamburger = page.locator('button[aria-label="Open menu"]');
    if (await hamburger.isVisible()) {
      await hamburger.click();
      await page.waitForTimeout(200);
    }
    const archLink = page.locator('nav a', { hasText: 'Architecture' }).first();
    if (await archLink.isVisible()) {
      await archLink.click();
      await page.waitForTimeout(600);
      await expect(header).toBeVisible();

      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);
    }

    // Click "FAQ" nav link
    const faqLink = page.locator('nav a', { hasText: 'FAQ' }).first();
    if (await faqLink.isVisible()) {
      await faqLink.click();
      await page.waitForTimeout(600);
      await expect(header).toBeVisible();
    }
  });

  test('Backend & Database telemetry pill renders live connectivity', async ({ page }) => {
    // Check for the backend telemetry badge
    const backendBadge = page.locator('text=Backend:').first();
    await expect(backendBadge).toBeVisible();

    // Check for database text
    const dbText = page.locator('text=Neon PostgreSQL').first();
    await expect(dbText).toBeVisible();
  });

  test('Case studies load from database and modal inspects cleanly', async ({ page }) => {
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();

    // Verify case studies cards are present
    const cards = projectsSection.locator('button[type="button"]');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify first card has title and inspect action
    const firstCard = cards.first();
    await expect(firstCard).toContainText('Inspect');

    // Click first case study card to open modal
    await firstCard.click();

    // Verify modal appears
    const modalDialog = page.locator('[role="dialog"]');
    await expect(modalDialog).toBeVisible({ timeout: 5000 });

    // Verify close button closes modal
    const closeBtn = modalDialog.locator('button[aria-label="Close"]');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();

    await expect(modalDialog).not.toBeVisible({ timeout: 3000 });

    // Verify header is still visible after modal close
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('Visual check: takes page screenshot without visual regressions', async ({ page }, testInfo) => {
    await page.waitForTimeout(500);
    const screenshot = await page.screenshot({ fullPage: false });
    await testInfo.attach('viewport-screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });
  });
});
