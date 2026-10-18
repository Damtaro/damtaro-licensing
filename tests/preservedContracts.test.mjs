import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { createHash } from 'node:crypto';
const approved = JSON.parse(await readFile(new URL('../scripts/approved-integrity-v1-4.json', import.meta.url), 'utf8'));
test('approved legal texts, pricing, currency and payment contracts remain byte-for-byte unchanged', async () => {
  const files = [
    'src/data/legalDocuments.js', 'src/data/licenses.js', 'src/data/pricing.js', 'src/data/currencies.js',
    'src/services/orderService.js', 'src/services/payment/paymentOperations.js',
    'src/services/payment/paymentProviders.js', 'src/services/payment/paymentProvider.js',
    'src/services/payment/paymentService.js', 'src/pages/Checkout.jsx',
  ];
  for (const file of files) {
    const current = await readFile(file);
    // Git checkout may normalize line endings on Windows; preserve every other byte.
    assert.equal(createHash('sha256').update(current.toString('utf8').replaceAll('\r\n', '\n')).digest('hex'), approved.contracts[file], `Unchanged: ${file}`);
  }
});
