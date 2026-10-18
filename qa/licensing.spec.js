import { test, expect } from '@playwright/test';

async function catalog(page) {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Footer navigation' }).getByRole('button', { name: 'Browse Music', exact: true }).click();
  await expect(page.locator('.music-card')).toHaveCount(9);
}
async function customForm(page) {
  await catalog(page);
  await page.getByRole('button', { name: 'TITAN', exact: true }).click();
  await page.getByRole('button', { name: 'Request Custom Audio 🎵', exact: true }).click();
  return page.getByRole('form', { name: 'Custom Audio Request', exact: true });
}
async function fillRequired(form) {
  await form.locator('[name=name]').fill('QA Test');
  await form.locator('[name=email]').fill('qa@example.com');
  await form.locator('[name=description]').fill('Controlled local test only.');
  await form.locator('[name=intended_use]').selectOption('Business');
}
test.beforeEach(async ({ page }) => {
  // No test may submit live inquiries or follow a live payment link.
  await page.route('https://formspree.io/**', route => route.abort());
  await page.route('https://damtarooff.gumroad.com/**', route => route.abort());
});

test('existing navigation, mobile menu, contact and legal views stay available', async ({ page }, info) => {
  await page.goto('/');
  if (info.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('button', { name: 'Browse Music', exact: true }).click();
  } else await page.locator('header nav').getByRole('button', { name: 'Browse Music', exact: true }).click();
  await expect(page.locator('.music-card')).toHaveCount(9);
  const footer = page.getByRole('navigation', { name: 'Footer navigation' });
  for (const [label, selector] of [['Licensing Guide', '#how-to-use-title'], ['Sample Packs', '#sample-packs-title'], ['Contact', '#contact-title']]) {
    await footer.getByRole('button', { name: label, exact: true }).click();
    await expect(page.locator(selector)).toBeVisible();
  }
  for (const label of ['License Terms', 'Terms of Service', 'Privacy Policy']) {
    await page.getByRole('navigation', { name: 'Legal information' }).getByRole('button', { name: label, exact: true }).click();
    await expect(page.getByRole('heading', { name: label, exact: true })).toBeVisible();
  }
});

test('catalog, playback, download and filters remain intact', async ({ page }) => {
  await catalog(page);
  await expect(page.locator('.music-card h3')).toHaveText(['TITAN', 'REGAIN', 'GRAVITY', 'CRAZY', 'CTRL ME', 'FEEL AGAIN', 'BLIND', 'CONTROL', 'ELEVATION']);
  const first = page.locator('.music-card').first();
  await first.getByRole('button', { name: 'Preview', exact: true }).click();
  await expect(first.getByRole('button', { name: 'Pause', exact: true })).toBeVisible();
  await first.getByRole('slider').press('Home');
  await first.getByRole('slider').press('ArrowRight');
  await first.getByRole('button', { name: 'Pause', exact: true }).click();
  await first.getByRole('button', { name: 'Download TITAN' }).click();
  const download = page.getByRole('link', { name: 'Download MP3' });
  await expect(download).toHaveAttribute('href', /titan\.mp3/);
  const pending = page.waitForEvent('download');
  await download.click();
  expect((await pending).suggestedFilename()).toBe('DAMTARO - TITAN.mp3');
  await page.getByRole('button', { name: 'Close download' }).click();
  const search = page.locator('input[type=search], input[placeholder*="Search"]').first();
  await search.fill('REGAIN');
  await expect(page.locator('.music-card')).toHaveCount(1);
  await search.fill('');
  await page.getByRole('button', { name: 'BPM', exact: true }).click();
  await page.getByRole('button', { name: '85 BPM', exact: true }).click();
  await expect(page.locator('.music-card h3')).toHaveText(['GRAVITY', 'CRAZY']);
});

