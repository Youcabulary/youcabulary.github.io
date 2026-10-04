const { expect } = require('@playwright/test');
async function ready(page, timeout = 10000) {
  await page.evaluate(() => document.fonts.ready);
  // A first decode can reject while Chromium is settling an image request.
  // Retry readiness, not the screenshot assertion; broken assets must still fail.
  await expect.poll(async () => page.evaluate(async () => {
    const failures = await Promise.all([...document.images].map(async img => {
      const source = img.currentSrc || img.src || '(empty image source)';
      try {
        await img.decode();
        if (!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0)
          return `${source}: image has no loaded pixels`;
        return null;
      } catch (error) {
        return `${source}: ${error.name}: ${error.message}`;
      }
    }));
    return failures.filter(Boolean);
  }), { timeout, intervals: [100, 250, 500], message: 'Images must decode before visual capture (failing URLs below)' }).toEqual([]);
}
module.exports = { ready };
