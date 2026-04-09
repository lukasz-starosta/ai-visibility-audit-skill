# AI Visibility Audit by PromptScout

Markdown-only skills for reviewing AI visibility audit artifacts and turning
them into concrete remediation work.

This repo is intentionally dependency-free. It does not contain the private
PromptScout audit runtime or the future public CLI wrapper. It is designed for:

- artifact review
- remediation planning
- optional CLI-assisted runs when the CLI is already available

## Included skills

### Codex

- `codex/ai-visibility-audit/SKILL.md`
- `codex/ai-visibility-audit-remediation/SKILL.md`

### Claude

- `claude/ai-visibility-audit/SKILL.md`
- `claude/ai-visibility-audit-remediation/SKILL.md`

## Quick Start

1. Install the Codex or Claude skill files from [docs/installation.md](docs/installation.md).
2. Open the sample artifacts in [`examples/sample-audit/`](examples/sample-audit/).
3. Paste one of the prompts from [docs/usage.md](docs/usage.md) into your agent.

## Example Prompt

```text
Use the ai-visibility-audit skill to review the artifacts in
examples/sample-audit/. Separate sitewide blockers, repeated page patterns,
page-level evidence, unknowns, and next actions. Quote concrete counts and file
paths.
```

Expected outputs are illustrated in:

- [`examples/sample-audit/report.json`](examples/sample-audit/report.json)
- [`examples/sample-audit/report.md`](examples/sample-audit/report.md)
- [`examples/sample-audit/remediation-plan.md`](examples/sample-audit/remediation-plan.md)

## Docs

- install: [docs/installation.md](docs/installation.md)
- usage: [docs/usage.md](docs/usage.md)
- contributing: [CONTRIBUTING.md](CONTRIBUTING.md)
- security: [SECURITY.md](SECURITY.md)
- changelog: [CHANGELOG.md](CHANGELOG.md)

## Boundary

This repo is the public skills surface only.

- private runtime stays in PromptScout internals
- the public CLI should live in its own wrapper repo
- this repo stays dependency-free and artifact-first
