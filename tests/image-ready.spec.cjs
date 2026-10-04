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

test('loaded images remain usable when decode rejects persistently', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0));
  await page.evaluate(() => {
    for (const image of document.images)
      image.decode = () => Promise.reject(new DOMException('The source image cannot be decoded.', 'EncodingError'));
  });
  await ready(page, 1000);
});
test('corrupt image bytes still fail readiness', async ({ page }) => {
  await page.route('**/corrupt-regression.png', route => route.fulfill({ contentType: 'image/png', body: 'not a PNG' }));
  await page.goto('/');
  await page.evaluate(() => { const image = new Image(); image.src = '/corrupt-regression.png'; document.body.append(image); });
  await expect(ready(page, 1000)).rejects.toThrow(/corrupt-regression/);
});
