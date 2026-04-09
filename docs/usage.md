# Usage

## Review Existing Artifacts

Use the audit skill when you already have artifacts such as:

- structured JSON
- Markdown report
- compact summary

The review should separate:

- sitewide blockers
- repeated page-pattern problems
- page-level evidence
- unknowns or missing evidence
- next actions

## Codex Prompt

Paste a prompt like this after installing the Codex skill:

```text
Use the ai-visibility-audit skill to review the artifacts in
examples/sample-audit/. Separate sitewide blockers, repeated page patterns,
page-level evidence, unknowns, and next actions. Quote concrete counts and file
paths for every major conclusion.
```

## Claude Prompt

Paste a prompt like this after installing the Claude skill:

```text
Review the files in examples/sample-audit/ with the ai-visibility-audit skill.
Lead with the highest-impact deterministic blockers, keep page-level evidence
separate from sitewide findings, and call out any unknowns before giving next
actions.
```

## Remediation Prompt

Use the remediation skill when you want an execution plan instead of another
summary:

```text
Use the ai-visibility-audit-remediation skill on
examples/sample-audit/report.json and examples/sample-audit/report.md. Group the
work into crawl and access blockers, page structure and schema fixes, stale or
thin-page upgrades, and prompt-coverage gaps. Collapse duplicates into one
action item with all affected evidence.
```

## Expected Output Shape

See the sample artifacts for the expected tone and structure:

- [`../examples/sample-audit/report.json`](../examples/sample-audit/report.json)
- [`../examples/sample-audit/report.md`](../examples/sample-audit/report.md)
- [`../examples/sample-audit/remediation-plan.md`](../examples/sample-audit/remediation-plan.md)

## Optional Live Mode

If the public CLI is already available in the environment, the skills may use it
to generate fresh artifacts before reviewing them. The skills themselves remain
dependency-free.
