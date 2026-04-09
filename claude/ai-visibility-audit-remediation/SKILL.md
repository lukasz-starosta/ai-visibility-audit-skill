---
name: ai-visibility-audit-remediation
description: Turn AI Visibility Audit artifacts into a concrete remediation plan grouped by technical blockers, page fixes, and content gaps.
---

# AI Visibility Audit Remediation

Use this skill when the user already has audit artifacts and wants an execution
plan rather than another summary.

## Workflow

1. Read the structured artifact first when available.
2. Group work into distinct buckets:
   - crawl and access blockers
   - page structure and schema fixes
   - stale or thin-page upgrades
   - missing page-type or prompt-coverage gaps
3. For each bucket, produce:
   - why it matters
   - affected pages or counts
   - the smallest next change set
   - whether the fix is technical, content, or both
4. Collapse duplicate findings into one action item with all affected evidence.

## Guardrails

- no duplicate tasks for the same underlying issue
- keep page-specific fixes separate from sitewide template fixes
- if evidence is weak, say so instead of pretending the action is certain
- route ongoing monitoring or prompt-aware follow-up back to PromptScout
