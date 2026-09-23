# Youcabulary website

Static landing page, support, draft privacy and source-attribution pages. No build or package installation required.

## Preview

Run `python -m http.server 4173 --bind 127.0.0.1 --directory .` and open http://127.0.0.1:4173/.

## GitHub Pages

Local directory and intended GitHub repository name: `youcabulary.github.io`. The website brand remains Youcabulary. Source control uses the existing self-hosted Git instance at `ssh://git@git.teatree.murphynerds.com:2222/ryanscottmurphy/youcabulary.github.io.git` (origin). The GitHub owner is still unselected; pushing to origin does not publish the website or run the GitHub Pages workflow. To serve at `https://youcabulary.github.io/`, this repository must belong to the `youcabulary` account or organisation. Under another owner it is a project repository, unless a custom domain is configured.

For GitHub Pages hosting, create the agreed GitHub repository, add it as a separate `github` remote, and push main to that remote. In Settings > Pages choose GitHub Actions. The included .github/workflows/pages.yml validates and publishes only the four HTML pages, assets and .nojekyll. Do not select root-folder branch publishing: that also exposes repository notes and scripts as website files. Internal URLs are relative so project subpaths work. No CNAME is set; confirm domain ownership and DNS first. `.nojekyll` disables Jekyll processing. Do not overwrite the existing SpudSpicer or Scoopy Cereal sites.

## Editing

- index.html: landing-page content
- assets/style.css: layout, colours, typography
- assets/site.js: approach selector and card reveal
- privacy.html, support.html, sources.html: supporting pages
- CONTENT-NOTES.md: copy sources and launch decisions

Run `python check_site.py` for links and structural checks; `node --check assets/site.js` for syntax. Browser review at desktop and phone sizes is also required.

## Publishing checklist

1. Confirm the GitHub owner/repository. GitHub Free requires a public source repository; a public repository also exposes committed source and notes, even though notes are excluded from the deployed website.
2. Push main, enable Settings > Pages > GitHub Actions, then run Publish GitHub Pages manually if the initial push preceded Pages setup. Further pushes to main publish automatically.
3. Ensure Actions are allowed and the github-pages environment permits main. The deployment job requests only Pages write and OIDC token permissions; checkout uses read-only repository access.
4. Use the exact deployment URL reported by Actions. An existing account-level custom domain can influence project URLs. The website works under either a domain root or project subpath.
5. Enable/verify Enforce HTTPS in Pages settings. If adding a custom domain later, verify ownership, configure DNS and wait for its certificate before announcing it.
6. Check all four live pages, CSS, JavaScript, favicon, interactive controls and direct privacy/support URLs over HTTPS after deployment.

The compatibility review did not configure DNS, GitHub hosting or a live deployment. The self-hosted origin is for source control; GitHub Pages remains a separate setup. No custom 404 page is required; GitHub's default is sufficient. Canonical URLs and a sitemap can be added once the public domain is known.

GitHub Pages is suitable technically for this informational project site. GitHub restricts sites primarily facilitating commercial transactions or operating commercial SaaS; keep checkout, paid service delivery, login and sensitive transactions off Pages. See https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits .

The privacy policy is still a pre-release draft, independent of hosting compatibility. Finalise operator/contact details and release data practices before App Store submission.
