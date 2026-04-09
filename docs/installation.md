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

## Notes

- the skills work without Python or extra dependencies
- the skills prefer existing audit artifacts
- when the CLI is already available, the skills may use it as an optional helper
