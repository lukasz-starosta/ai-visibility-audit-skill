# AI Visibility Audit by PromptScout

Public contract files, fixtures, and skills for reviewing AI visibility audit
artifacts and turning them into concrete remediation work.

This repo is intentionally dependency-free. It does not contain the private
PromptScout audit runtime or the future public CLI or MCP wrappers. It is
designed for:

- public artifact contracts
- fixture bundles for wrapper verification
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
2. Start from [`examples/sample-audit/audit-manifest.json`](examples/sample-audit/audit-manifest.json) or one of the edge-case bundles in [`examples/fixtures/`](examples/fixtures/).
3. Paste one of the prompts from [docs/usage.md](docs/usage.md) into your agent.

## Example Prompt

```text
Use the ai-visibility-audit skill to review the bundle described by
examples/sample-audit/audit-manifest.json. Separate sitewide blockers,
repeated template patterns, core-page failures, and low-value discovered URL
noise. Group related evidence into diagnosis groups, down-rank utility or stale
legacy URLs, and quote concrete counts and file paths.
```

Expected outputs are illustrated in:

- [`examples/sample-audit/audit-manifest.json`](examples/sample-audit/audit-manifest.json)
- [`examples/sample-audit/report.json`](examples/sample-audit/report.json)
- [`examples/sample-audit/report.md`](examples/sample-audit/report.md)
- [`examples/sample-audit/remediation-plan.json`](examples/sample-audit/remediation-plan.json)
- [`examples/sample-audit/remediation-plan.md`](examples/sample-audit/remediation-plan.md)

## Docs

- install: [docs/installation.md](docs/installation.md)
- usage: [docs/usage.md](docs/usage.md)
- contracts: [docs/contracts.md](docs/contracts.md)
- parity gap: [docs/parity-gap.md](docs/parity-gap.md)
- contributing: [CONTRIBUTING.md](CONTRIBUTING.md)
- security: [SECURITY.md](SECURITY.md)
- changelog: [CHANGELOG.md](CHANGELOG.md)

## Current Semantics

Public OSS artifacts should mirror the Website Audit v2 narrative contract:

- lead with sitewide blockers and grouped diagnoses
- separate repeated template issues from core-page failures
- down-rank low-value discovered URL noise such as utility routes, `cdn-cgi`,
  cart, checkout, and stale legacy URLs
- treat `llms.txt` as optional and low-priority unless stronger evidence says it
  matters for the current audit

See [docs/parity-gap.md](docs/parity-gap.md) for the explicit note that Website
tab v2 already uses grouped semantics as the canonical contract.

## Boundary

This repo is the public contract, fixtures, and skills surface.

- private runtime stays in PromptScout internals
- the public CLI should live in its own wrapper repo
- the MCP server should live in its own wrapper repo
- this repo stays dependency-free and artifact-first
