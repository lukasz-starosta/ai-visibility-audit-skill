# AI Visibility Audit Skill

Markdown-only skills for `AI Visibility Audit by PromptScout`.

This repo is intentionally dependency-free. It does not contain the private
PromptScout audit runtime or the CLI wrapper. It is designed for:

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

## Installation

See [docs/installation.md](/Users/lukasz/Desktop/Projekty/PromptScout/ai-visibility-audit-skill/docs/installation.md).

## Boundary

This repo is the public skills surface only.

- private runtime stays in PromptScout internals
- the public CLI should live in its own wrapper repo
- this repo stays dependency-free and artifact-first
