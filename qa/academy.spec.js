import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

const screenshotPath = name => join(process.env.PLAYWRIGHT_SCREENSHOT_DIR || 'artifacts/academy', name);

test.beforeEach(async () => {
  await mkdir(process.env.PLAYWRIGHT_SCREENSHOT_DIR || 'artifacts/academy', { recursive: true });
});

test('Academy is directly addressable, localized and has independent metadata', async ({ page }, info) => {
  await page.goto('/academy');
  await expect(page).toHaveURL(/\/academy\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page).toHaveTitle('DAMTARO ACADEMY | Producción Musical con FL Studio');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://damtaro.com/academy');
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://damtaro.com/academy');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('main > section')).toHaveCount(4);
  await expect(page.getByText('FL Studio', { exact: false }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Programa Rápido de Producción, Distribución y Monetización Musical' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Programa Integral de Producción, Distribución y Negocios Musicales' })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Pago completo: $276 USD' })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Pago completo: $483 USD' })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Pago mensual: $69 USD por mes' })).toHaveCount(2);
  await expect(page.getByText('Cálculo: $69 × 4 meses', { exact: true })).toBeVisible();
  await expect(page.getByText('Cálculo: $69 × 7 meses', { exact: true })).toBeVisible();
  const intensive = page.locator('#programas article').nth(0);
  const integral = page.locator('#programas article').nth(1);
  const intensiveSignup = intensive.getByRole('link', { name: 'Inscribirme' });
  const integralSignup = integral.getByRole('link', { name: 'Inscribirme' });
  await expect(intensiveSignup).toHaveCount(1);
  await expect(intensiveSignup).toHaveAttribute('href', 'https://damtarooff.gumroad.com/l/aejvcie');
  await expect(intensiveSignup).toHaveAttribute('target', '_blank');
  await expect(intensiveSignup).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(integralSignup).toHaveCount(1);
  await expect(integralSignup).toHaveAttribute('href', 'https://damtarooff.gumroad.com/l/jclvy');
  await expect(integralSignup).toHaveAttribute('target', '_blank');
  await expect(integralSignup).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(page.locator('a[href*="gumroad"]')).toHaveCount(2);
  await expect(page.getByText('Al continuar podrás elegir tu modalidad de pago en Gumroad.', { exact: true })).toHaveCount(2);
  await intensive.getByText('Conocer el contenido').click();
  await expect(intensive.getByText(/interfaz, flujo de trabajo y proceso de creación musical/i)).toBeVisible();
  await expect(intensive.getByText(/Distribución musical y monetización musical/)).toBeVisible();
  await integral.getByText('Conocer el contenido').click();
  await expect(integral.getByText(/Distribución musical y negocios musicales/)).toBeVisible();
  await expect(page.getByText(/descuento/i)).toHaveCount(0);
  await expect(page.getByText('¿Necesito experiencia previa en producción musical?')).toBeVisible();
  await expect(page.getByText('¿Qué necesito para aprender con FL Studio?')).toBeVisible();
  const cards = page.locator('#programas article');
  await expect(cards).toHaveCount(2);
  const cardBounds = await cards.evaluateAll(elements => elements.map(element => {
    const { x, y, width, height } = element.getBoundingClientRect();
    return { x, y, width, height };
  }));
  if (info.project.name === 'mobile') {
    expect(cardBounds[1].y).toBeGreaterThanOrEqual(cardBounds[0].y + cardBounds[0].height - 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  } else {
    expect(Math.abs(cardBounds[1].y - cardBounds[0].y)).toBeLessThan(4);
    expect(cardBounds[1].x).toBeGreaterThan(cardBounds[0].x);
  }
  await expect(page.getByRole('link', { name: 'Volver a DAMTARO' }).first()).toHaveAttribute('href', '/');
  await page.reload();
  await expect(page).toHaveURL(/\/academy\/?$/);
  await page.getByRole('link', { name: 'Ver los programas' }).click();
  await expect(page).toHaveURL(/\/academy\/?#programas$/);
  await expect(page.getByRole('heading', { name: 'Programa Rápido de Producción, Distribución y Monetización Musical' })).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: screenshotPath(`${info.project.name}-v3.png`), fullPage: true });
});

test('DAMTARO navigation opens Academy and browser history returns to Licensing', async ({ page }, info) => {
  await page.goto('/');
  if (info.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    await page.getByRole('button', { name: 'Cursos', exact: true }).click();
  } else {
    await page.locator('header nav').getByRole('link', { name: 'Cursos', exact: true }).click();
  }
  await expect(page).toHaveURL(/\/academy\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page).toHaveTitle(/Music Licensing/);
  await page.goForward();
  await expect(page).toHaveURL(/\/academy\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
