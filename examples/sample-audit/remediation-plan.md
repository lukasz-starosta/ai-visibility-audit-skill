# Sample Remediation Plan

## Crawl And Access Blockers

- Fix `robots.txt` so `/docs/` is not blocked for the target AI crawlers.
- Re-run the crawl after the robots change to confirm sitemap URLs are reachable.

## Diagnosis Groups

- Treat the thin JS-shell behavior on `/pricing`, `/product/ai-monitoring`, and
  `/product/competitors` as one rendering-pipeline root cause.
- Validate server-rendered HTML, visible heading structure, and answer-ready text
  before opening page-specific follow-up tasks.

## Template Fixes

- Add FAQ or Q&A schema to comparison templates.
- Introduce question-led sections, verdict summaries, and evidence tables on `/compare/*`.

## Core-Page Upgrades

- Refresh `/docs/setup` with current screenshots and a visible update timestamp.
- Re-check `/pricing` after the rendering fix; only open page-specific copy work if
  the extractable-answer problem remains.

## Low-Value Noise Handling

- Down-rank `/_cdn-cgi/*`, `/cart`, `/checkout`, and stale legacy URLs in the
  narrative unless they affect important crawl paths or still rank externally.
- Capture cleanup work for those URLs separately from the core remediation track.

## Prompt-Coverage Gaps And Optional Signals

- None confirmed from the sample artifact set.
- If prompt coverage becomes available later, map prompt categories to owned pages before adding new content.
- Missing `llms.txt` is optional follow-up work and should not outrank core crawl,
  rendering, or template fixes.
