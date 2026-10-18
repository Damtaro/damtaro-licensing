import { defineConfig } from '@playwright/test';
// Install the pinned QA tool through npm ci; Edge is an external prerequisite.
export default defineConfig({
  testDir: './qa', fullyParallel: false, workers: 1,
  use: { baseURL: 'http://127.0.0.1:5184', channel: 'msedge', trace: 'retain-on-failure' },
  // Start Vite separately on port 5184 (see the release report). This avoids
  // Windows process-tree shutdown hanging the browser runner after all tests pass.
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
});
