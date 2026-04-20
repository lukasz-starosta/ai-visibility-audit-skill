# Contracts

This repo is the public contract and fixture layer for AI Visibility Audit by
PromptScout.

It is intended to be consumed by:

- PromptScout exports
- Codex and Claude skill workflows
- future public CLI wrappers
- future MCP wrappers

The private PromptScout runtime remains elsewhere. Downstream wrappers should
reuse these public artifact contracts instead of re-defining audit semantics.

See [mcp-wrapper-v1.md](mcp-wrapper-v1.md) for the implementation-ready spec for
the separate MCP repo.

## Canonical Files

- `contracts/audit-manifest.schema.json`
- `contracts/audit-report.schema.json`
- `contracts/remediation-plan.schema.json`

## Bundle Entry Point

Each fixture bundle should expose an `audit-manifest.json` file as the stable
entry point.

Required manifest fields:

- `manifestVersion`
- `bundleName`
- `site`
- `generatedAt`
- `artifacts`

Required artifact rule:

- at least one of `auditReportJson` or `auditReportMarkdown` must exist

Supported artifact keys:

- `auditReportJson`
- `auditReportMarkdown`
- `remediationPlanJson`
- `remediationPlanMarkdown`
- `compactSummaryText`

## Versioning

Contract versions use semver.

- major: breaking field removals, renamed keys, changed required semantics
- minor: additive backwards-compatible fields or artifacts
- patch: wording, examples, docs, and non-breaking fixture clarifications

If Website Audit v2 semantics change in a way that affects the public narrative
contract, update the schemas, fixtures, and parity notes together.

## Fixture Matrix

The repo includes a fixture matrix so wrappers can test compatibility against
more than one happy path:

- `examples/sample-audit/` - full reference bundle
- `examples/fixtures/json-only/` - structured-only bundle
- `examples/fixtures/markdown-only/` - markdown-only bundle
- `examples/fixtures/prompt-coverage-present/` - prompt-aware evidence present
- `examples/fixtures/noisy-discovered-urls/` - noise-heavy crawl output
- `examples/fixtures/unknown-heavy/` - sparse evidence / uncertainty-heavy case
- `examples/fixtures/clean-low-issue/` - near-healthy low-issue case

## Validation

`npm run check` validates:

- doc links
- manifest integrity
- schema-oriented report and remediation invariants
- fixture bundle coverage

`npm test` runs the contract-focused regression tests.
