# Deployment review checklist

Use before pushing a release to GitHub main: that push automatically starts publication. Record the reviewer, date and revision in the PR or release notes. GitHub Actions gates automated checks only; it cannot establish manual sign-off.

## Automated checks

- [ ] Run `python check_site.py`, `node --check assets/site.js` and `npm run test:a11y`.
- [ ] Open `npm run test:a11y:report` (or download the CI accessibility-report artifact). Review the axe JSON attachments, including `incomplete` results; a green run does not mean these were manually resolved.
- [ ] Investigate failures by criterion and affected element. Fix and rerun; do not suppress rules or exclude elements simply to get a passing build.

## Manual accessibility review — WCAG 2.2 Level AA

Review home, support, privacy and sources, plus learning approaches, both card faces and expanded FAQs. For unchanged areas, reference the previous recorded review and explain the scope of retesting.

- [ ] Keyboard only: navigation, skip link, approaches, card toggle, FAQ and contact links work; focus is visible, logical and not obscured, with no traps.
- [ ] Screen reader: test a named browser/reader combination (for example NVDA/Chrome or VoiceOver/Safari). Check headings/landmarks, image alternatives, button states, dynamic announcements, Japanese pronunciation/language markup and email link names.
- [ ] Zoom to 200% text size and 400% browser zoom; test narrow layouts and WCAG text-spacing overrides. Check clipping, overlap and access to all content. The automated 320px check is not a full zoom test.
- [ ] Visually review text and control contrast, focus indicators, touch targets and colour-independent state cues, especially tilted cards and callouts that automated contrast analysis may not resolve.
- [ ] Check reduced-motion preferences and any animation introduced by the release.
- [ ] Assess every applicable A/AA criterion in the W3C reference. Record pass, fail, not applicable with reason, or not tested. Do not label the site conformant while required checks remain unresolved.

## Pre-launch attributions

- [ ] Update the website Credits page (`sources.html`) against the shipping app's `attributions.md`, dependency licences and final resource inventory. Confirm required acknowledgements, copyright notices, source/licence links and descriptions of adaptations are accurate.
- [ ] Verify complete release-specific notices are accessible inside the app. Keep website credits concise, but retain any acknowledgements specifically required in publicity or on the product website.
- [ ] Recheck website screenshots, sample text and other assets for attribution obligations if their source changes. Confirm all credit and licence links work.

## Publish and verify

- [ ] Ensure the intended commits are on both remotes as appropriate; only the GitHub push deploys.
- [ ] Confirm the Publish GitHub Pages workflow succeeds for the intended revision.
- [ ] Check the live HTTPS home page and all supporting pages, assets, keyboard controls and email destinations.
- [ ] Check custom-domain redirects and HTTPS when domain settings change.

## Review record

- Revision / date / reviewer:
- Browser, operating system and assistive technology:
- Automated report:
- Pages and states reviewed:
- Manual findings: criterion, reproduction steps, affected element, severity, fix and retest evidence:
- Inconclusive checks and remaining limitations:
- Release decision:

References: [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/), [W3C evaluation guidance](https://www.w3.org/WAI/test-evaluate/), [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing).
