import { test, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test.beforeEach(async ({ page }) => {
  await page.route('https://formspree.io/**', route => route.abort());
  await page.route('https://damtarooff.gumroad.com/**', route => route.abort());
});

test('home metadata, one H1 and commercial navigation use existing views', async ({ page }, info) => {
  await page.goto('/');
  await expect(page).toHaveTitle('DAMTARO | Music Licensing for Creators & Brands');
  await expect(page.locator('meta[name=description]')).toHaveAttribute('content', 'License original electronic music for YouTube, social media, brands and video projects. Discover professional tracks and flexible licensing options.');
  await expect(page.locator('link[rel=canonical]')).toHaveCount(1);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://damtaro.com/');
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://damtaro.com/');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', await page.title());
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Music for Your Next Project.');
  await page.screenshot({ path: `artifacts/v1-4/${info.project.name}-conversion-home.png`, fullPage: true });
  await page.getByRole('button', { name: 'How Licensing Works', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Choose your licensing path' })).toContainText('Content ID claim?');
  await expect(page.locator('h1')).toHaveCount(1);
  expect(new URL(page.url()).pathname).toBe('/');
  await page.getByRole('button', { name: 'Contact for support', exact: true }).click();
  await expect(page.locator('#contact-title')).toBeVisible();
  await page.getByRole('navigation', { name: 'Footer navigation' }).getByRole('button', { name: 'Home', exact: true }).click();
  await page.getByRole('button', { name: 'Explore Music', exact: true }).click();
  await expect(page.locator('.music-card')).toHaveCount(9);
});

test('compact selector, keyboard focus, changing license and fresh consent', async ({ page }, info) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Explore Music', exact: true }).click();
  const trigger = page.locator('.music-card').first().getByRole('button', { name: 'License', exact: true });
  await trigger.click();
  const modal = page.getByRole('dialog', { name: 'Licensing options' });
  await expect(modal.getByRole('heading', { name: 'License TITAN', exact: true })).toBeVisible();
  await expect(modal.getByRole('button', { name: 'Choose Creator', exact: true })).toBeEnabled();
  await expect(modal.getByRole('button', { name: 'Choose Business', exact: true })).toBeEnabled();
  await expect(modal.getByRole('checkbox')).toHaveCount(0);
  const metrics = await modal.evaluate(element => {
    const scroll = element.querySelector('.overflow-y-auto');
    return { height: element.getBoundingClientRect().height, viewport: innerHeight, scroll: scroll.scrollHeight, visible: scroll.clientHeight, horizontal: document.documentElement.scrollWidth > innerWidth };
  });
  expect(metrics.height).toBeLessThanOrEqual(metrics.viewport);
  expect(metrics.horizontal).toBe(false);
  if (info.project.name === 'desktop') {
    expect(metrics.scroll).toBeLessThanOrEqual(metrics.visible + 1);
    const buttons = await modal.getByRole('button', { name: /^Choose (Creator|Business)$/ }).all();
    const boxes = await Promise.all(buttons.map(button => button.boundingBox()));
    expect(Math.abs(boxes[0].y - boxes[1].y)).toBeLessThan(2);
  }
  await page.screenshot({ path: `artifacts/v1-4/${info.project.name}-license-selector.png` });
  await modal.getByRole('button', { name: 'Choose Business', exact: true }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: `artifacts/v1-4/${info.project.name}-license-selector-cta.png` });
  await modal.getByRole('button', { name: 'Choose Creator', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(modal.getByRole('heading', { name: 'Creator License summary' })).toBeFocused();
  const checkout = modal.getByRole('button', { name: 'Continue to Secure Checkout', exact: true });
  await expect(checkout).toBeDisabled();
  await modal.getByRole('checkbox').check();
  await expect(checkout).toBeEnabled();
  await modal.getByRole('button', { name: 'Change license', exact: true }).click();
  await expect(modal.getByRole('button', { name: 'Choose Creator', exact: true })).toBeFocused();
  await modal.getByRole('button', { name: 'Choose Business', exact: true }).click();
  await expect(modal).toContainText('One commercial project or campaign.');
  await expect(modal.getByRole('checkbox')).not.toBeChecked();
  await expect(checkout).toBeDisabled();
  await page.screenshot({ path: `artifacts/v1-4/${info.project.name}-business-summary.png` });
  await checkout.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `artifacts/v1-4/${info.project.name}-business-summary-cta.png` });
  const last = modal.getByRole('button', { name: 'Request Custom Audio 🎵', exact: true });
  await last.focus();
  await page.keyboard.press('Tab');
  await expect(modal.getByRole('button', { name: 'Close licensing options' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(last).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(modal).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(modal.getByRole('button', { name: 'Choose Business', exact: true })).toBeVisible();
  // Keep JSON outside Vite's watched tree while other browser workers are active.
  await writeFile(join(tmpdir(), `damtaro-v1-4-${info.project.name}-selector-metrics.json`), JSON.stringify(metrics, null, 2));
});
