const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
async function audit(page, info, state) {
  await page.evaluate(() => document.fonts.ready);
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  await info.attach(state, { body: JSON.stringify(result, null, 2), contentType: 'application/json' });
  expect.soft(result.violations, `${state}: see axe JSON for criteria and affected elements`).toEqual([]);
}
for (const route of ['index.html', 'support.html', 'privacy.html', 'sources.html']) {
  test(`${route}: WCAG scan and narrow reflow`, async ({ page }, info) => {
    await page.goto('/' + route);
    await audit(page, info, 'initial');
    await page.setViewportSize({ width: 320, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await audit(page, info, '320px');
  });
}
test('home: all learning approaches, both card faces and expanded FAQs', async ({ page }, info) => {
  await page.goto('/');
  for (const mode of ['media', 'goals', 'class']) {
    const button = page.locator(`[data-mode="${mode}"]`);
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await audit(page, info, mode);
  }
  await page.getByRole('button', { name: 'Show card front' }).click();
  await expect(page.locator('#app-card-image')).toHaveAttribute('src', 'assets/app-card-front.png');
  await audit(page, info, 'card-front');
  await page.getByRole('button', { name: 'Show card back' }).click();
  await expect(page.locator('#app-card-image')).toHaveAttribute('src', 'assets/app-card-back.png');
  for (const summary of await page.locator('summary').all()) await summary.click();
  await audit(page, info, 'card-back-expanded-faqs');
});
test('keyboard: skip link, controls and FAQ reachable with visible focus', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip')).toBeFocused();
  await expect(page.locator('.skip')).toBeInViewport();
  await page.keyboard.press('Enter');
  const visited = new Set();
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press('Tab');
    const active = page.locator(':focus');
    const identity = await active.evaluate(el => ({ id: el.id, mode: el.dataset.mode, tag: el.tagName,
      focusVisible: el.matches(':focus-visible'), outline: getComputedStyle(el).outlineStyle }));
    if (identity.id === 'reveal' || identity.mode || identity.tag === 'SUMMARY') {
      expect(identity.focusVisible).toBe(true);
      expect(identity.outline).not.toBe('none');
      await expect(active).toBeInViewport();
      if (identity.id === 'reveal') {
        await page.keyboard.press('Enter');
        await expect(page.locator('#app-card-image')).toHaveAttribute('src', 'assets/app-card-front.png');
        visited.add('card');
      } else if (identity.mode) {
        await page.keyboard.press('Space');
        await expect(active).toHaveAttribute('aria-pressed', 'true');
        visited.add(identity.mode);
      } else {
        await page.keyboard.press('Enter');
        await expect(active.locator('..')).toHaveAttribute('open', '');
        visited.add('faq');
        break;
      }
    }
  }
  expect([...visited].sort()).toEqual(['card', 'class', 'faq', 'goals', 'media']);
});

test('decorations and labels have appropriate accessibility semantics', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('group', { name: 'Class notes, a subtitle list and a favourite deck share one word history' })).toBeVisible();
  for (const decoration of await page.locator('.feature-icon, .knowledge-check').all())
    await expect(decoration).toHaveAttribute('aria-hidden', 'true');
  await expect(page.getByRole('link', { name: 'Find your way to learn', exact: true })).toBeVisible();
  for (const mode of ['media', 'goals', 'class']) {
    await page.locator(`[data-mode="${mode}"]`).click();
    for (const label of await page.locator('.eyebrow, #source-label').all()) {
      const text = await label.textContent();
      expect(text).not.toBe(text.toUpperCase());
      await expect(label).toHaveCSS('text-transform', 'uppercase');
    }
  }
  for (const route of ['support.html', 'privacy.html', 'sources.html']) {
    await page.goto('/' + route);
    await expect(page.locator('.eyebrow')).toHaveText('Youcabulary');
    await expect(page.locator('.eyebrow')).toHaveCSS('text-transform', 'uppercase');
  }
});

test('decorative separators are absent from screen-reader content', async ({ page }) => {
  for (const route of ['index.html', 'support.html', 'privacy.html', 'sources.html']) {
    await page.goto('/' + route);
    expect(await page.locator('body').ariaSnapshot()).not.toContain('·');
    const separators = page.locator('.text-separator');
    expect(await separators.count()).toBeGreaterThan(0);
    for (const separator of await separators.all()) {
      await expect(separator).toHaveText('·');
      await expect(separator).toHaveAttribute('aria-hidden', 'true');
    }
  }
});

test('promise stars are visual decoration, not generated text', async ({ page }) => {
  await page.goto('/');
  for (const promise of await page.locator('.promise-strip > span').all()) {
    expect(await promise.evaluate(el => getComputedStyle(el, '::before').content)).toBe('""');
  }
  const snapshot = await page.locator('.promise-strip').ariaSnapshot();
  expect(snapshot).not.toContain('✦');
  for (const text of ['Your interests set the direction.', 'Your knowledge comes with you.', 'Your pace is the right pace.'])
    expect(snapshot).toContain(text);
});
