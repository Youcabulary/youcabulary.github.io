const { test, expect } = require('@playwright/test');
const simulations = ['none', 'protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'];
async function ready(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(img => img.decode()));
  });
}
async function capture(page, info, name, locator = page) {
  await ready(page);
  const options = locator === page ? { fullPage: true } : {};
  await info.attach(name, { body: await locator.screenshot({ ...options, animations: 'disabled' }), contentType: 'image/png' });
  await expect.soft(locator).toHaveScreenshot(name + '.png', options);
}
for (const simulation of simulations) {
  test(`${simulation}: pages, selected approaches and keyboard focus`, async ({ page }, info) => {
    const session = await page.context().newCDPSession(page);
    await session.send('Emulation.setEmulatedVisionDeficiency', { type: simulation });
    for (const route of ['index', 'support', 'privacy', 'sources']) {
      await page.goto('/' + route + '.html');
      await capture(page, info, `${simulation}-${route}`);
    }
    await page.goto('/');
    for (const mode of ['media', 'goals', 'class']) {
      const button = page.locator(`[data-mode="${mode}"]`);
      await button.click();
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      await capture(page, info, `${simulation}-approach-${mode}`, page.locator('.approach-layout'));
    }
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip')).toBeFocused();
    await capture(page, info, `${simulation}-skip-focus`, page.locator('.skip'));
    await page.keyboard.press('Enter');
    for (let i = 0; i < 30 && !(await page.locator('#reveal').evaluate(el => el === document.activeElement)); i++)
      await page.keyboard.press('Tab');
    await expect(page.locator('#reveal')).toBeFocused();
    await capture(page, info, `${simulation}-card-focus`, page.locator('.actual-card-preview'));
    await session.detach();
  });
}
