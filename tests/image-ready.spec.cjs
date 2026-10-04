const { test, expect } = require('@playwright/test');
const { ready } = require('./image-ready.cjs');
test('image readiness tolerates a transient decode rejection', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const image = document.images[0];
    const decode = image.decode.bind(image);
    image.decode = () => {
      image.decode = decode;
      return Promise.reject(new DOMException('The source image cannot be decoded.', 'EncodingError'));
    };
  });
  await ready(page);
});
test('image readiness rejects a broken image with its URL', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => { const img = new Image(); img.src = '/missing-regression-image.png'; document.body.append(img); });
  await expect(ready(page, 1000)).rejects.toThrow(/missing-regression-image/);
});
