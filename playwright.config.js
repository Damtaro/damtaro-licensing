import { defineConfig } from '@playwright/test';
import process from 'node:process';

export default defineConfig({
  testDir: './qa', fullyParallel: false, workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:5184',
    ...(process.env.CI ? {} : { channel: 'msedge' }),
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5184 --strictPort',
    url: 'http://127.0.0.1:5184',
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
