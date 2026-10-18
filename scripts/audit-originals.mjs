// Optional private-source provenance audit. Never needed by build, tests or catalog validation.
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
const originalRoot = process.argv[2];
if (!originalRoot) throw new Error('Usage: node scripts/audit-originals.mjs <authorized-originals-directory> (after build)');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const built = await readdir('dist/assets');
const hashes = new Set(await Promise.all(built.map(async name => hash(await readFile(join('dist/assets', name))))));
for (const title of ['CRAZY','GRAVITY','REGAIN','TITAN']) {
  const slug = title.toLowerCase();
  assert.equal(hash(await readFile(join(resolve(originalRoot),title,`${slug}.mp3`))), hash(await readFile(`src/assets/audio/${slug}.mp3`)), `Original MP3 provenance: ${title}`);
  assert.ok(!hashes.has(hash(await readFile(join(resolve(originalRoot),title,`${slug}.png`)))), `Original PNG must not be published: ${title}`);
}
console.log('PASS: optional original MP3 provenance and original PNG exclusion.');
