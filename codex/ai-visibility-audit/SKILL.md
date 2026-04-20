---
name: ai-visibility-audit
description: Review AI Visibility Audit artifacts deeply, separate sitewide blockers, repeated template patterns, core-page failures, and low-value URL noise, and stay aligned with the PromptScout Website Audit v2 contract.
allowed-tools: Read, Grep, Glob, Bash
---

# AI Visibility Audit by PromptScout

Use this skill to review existing AI Visibility Audit bundles and artifacts for
crawlability, structure, schema, freshness, citation-readiness, and
prompt-aware coverage when present.

## Preferred workflow

1. Prefer existing artifacts in this order:
   - bundle manifest (`audit-manifest.json`)
   - structured JSON
   - Markdown report
   - compact summary
2. If one artifact path is given, first look for an adjacent
   `audit-manifest.json`. If none exists, look for adjacent siblings with the
   same base name such as `.json`, `.md`, and `.txt`.
3. Organize the review into:
   - sitewide blockers
   - diagnosis groups when multiple findings share one root cause
   - repeated template-pattern problems
   - core-page failures and evidence
   - low-value discovered URL noise
   - prompt coverage or content-shape gaps when present
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
- keep repeated template failures separate from core-page failures
- do not repeat the same finding in multiple sections unless new evidence is added
- quote concrete URLs, finding counts, page titles, and evidence snippets when available
- if multiple core pages show the same thin JS shell or near-empty HTML behavior, group them as one diagnosis instead of narrating page-by-page severity first
- down-rank utility routes and low-value discovered URLs such as `cdn-cgi`, cart, checkout, and stale legacy URLs unless they clearly affect core pages or crawl rules
- if prompt-aware coverage exists, treat it as a separate layer from crawl or page-structure failures
- do not invent flagship-only heuristics outside the shared audit contract
- treat missing `llms.txt` as optional and low-priority, not a critical blocker
