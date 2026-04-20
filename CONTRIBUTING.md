# Contributing

## Scope

This repo contains the public skill surface and documentation for AI Visibility
Audit by PromptScout.

## Before Opening A Change

- keep the skills dependency-free
- keep the public contract machine-readable
- preserve the artifact-first workflow
- document any behavior that would diverge from the shared audit contract

## Local Checks

Run:

```bash
npm run check
npm test
```

This validates public doc links, fixture manifests, semantic contract
invariants, and the contract-focused regression tests.
