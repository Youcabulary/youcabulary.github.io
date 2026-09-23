# Content and launch notes

## Product grounding

Read from Youcabulary at 62febde9: README.md; requirements.md sections 0 and 0.1, product tenets, D43 (navigation), D53 (Chinese), D72 (phrases); why-not-anki.md. Current requirements take precedence over older README limitations where documented.

Primary proposition: a language app that fits your learning approach. Supporting propositions: mixed modes, personal source material, one word history across decks, offline reference and core study, FSRS review, Anki interchange, configurable quick access and home screen, progress without default streaks.

Archetypes are product direction, not evidence of automatic adaptation. Copy describes choice and documented features. No promised automatic rearranging, instant fluency, unrestricted Anki compatibility, cross-device sync, or identical features across languages.

## References

Reviewed https://www.langotalk.org/, https://migaku.com/ and https://try.lingopie.com/jp/learn-japanese-by-watching-tv-shows. Used benefit-led opening, product illustration, concrete learning approaches, differentiated benefits, repeated next step and FAQ structure. Original layout and copy; no borrowed testimonials, metrics or artwork. Product card is labelled an interactive concept with sample content.

Existing sites at D:/Development/spudspicer.github.io and D:/Development/scoopycereal.github.io use Jekyll and custom domains; both remotes belong to SpudSpicer. Both list developer@spudspicer.com, reused provisionally pending confirmation. Existing websites were not edited.

## Before publication and App Store submission

- Confirm GitHub owner, repository and optional domain.
- Confirm legal operator and support contact ownership.
- Approve visual direction and copy. Replace concept with real screenshots when suitable.
- Add real download URLs when available.
- Audit shipping app data flows, SDKs, services, retention and exact deletion steps; finalise privacy policy and App Store privacy disclosures together.
- Complete release-specific source attribution from app attributions.md and retain required in-app notices.
- Apple requires working support/contact and privacy URLs, but the site alone does not establish compliance: https://developer.apple.com/app-store/review/ and https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy
- Determine any terms/EULA requirements when distribution and purchase model are established. No invented subscription terms.

New repository has no upstream to fetch/rebase or ahead count until remote and first commit exist. User approved the first visual direction on 23 September 2026; GitHub owner/remote and publication are still pending. No app builds or device deployments changed.

## Validation

Local link/fragment/asset checks and JavaScript syntax passed. Headless Chrome passed no-horizontal-overflow checks at 320, 390, 768 and 1440 pixels, card reveal and learning-mode switching, supporting-page navigation and zero JavaScript runtime errors. Screenshots are in ignored .qa/. Automated image inspection was blocked by the Windows sandbox helper, and the user subsequently approved the first visual direction. Local HTTP preview: http://127.0.0.1:4173/.

## GitHub Pages compatibility review — 23 September 2026

Reviewed current official GitHub Pages entry-file, source, HTTPS, custom-workflow and usage-limit documentation. The site is static and requires no server-side runtime, routing rewrites, secrets or package installation. The deployable set is 8 files, 33,506 bytes, far below the 1 GB Pages limit.

Added .github/workflows/pages.yml: validates on main/manual dispatch, uploads only the four pages plus assets and .nojekyll, then deploys with a build dependency, github-pages environment, Pages write and OIDC permissions. README now selects GitHub Actions instead of root-folder publishing. This prevents notes/check scripts from being served by the website; source files remain visible if the repository is public.

Passed link/fragment checks with exact filename casing, static package boundaries and HTTPS-safe links; JavaScript syntax; headless browser checks at / and /youcabulary-site/ covering all four pages, loaded styling, reveal interaction, approach selector and privacy navigation. No runtime or HTTP errors. Development notes and .git/config were absent from the simulated publishing package. No page design or copy changed in this review.

Remaining external verification: choose/create the GitHub repository, enable Pages/Actions, run the workflow on GitHub, then verify the reported public HTTPS URL. The workflow has not yet executed on GitHub. Privacy content remains draft for release-specific confirmation. GitHub's commercial-use restrictions remain relevant if the site expands into paid service delivery or transactions.

Official references:
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## Repository naming correction

At the user's request, renamed the local folder to D:/Development/youcabulary.github.io and selected youcabulary.github.io as the intended GitHub repository name. Website branding remains Youcabulary. No remote GitHub repository exists or was renamed. Historical subpath test results above retain their original tested URL.
