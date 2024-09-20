import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents: (on, config) => ({
      ...config,
      browsers: config.browsers.filter(
        (browser) => browser.family === 'chromium'
      ),
    }),
  },
});
