const { defineConfig } = require('@playwright/test');
const base = require('./playwright.config.cjs');
module.exports = defineConfig({
  ...base,
  testMatch: 'vision.spec.cjs', timeout: 120000,
  outputDir: 'vision-results',
  reporter: [['list'], ['html', { outputFolder: 'vision-report', open: 'never' }]],
  snapshotPathTemplate: '{testDir}/vision-baselines/{platform}/{projectName}/{arg}{ext}',
  expect: { toHaveScreenshot: { animations: 'disabled', maxDiffPixelRatio: 0.002 } },
  use: { ...base.use, reducedMotion: 'reduce' }
});
