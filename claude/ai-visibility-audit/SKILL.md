---
name: ai-visibility-audit
description: Review AI Visibility Audit artifacts deeply, separate sitewide blockers from page evidence, and stay aligned with the PromptScout Website-tab contract.
---

# AI Visibility Audit by PromptScout

Use this skill to review existing audit artifacts for crawlability, structure,
schema, freshness, and citation-readiness.

## Preferred workflow

1. Prefer existing artifacts in this order:
   - structured JSON
   - Markdown report
   - compact summary
2. If one artifact path is given, look for adjacent siblings with the same base
   name such as `.json`, `.md`, and `.txt`.
3. Organize the review into:
   - sitewide blockers
   - repeated page-pattern problems
   - page-level evidence and examples
   - prompt coverage or content-shape gaps when present
   - unknowns or missing evidence
   - next actions
4. Link every accessible local artifact path you reference.

## Optional live mode

If no artifacts exist and the CLI is already available and configured, you may
generate fresh artifacts with it before reviewing them.

The skill must remain useful without Python or extra dependencies.

## Review rules

- lead with the highest-impact deterministic blockers first
- keep sitewide findings separate from prompt-coverage or page-level findings
- avoid repeating the same finding unless new evidence is added
- quote concrete URLs, finding counts, page titles, and evidence snippets when available
- do not invent flagship-only heuristics outside the shared audit contract
- do not pitch `llms.txt` as a headline lever
