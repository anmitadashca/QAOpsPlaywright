// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { worker } from 'node:cluster';
import { trace } from 'node:console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 1,
  workers: 3,
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'firefoxExecution',
      use: {
        browserName: 'firefox',
        headless: true,
        screenshot: 'off',
        trace: 'on',
        launchOptions: {
          args: ["--start-maximized"],
        },
        viewport: null,
      },
    },
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'off',
        trace: 'on',
        launchOptions: {
          args: ["--start-maximized"],
        },
        ...devices['iPhone 12'],
      },
    },
    {
      
        name: 'chromiumExecution',
        use: {
          browserName: 'chromium',
          headless: false,
          video: 'retain-on-failure',
          screenshot: 'on',
          ignoreHTTPSErrors: true,
          Permissions: ['geolocation'],
          trace: 'on',
          launchOptions: {
            args: ["--start-maximized"],
          },
          viewport: null,
        },
      
    }
  ]

});
module.exports = config;

