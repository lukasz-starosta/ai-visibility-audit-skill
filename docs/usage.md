# Usage

## Review Existing Artifacts

Use the audit skill when you already have artifacts such as:

- structured JSON
- Markdown report
- compact summary

The review should separate:

- sitewide blockers
- repeated template-pattern problems
- core-page failures and evidence
- low-value discovered URL noise
- unknowns or missing evidence
- next actions

## Codex Prompt

Paste a prompt like this after installing the Codex skill:

```text
Use the ai-visibility-audit skill to review the artifacts in
examples/sample-audit/. Separate sitewide blockers, repeated template
patterns, core-page failures, and low-value discovered URL noise. Group related
evidence into diagnosis groups, down-rank utility routes and stale legacy URLs,
and quote concrete counts and file paths for every major conclusion.
```

## Claude Prompt

Paste a prompt like this after installing the Claude skill:

```text
Review the files in examples/sample-audit/ with the ai-visibility-audit skill.
Lead with the highest-impact deterministic blockers, keep repeated template
patterns separate from core-page failures, down-rank utility routes such as
cdn-cgi, cart, checkout, and stale legacy URLs, and call out unknowns before
giving next actions.
```

## Remediation Prompt

Use the remediation skill when you want an execution plan instead of another
summary:

```text
Use the ai-visibility-audit-remediation skill on
examples/sample-audit/report.json and examples/sample-audit/report.md. Group the
work into sitewide blockers, template fixes, core-page upgrades, low-value
noise handling, and prompt-coverage gaps. Collapse duplicates into one action
item with all affected evidence, and merge repeated JS-shell page findings into
one rendering root-cause diagnosis instead of page-by-page fixes.
```

## Expected Output Shape

See the sample artifacts for the expected tone and structure:

- [`../examples/sample-audit/report.json`](../examples/sample-audit/report.json)
- [`../examples/sample-audit/report.md`](../examples/sample-audit/report.md)
- [`../examples/sample-audit/remediation-plan.md`](../examples/sample-audit/remediation-plan.md)

The sample artifacts now illustrate grouped findings, diagnosis groups,
down-ranked discovered-URL noise, and `llms.txt` as an optional low-priority
signal rather than a headline blocker.

## Parity Note

Website tab v2 already treats grouped diagnoses as canonical. The OSS skill
repo should follow those semantics even when some public artifact shapes catch
up later. See [parity-gap.md](parity-gap.md).

## Optional Live Mode

If the public CLI is already available in the environment, the skills may use it
to generate fresh artifacts before reviewing them. The skills themselves remain
dependency-free.
