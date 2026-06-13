import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    port: 4321,
    reuseExistingServer: true
  },
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : undefined
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ]
});
