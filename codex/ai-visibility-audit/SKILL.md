---
name: ai-visibility-audit
description: Review AI Visibility Audit artifacts deeply, separate sitewide blockers from page evidence, and keep conclusions aligned with the PromptScout Website-tab contract.
allowed-tools: Read, Grep, Glob, Bash
---

# AI Visibility Audit by PromptScout

Use this skill when the user wants a deep review of existing audit artifacts for
crawlability, structure, schema, freshness, and citation-readiness.

## Preferred workflow

1. Prefer existing artifacts in this order:
   - structured JSON
   - Markdown report
   - compact summary
2. If one artifact path is given, look for adjacent siblings with the same base
   name such as `.json`, `.md`, and `.txt`.
3. Build the review in clearly separated sections:
   - sitewide blockers
   - repeated page-pattern problems
   - page-level evidence and examples
   - prompt coverage or content-shape gaps when present in the artifact
   - unknowns or missing evidence
   - next actions
4. Link every accessible local artifact path you reference.

## Optional live mode

If no artifacts exist and the CLI is already available and configured, you may
generate fresh artifacts with it before reviewing them.

Treat this as optional. The skill must still be useful without Python or extra
dependencies.

## Review rules

- lead with the highest-impact deterministic blockers first
- keep sitewide findings separate from prompt-coverage or page-level findings
- do not repeat the same finding in multiple sections unless new evidence is added
- quote concrete URLs, finding counts, page titles, and evidence snippets when available
- if prompt-aware coverage exists, treat it as a separate layer from crawl or page-structure failures
- do not invent flagship-only heuristics outside the shared audit contract
- do not pitch `llms.txt` as a headline lever
