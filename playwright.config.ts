import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for the SauceDemo end-to-end suite.
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  // Run tests in files in parallel.
  fullyParallel: true,
  // Fail the CI build if test.only was committed by accident.
  forbidOnly: !!process.env.CI,
  // Retry flaky tests on CI only.
  retries: process.env.CI ? 2 : 0,
  // Limit workers on CI for stable, repeatable runs.
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    // SauceDemo exposes stable `data-test` hooks — prefer them over CSS/text.
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});