test('neutral stem metadata and responsive custom form retain song context', async ({ page }, info) => {
  await catalog(page);
  await page.getByRole('button', { name: 'TITAN', exact: true }).click();
  const detail = page.getByRole('dialog', { name: 'TITAN', exact: true });
  await expect(detail.getByText('Includes the official stems supplied by DAMTARO for the selected track.')).toBeVisible();
  await expect(detail.getByRole('list')).toHaveCount(0);
  await expect(detail.getByText(/unavailable|not verified|four stems/i)).toHaveCount(0);
  await page.screenshot({ path: `artifacts/v1-4/${info.project.name}-track-detail.png`, fullPage: false });
  await detail.evaluate(element => { element.scrollTop = element.scrollHeight; });
  await page.screenshot({ path: `artifacts/v1-4/${info.project.name}-stem-options.png`, fullPage: false });
  await detail.getByRole('button', { name: 'Request Custom Audio 🎵' }).click();
  const form = page.getByRole('form', { name: 'Custom Audio Request' });
  await expect(form.locator('[name=asset]')).toHaveValue('9');
  await form.locator('[name=description]').fill('Draft retained while reading privacy.');
  await form.getByRole('button', { name: 'Privacy Policy', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Privacy Policy', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Back to custom request' }).first().click();
  await expect(form.locator('[name=description]')).toHaveValue('Draft retained while reading privacy.');
  await page.screenshot({ path: `artifacts/v1-4/${info.project.name}-custom-request.png`, fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Back to TITAN', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'TITAN', exact: true })).toBeVisible();
});

for (const [index, type, product, price] of [[0, 'Creator', 'cxmwf', '17'], [1, 'Business', 'mzitdy', '149']]) {
  test(`${type} keeps legal consent, price and exact Gumroad route`, async ({ page }) => {
    let url;
    await page.route('https://damtarooff.gumroad.com/**', route => { url = route.request().url(); return route.fulfill({ contentType: 'text/html', body: '<h1>Mock checkout only</h1>' }); });
    await catalog(page);
    await page.locator('.music-card').first().getByRole('button', { name: 'License', exact: true }).click();
    const modal = page.getByRole('dialog', { name: 'Licensing options' });
    await expect(modal.locator('article').nth(index)).toContainText(`$${price}`);
    await expect(modal.getByRole('checkbox')).toHaveCount(0);
    await modal.getByRole('button', { name: `Choose ${type}`, exact: true }).click();
    const button = modal.getByRole('button', { name: 'Continue to Secure Checkout', exact: true });
    await expect(button).toBeDisabled();
    await expect(modal.getByRole('checkbox')).not.toBeChecked();
    await expect(modal.getByRole('heading', { name: `${type} License summary` })).toBeFocused();
    await expect(modal).toContainText('TITAN');
    await expect(modal).toContainText('MP3 + WAV');
    await button.evaluate(element => element.click());
    expect(url).toBeUndefined();
    for (const document of ['License Terms', 'Terms of Service']) {
      await modal.getByRole('button', { name: document, exact: true }).click();
      await expect(page.getByRole('heading', { name: document, exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Back to license selection' }).first().click();
      await expect(modal.getByRole('heading', { name: `${type} License summary` })).toBeVisible();
      await expect(button).toBeDisabled();
    }
    await modal.getByRole('checkbox').check();
    await button.click();
    await expect(page.getByRole('heading', { name: 'Mock checkout only' })).toBeVisible();
    const option = index === 0 ? 'hQVYbEfHfOUiLE-E6iVtfg%3D%3D' : 'dV2JDVVszfUGF5NIk6UY_Q%3D%3D';
    expect(url).toBe(`https://damtarooff.gumroad.com/l/${product}?option=${option}&wanted=true`);
  });
}

test('custom validation, error, retry and successful response use existing Formspree schema', async ({ page }) => {
  const requests = [];
  let status = 500;
  await page.route('https://formspree.io/**', route => { requests.push(route.request().postData()); return route.fulfill({ status, contentType: 'application/json', body: '{}' }); });
  const form = await customForm(page);
  await form.getByRole('button', { name: 'Submit request', exact: true }).click();
  expect(requests).toHaveLength(0);
  await fillRequired(form);
  await form.locator('[name=reference_url]').fill('javascript:alert(1)');
  await form.getByRole('button', { name: 'Submit request', exact: true }).click();
  expect(requests).toHaveLength(0);
  await form.locator('[name=reference_url]').fill('');
  await form.getByRole('button', { name: 'Submit request', exact: true }).click();
  await expect(form.getByRole('status')).toContainText('could not send');
  await expect(form.locator('[name=description]')).toHaveValue('Controlled local test only.');
  status = 200;
  await form.getByRole('button', { name: 'Retry request', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Thanks for reaching out to DAMTARO.');
  expect(requests).toHaveLength(2);
  expect(requests[1]).toContain('TITAN (Catalog ID: 9)');
  expect(requests[1]).toContain('name="project"');
  expect(requests[1]).not.toContain('name="orderId"');
});

test('composition without existing track, spam trap and duplicate prevention', async ({ page }) => {
  let release;
  let calls = 0;
  let payload;
  await page.route('https://formspree.io/**', async route => {
    calls += 1; payload = route.request().postData();
    await new Promise(resolve => { release = resolve; });
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
  const form = await customForm(page);
  await fillRequired(form);
  await form.locator('[name=request_type]').selectOption('Custom Composition');
  await form.locator('[name=asset]').selectOption('new');
  await form.locator('[name=_gotcha]').evaluate(input => { input.value = 'spam'; });
  await form.getByRole('button', { name: 'Submit request', exact: true }).click();
  expect(calls).toBe(0);
  await form.locator('[name=_gotcha]').evaluate(input => { input.value = ''; });
  await form.getByRole('button', { name: 'Retry request', exact: true }).click();
  await expect.poll(() => calls).toBe(1);
  try {
    await expect(form.getByRole('button', { name: 'Sending…', exact: true })).toBeDisabled();
    await expect(page.getByRole('heading', { name: 'Request received! 🎵' })).toHaveCount(0);
    await form.evaluate(element => element.requestSubmit());
    expect(calls).toBe(1);
  } finally { release?.(); }
  await expect(page.getByRole('status')).toContainText('Request received!');
  expect(payload).toContain('Original composition');
  expect(payload).not.toContain('Catalog ID:');
});

test('conditional fields retain drafts, validate track selection and omit hidden details', async ({ page }) => {
  let payload;
  await page.route('https://formspree.io/**', route => {
    payload = route.request().postData();
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
  const form = await customForm(page);
  await expect(page.getByRole('heading', { name: 'Request Custom Audio 🎵' })).toBeVisible();
  await fillRequired(form);
  await form.locator('[name=sound]').fill('Retained synth draft');
  await form.locator('[name=timecode]').fill('00:45–01:10');
  for (const type of ['Isolated Sound', 'Custom Edit', 'Custom Composition', 'Other']) {
    await form.locator('[name=request_type]').selectOption(type);
    const relevant = ['Isolated Sound', 'Custom Edit'].includes(type);
    for (const name of ['sound', 'timecode']) {
      if (relevant) await expect(form.locator(`[name=${name}]`)).toBeVisible();
      else await expect(form.locator(`[name=${name}]`)).toBeDisabled();
    }
    for (const name of ['name', 'email', 'intended_use', 'description', 'distribution', 'deadline', 'reference_url']) await expect(form.locator(`[name=${name}]`)).toBeVisible();
  }
  await form.locator('[name=request_type]').selectOption('Custom Edit');
  await expect(form.locator('[name=sound]')).toHaveValue('Retained synth draft');
  await expect(form.locator('[name=timecode]')).toHaveValue('00:45–01:10');
  await form.locator('[name=asset]').selectOption('');
  await form.getByRole('button', { name: 'Submit request', exact: true }).click();
  expect(payload).toBeUndefined();
  await form.locator('[name=request_type]').selectOption('Custom Composition');
  await form.locator('[name=asset]').selectOption('new');
  await form.locator('[name=request_type]').selectOption('Custom Edit');
  await expect(form.locator('[name=asset]')).toHaveValue('');
  await form.locator('[name=request_type]').selectOption('Custom Composition');
  await expect(form.locator('[name=asset]')).toHaveValue('new');
  await form.getByRole('button', { name: 'Submit request', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Request received! 🎵' })).toBeVisible();
  expect(payload).not.toContain('Retained synth draft');
  expect(payload).not.toContain('Relevant timecode:');
  expect(payload).toContain('Original composition');
});

test('verified variable stems never expose protected download fields; cart callbacks and removal work', async ({ page }) => {
  await page.goto('/qa/fixtures/components.html');
  await expect(page.getByText('3 official stems:', { exact: true })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(3);
  expect(await page.locator('body').innerHTML()).not.toContain('private.invalid');
  await expect(page.getByRole('link')).toHaveCount(0);
  await page.getByRole('button', { name: 'Open test cart' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('USD $149');
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  await expect(page.getByRole('status')).toHaveText('Checkout callback received');
  await page.getByRole('button', { name: 'Open test cart' }).click();
  await page.getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Your cart is empty.' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.getByRole('button', { name: 'Open test cart' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});
