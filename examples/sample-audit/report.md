# Sample Audit Report

## Sitewide Blockers

- `robots.txt` blocks `/docs/` even though 12 docs URLs appear in the sitemap.
- Important product docs return inconsistent canonical targets across localized variants.

## Diagnosis Groups

- Core marketing pages appear to ship a thin JS-rendered HTML shell before app hydration.
  Evidence groups `/pricing`, `/product/ai-monitoring`, and `/product/competitors`
  under one rendering diagnosis instead of treating them as three unrelated failures.

## Repeated Template Patterns

- Comparison pages use dense prose blocks instead of question-led sections.
- FAQ or Q&A schema is missing on key comparison templates across `/compare/*`.

## Core-Page Failures

- `/pricing` exposes only a short shell paragraph and weak extractable answers before hydration.
- `/docs/setup` contains outdated screenshots and a stale `Last updated` date.
- `/compare/acme-vs-contoso` lacks a concise verdict section and supporting evidence table.

## Low-Value Discovered URL Noise

- `/_cdn-cgi/challenge-platform/...` appeared in the crawl output but should be down-ranked as edge utility noise.
- `/cart` and `/checkout` were discovered from old internal links but are not headline blockers for the sitewide narrative.
- `/pricing-2023` resolves as a stale legacy URL variant and should be treated as cleanup, not a core-page failure.

## Unknowns

- Prompt coverage data is not available in this artifact set.
- No crawl logs were included, so user-agent-specific failures are inferred from static files only.
- `llms.txt` is missing, but this remains an optional low-priority signal rather than a critical blocker.

## Next Actions

1. Unblock `/docs/` for the target user agents.
2. Fix the rendering path that serves thin JS shells on core product pages.
3. Update the comparison page template with question-led sections, verdict blocks, and FAQ schema.
4. Refresh `/docs/setup` and other core pages before spending effort on utility-route or legacy-URL noise.
