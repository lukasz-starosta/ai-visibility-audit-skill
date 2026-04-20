# Markdown-Only Audit Report

## Sitewide Blockers

- `/docs/` is blocked in `robots.txt`.

## Core-Page Failures

- `/pricing` exposes weak answer-shaped text before hydration.

## Unknowns

- No JSON export was bundled with this fixture.

## Next Actions

1. Unblock `/docs/`.
2. Re-export a structured JSON report if downstream tooling needs machine-readable evidence.
