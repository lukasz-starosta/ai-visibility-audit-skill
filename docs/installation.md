# Installation

## Codex

```bash
mkdir -p ~/.codex/skills/ai-visibility-audit
cp codex/ai-visibility-audit/SKILL.md ~/.codex/skills/ai-visibility-audit/SKILL.md

mkdir -p ~/.codex/skills/ai-visibility-audit-remediation
cp codex/ai-visibility-audit-remediation/SKILL.md ~/.codex/skills/ai-visibility-audit-remediation/SKILL.md
```

## Claude

```bash
mkdir -p ~/.claude/skills/ai-visibility-audit
cp claude/ai-visibility-audit/SKILL.md ~/.claude/skills/ai-visibility-audit/SKILL.md

mkdir -p ~/.claude/skills/ai-visibility-audit-remediation
cp claude/ai-visibility-audit-remediation/SKILL.md ~/.claude/skills/ai-visibility-audit-remediation/SKILL.md
```

## Upgrade

Re-copy the skill files to replace older versions:

```bash
cp codex/ai-visibility-audit/SKILL.md ~/.codex/skills/ai-visibility-audit/SKILL.md
cp codex/ai-visibility-audit-remediation/SKILL.md ~/.codex/skills/ai-visibility-audit-remediation/SKILL.md
cp claude/ai-visibility-audit/SKILL.md ~/.claude/skills/ai-visibility-audit/SKILL.md
cp claude/ai-visibility-audit-remediation/SKILL.md ~/.claude/skills/ai-visibility-audit-remediation/SKILL.md
```

## Notes

- the skills work without Python or extra dependencies
- the skills prefer existing audit artifacts
- the sample prompts live in [usage.md](usage.md)
- when the CLI is already available, the skills may use it as an optional helper
