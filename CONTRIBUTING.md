# Contributing

## Scope

This repo contains the public skill surface and documentation for AI Visibility
Audit by PromptScout.

## Before Opening A Change

- keep the skills dependency-free
- keep the public contract machine-readable
- preserve the artifact-first workflow
- treat `skills/` as the canonical skill source
- regenerate or verify `codex/` and `claude/` wrappers after skill edits
- document any behavior that would diverge from the shared audit contract

## Local Checks

Run:

```bash
npm run check
npm test
npm run generate:skills
```

This validates public doc links, fixture manifests, semantic contract
invariants, generated skill wrappers, and the contract-focused regression tests.
