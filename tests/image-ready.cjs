const { expect } = require('@playwright/test');
async function ready(page, timeout = 10000) {
  await page.evaluate(() => document.fonts.ready);
  // decode() is an eager-decoding API, not a necessary condition for rendering.
  // Use successful load state and intrinsic dimensions; screenshot assertions
  // independently check the rendered pixels without changing the baselines.
  await expect.poll(async () => page.evaluate(() =>
    [...document.images].filter(img => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0)
      .map(img => `${img.currentSrc || img.src || '(empty image source)'}: ${img.complete ? 'image failed to load' : 'image still loading'}`)
  ), { timeout, intervals: [100, 250, 500], message: 'Images must load before visual capture (failing URLs below)' }).toEqual([]);
}
module.exports = { ready };
