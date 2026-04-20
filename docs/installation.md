# Installation

## Generic Agent Skills Clients

If your client supports the Agent Skills format directly, prefer the canonical
`skills/` sources:

```bash
mkdir -p ~/.agents/skills/ai-visibility-audit
cp skills/ai-visibility-audit/SKILL.md ~/.agents/skills/ai-visibility-audit/SKILL.md

mkdir -p ~/.agents/skills/ai-visibility-audit-remediation
cp skills/ai-visibility-audit-remediation/SKILL.md ~/.agents/skills/ai-visibility-audit-remediation/SKILL.md
```

## Codex

The `codex/` wrappers are generated from the canonical `skills/` sources:

```bash
mkdir -p ~/.codex/skills/ai-visibility-audit
cp codex/ai-visibility-audit/SKILL.md ~/.codex/skills/ai-visibility-audit/SKILL.md

mkdir -p ~/.codex/skills/ai-visibility-audit-remediation
cp codex/ai-visibility-audit-remediation/SKILL.md ~/.codex/skills/ai-visibility-audit-remediation/SKILL.md
```

## Claude

The `claude/` wrappers are generated from the canonical `skills/` sources:

```bash
mkdir -p ~/.claude/skills/ai-visibility-audit
cp claude/ai-visibility-audit/SKILL.md ~/.claude/skills/ai-visibility-audit/SKILL.md

mkdir -p ~/.claude/skills/ai-visibility-audit-remediation
cp claude/ai-visibility-audit-remediation/SKILL.md ~/.claude/skills/ai-visibility-audit-remediation/SKILL.md
```

## Upgrade

Re-copy the skill files to replace older versions:

```bash
cp skills/ai-visibility-audit/SKILL.md ~/.agents/skills/ai-visibility-audit/SKILL.md
cp skills/ai-visibility-audit-remediation/SKILL.md ~/.agents/skills/ai-visibility-audit-remediation/SKILL.md
cp codex/ai-visibility-audit/SKILL.md ~/.codex/skills/ai-visibility-audit/SKILL.md
cp codex/ai-visibility-audit-remediation/SKILL.md ~/.codex/skills/ai-visibility-audit-remediation/SKILL.md
cp claude/ai-visibility-audit/SKILL.md ~/.claude/skills/ai-visibility-audit/SKILL.md
cp claude/ai-visibility-audit-remediation/SKILL.md ~/.claude/skills/ai-visibility-audit-remediation/SKILL.md
```

## Notes

- the skills work without Python or extra dependencies
- the skills prefer existing audit artifacts
- the preferred artifact entry point is `audit-manifest.json` when a bundle includes one
- the canonical source lives in `skills/`, while `codex/` and `claude/` are generated wrappers
- the sample prompts live in [usage.md](usage.md)
- when the CLI is already available, the skills may use it as an optional helper
