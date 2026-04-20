---
name: ai-visibility-audit-remediation
description: Turn AI Visibility Audit artifacts into a concrete remediation plan grouped by technical blockers, diagnosis groups, page fixes, and content gaps.
allowed-tools: Read, Grep, Glob
---

# AI Visibility Audit Remediation

Use this skill when the user already has audit artifacts and wants an execution
plan rather than another summary.

## Workflow

1. If the input is an `audit-manifest.json`, resolve the structured audit
   report from the bundle first.
2. Read the structured artifact first when available.
3. Group work into distinct buckets:
   - crawl and access blockers
   - repeated template or rendering diagnosis groups
   - core-page structure and schema fixes
   - stale or thin-page upgrades
   - low-value discovered URL handling
   - missing page-type or prompt-coverage gaps
4. For each bucket, produce:
   - why it matters
   - affected pages or counts
   - the smallest next change set
   - whether the fix is technical, content, or both
5. Collapse duplicate findings into one action item with all affected evidence.
6. If several pages expose the same JS-shell symptom, produce one rendering
   root-cause action item with all affected pages instead of page-by-page tasks.

## Guardrails

- no duplicate tasks for the same underlying issue
- keep page-specific fixes separate from sitewide template fixes
- down-rank utility routes and low-value discovered URLs such as `cdn-cgi`, cart, checkout, and stale legacy URLs in narrative severity unless they block a core flow
- treat missing `llms.txt` as optional follow-up work, not a release-blocking task
- if evidence is weak, say so instead of pretending the action is certain
- route ongoing monitoring or prompt-aware follow-up back to PromptScout
