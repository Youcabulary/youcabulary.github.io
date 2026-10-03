# Youcabulary website copy principles

A review guide for future edits. Updated 4 October 2026.

## The promise to protect

Youcabulary fits the way you learn. Lead with the reader’s interests, independence and progress. Explain the product clearly underneath that promise.

Keep desire-led headings such as **Less one-size-fits-all. More you.**, **New deck. Same growing knowledge.** and **Build your own rhythm.** Search clarity belongs in supporting sentences and factual answers; it does not require replacing these headings with keyword lists.

## Principles adapted from the playbook

Source: Bartek Marzec, *Product Design Playbook V2.0*, supplied at `D:/Development/youcabulary/ProductDesignPlaybook_V2.0.pdf`. Page references below are physical PDF pages, counting the cover. These are our applications of the ideas, not copied rules or evidence that the website will improve conversion.

| Principle | Source | Application to this website |
| --- | --- | --- |
| Start with the outcome the reader wants. | JTBD Copywriting, p. 67 | Lead with remembering meaningful words, keeping discoveries and learning at a suitable pace. Follow with the feature that makes the benefit credible. |
| Make the next action predictable. | JTBD Copywriting, p. 67 | A button should explain the next step. Exploration leads to learning approaches; contact leads to a clearly identified email contact. |
| Show value early and remove dead ends. | Time to Value, pp. 82–83 | Explain the promise immediately, show an authentic card and offer a useful next step. Do not offer a download before one exists. |
| Reveal detail when it becomes useful. | Progressive Disclosure, p. 92 | Keep the main story brief; use FAQs for limitations and practical questions. Availability must remain visible outside the FAQ. |
| Respond to the reader’s stated intent. | Intent Mirroring, pp. 137–138 | The approach selector lets readers explore their own interests. This is explicit selection, not behavioural tracking or a claim that the app automatically diagnoses a learning style. |
| Let people inspect something real. | Sandbox Experience, p. 147 | The card front/back preview uses actual app captures. This is a visual preview, not a functioning app trial. |
| Keep progress encouraging and honest. | Success Moments, p. 52 | Acknowledge effort without streak guilt, invented achievements or guaranteed learning outcomes. |

We selectively apply the playbook to a pre-release marketing site. Product onboarding, contact syncing, scarcity, paywalls and gamification tactics are not requirements for this website.

## Copy structure

1. **Desire:** a short heading about what the reader wants.
2. **Explanation:** a concrete sentence connecting that desire to documented behaviour.
3. **Evidence:** an authentic preview or a specific example, clearly labelled where illustrative.
4. **Next step:** one prominent action appropriate to that section.

For example, “Your decks have a way in. And out.” expresses freedom. The following sentence explains Anki-compatible import/export. Keep the compatibility limitations in the FAQ rather than implying full Anki equivalence.

Use warm, plain English, short sentences and concrete verbs. Talk to “you”. Avoid inflated claims, jargon in headlines, rigid learner labels and pressure to keep up. Personalisation means choice of material, tools and routine unless a stronger behaviour is verified in the app.

## Current calls to action

| Location | Label | Destination and reader expectation |
| --- | --- | --- |
| Header | Find your way | Opens the home page’s learning-approach section. |
| Hero | Find your way to learn | Moves to the learning-approach section; does not start onboarding. |
| Approach choices | I learn through what I love / I like a little structure / I want to keep what I find | Changes the example in place. These choices are exploratory, not permanent profiles. |
| Card preview | Show card front / Show card back | Switches authentic screenshots; no app functionality is implied. |
| Closing section | Talk about your learning needs | Opens the support page at its email contact section. Adjacent text explains that contact happens by email. |
| Support contact | developer@spudspicer.com | Opens the reader’s mail app. Ownership must be confirmed before publication. |

Prefer a specific action to “Learn more” or “Submit” when the destination can be stated simply. A functional control can use a literal label: clarity matters more than making every label emotional. Do not make release-status text resemble a download button.

## Product truth is a separate requirement

The app’s current `requirements.md`, README and implemented behaviour determine what we may claim. The playbook informs presentation, not product facts.

- State that the app is in development until public releases exist.
- Do not invent a waitlist, release date, pricing, reviews, user counts or a signup flow.
- Japanese and Mandarin Chinese do not have identical toolkits. Preserve language/platform qualifications.
- Core study uses local data; optional connected features need a connection. Do not claim everything works offline or promise cross-device sync.
- Anki-compatible import/export is not complete compatibility with every Anki feature.
- Do not promise automatic adaptation, instant fluency or guaranteed retention.
- Keep actual app screenshots unchanged. Surrounding marketing callouts must remain outside the app image, and sample vocabulary must remain identified.
- Privacy text is still a pre-release draft. Copy changes cannot establish App Store compliance.

## Search and answer-engine clarity

Support the reader first. Use unique page descriptions and descriptive titles; retain the home page’s desire-led title. The visible FAQ defines Youcabulary by name, product category, languages and release status in a self-contained answer. Important claims and answers must exist in HTML without requiring JavaScript, even when an interactive selector offers additional examples.

Avoid keyword repetition, hidden machine-only claims and unsupported schema fields. Metadata must agree with the page. There is no guaranteed AI citation or special AEO shortcut.

Once the real public URL is confirmed, add canonical URLs, a sitemap and appropriate indexing setup. Do not derive a production domain from the local folder name. Add structured data only when its facts can be verified; never invent prices or ratings to qualify for rich results.

Relevant official guidance:
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: software app structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app)

## Review checklist for an edit

- Does the heading preserve a recognisable reader desire?
- Does the supporting copy explain what the app actually does?
- Can each factual claim be traced to current product documentation or behaviour?
- Does the CTA label match what happens after activation?
- Is the next step usable now, with release status clear?
- Is there one clear primary action in this section?
- Are examples and screenshots honest about what is real and illustrative?
- Can a new reader understand the page without knowing the brand?
- Does the copy remain readable on a small screen and with JavaScript disabled?
- Are page metadata, visible answers and product limitations consistent?

Record a proposed edit as: **reader need → new wording → factual evidence → CTA destination → mobile check**. If an edit changes a product claim, recheck the app instead of relying on this guide’s snapshot.
