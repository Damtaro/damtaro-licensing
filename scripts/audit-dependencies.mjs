import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';

const npmCli = resolve(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js');
const env = { ...process.env, NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} --use-system-ca`.trim() };
await mkdir('artifacts/v1-4', { recursive: true });
const audit = spawnSync(process.execPath, [npmCli, 'audit', '--json', '--fetch-retries=0', '--fetch-timeout=20000'], { encoding: 'utf8', env });
let data;
try { data = JSON.parse(audit.stdout); } catch { throw new Error(audit.stderr || 'npm audit did not return JSON'); }
await writeFile('artifacts/v1-4/npm-audit.json', JSON.stringify(data, null, 2));
if (data.error) { console.error(data.message || data.error); process.exitCode = 1; }
else {
  console.log('npm audit:', JSON.stringify(data.metadata.vulnerabilities));
  // Report the lockfile graph used by the clean npm ci installation.
  const explain = spawnSync(process.execPath, [npmCli, 'ls', '--all', '--package-lock-only', '--json'], { encoding: 'utf8', env });
  await writeFile('artifacts/v1-4/dependency-paths.json', explain.stdout || '[]');
  const runtime = spawnSync(process.execPath, [npmCli, 'audit', '--omit=dev', '--json', '--fetch-retries=0', '--fetch-timeout=20000'], { encoding: 'utf8', env });
  await writeFile('artifacts/v1-4/npm-audit-runtime.json', runtime.stdout || '{}');
  const runtimeData = JSON.parse(runtime.stdout || '{}');
  if (runtimeData.error) throw new Error(runtimeData.error.summary || 'Runtime audit failed');
  console.log('npm audit --omit=dev:', JSON.stringify(runtimeData.metadata.vulnerabilities));
  console.log('Saved full report, dependency paths and runtime-only audit.');
  process.exitCode = audit.status || 0;
}
