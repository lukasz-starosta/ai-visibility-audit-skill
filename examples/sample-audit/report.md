# Sample Audit Report

## Sitewide Blockers

- `robots.txt` blocks `/docs/` even though 12 docs URLs appear in the sitemap.
- Important product docs return inconsistent canonical targets across localized variants.

## Repeated Page Patterns

- Comparison pages use dense prose blocks instead of question-led sections.
- FAQ or Q&A schema is missing on key comparison templates.

## Page-Level Evidence

- `/pricing` has weak extractable answers and no structured heading flow.
- `/docs/setup` contains outdated screenshots and a stale `Last updated` date.
- `/compare/acme-vs-contoso` lacks a concise verdict section and supporting evidence table.

## Unknowns

- Prompt coverage data is not available in this artifact set.
- No crawl logs were included, so user-agent-specific failures are inferred from static files only.

## Next Actions

1. Unblock `/docs/` for the target user agents.
2. Update the comparison page template with question-led sections and FAQ schema.
3. Rewrite `/pricing` and `/compare/*` pages for answer extraction and evidence density.
