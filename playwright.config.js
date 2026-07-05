// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 2,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on',
    launchOptions: {
      args: ["--start-maximized"],
    },
     viewport: null,
  },

  
});
module.exports = config;

