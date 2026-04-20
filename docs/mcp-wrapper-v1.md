# MCP Wrapper V1

Status: proposed v1 bootstrap spec for the separate MCP repo

This document defines the first MCP wrapper around the public contracts and
skills in this repo. The MCP server itself should live in a separate repo, but
its behavior should be anchored here so the wrapper does not fork the audit
semantics a third time.

## Repo Boundary

This repo remains responsible for:

- public artifact schemas in `contracts/`
- public fixture bundles in `examples/`
- canonical Agent Skills sources in `skills/`
- generated Codex and Claude wrappers
- narrative semantics aligned with PromptScout Website Audit v2

The future MCP repo should be responsible for:

- MCP server bootstrap and transports
- tool, resource, and prompt registration
- local bundle resolution against client roots
- fixture-driven MCP protocol tests
- inspector-based smoke verification

The private PromptScout runtime remains out of scope for the v1 MCP wrapper.
The wrapper must consume exported artifacts and public skills, not direct
private runtime calls.

## V1 Tool Surface

V1 should keep tools deterministic and bundle-oriented. The server should not
hide a separate opaque audit model behind the tools.

### `resolve_audit_bundle`

Purpose:
- accept a user-selected manifest path or artifact path
- normalize it into a bundle view
- resolve sibling artifacts and manifest-relative files
- return warnings for missing optional artifacts or invalid paths

Suggested inputs:
- `path`: absolute path to `audit-manifest.json` or any artifact inside the bundle

Suggested outputs:
- resolved bundle root
- discovered artifact paths
- manifest metadata when present
- parsed report/remediation JSON when present
- validation warnings and missing-artifact notes

### `list_fixture_bundles`

Purpose:
- expose the bundled example matrix for testing, demos, and prompt prototyping

Suggested outputs:
- fixture names
- manifest paths
- short descriptions inferred from manifest notes

### `validate_audit_bundle`

Purpose:
- run the same contract and semantic validation logic used by this repo
- return machine-readable errors for invalid bundles before a prompt tries to
  reason over them

Suggested inputs:
- `path`: manifest path or artifact path

Suggested outputs:
- pass/fail
- manifest validation errors
- report validation errors
- remediation validation errors

## V1 Resources

Resources should expose read-only contract and fixture material that hosts can
load explicitly.

Suggested resource families:

- `audit://contracts/audit-manifest.schema.json`
- `audit://contracts/audit-report.schema.json`
- `audit://contracts/remediation-plan.schema.json`
- `audit://fixtures/<bundle>/audit-manifest.json`
- `audit://fixtures/<bundle>/report.json`
- `audit://fixtures/<bundle>/report.md`
- `audit://fixtures/<bundle>/remediation-plan.json`
- `audit://fixtures/<bundle>/remediation-plan.md`

Resource rules:

- resources are read-only
- resources should mirror the checked-in fixture and contract files exactly
- missing optional artifacts should simply be absent from the resource list

## V1 Prompts

Prompts should carry the workflow logic from the public skills while loading the
resolved bundle context from tools and resources.

### `review-audit-bundle`

Purpose:
- user-invoked prompt for narrative audit review

Inputs:
- `path`

Behavior:
- call `resolve_audit_bundle`
- prefer manifest-driven context
- inject the canonical `skills/ai-visibility-audit/SKILL.md` instructions
- ask the model to produce the grouped review narrative

### `plan-audit-remediation`

Purpose:
- user-invoked prompt for remediation planning

Inputs:
- `path`

Behavior:
- call `resolve_audit_bundle`
- inject the canonical `skills/ai-visibility-audit-remediation/SKILL.md`
  instructions
- ask the model to produce grouped remediation work without duplicating actions

### `inspect-fixture-bundle`

Purpose:
- quick demo/debug prompt for bundled fixtures

Inputs:
- `bundle`

Behavior:
- load the fixture manifest resource directly
- summarize available artifacts and notable edge-case semantics

## Roots And Local Bundle Loading

V1 should be local-first and respect MCP roots strictly.

Rules:

- the server requests roots from the client and only resolves paths inside those
  roots
- if `path` is outside the exposed roots, the tool returns an explicit error
- manifest-relative artifact references are resolved relative to the manifest
  file only
- sibling discovery fallback is allowed when no manifest exists
- the server must not crawl arbitrary directories outside the user-exposed roots

Recommended v1 posture:

- stdio/local-first server
- user selects local bundle directories through the client
- remote hosting can be explored later, but is not required for the first repo

## Example User Flows

### Flow 1: Review a local exported bundle

1. User points the MCP client at a local directory containing
   `audit-manifest.json`.
2. User invokes the `review-audit-bundle` prompt with the manifest path.
3. The prompt calls `resolve_audit_bundle`.
4. The server returns resolved artifacts and parsed JSON where available.
5. The model produces the grouped review using the canonical audit skill logic.

### Flow 2: Turn a bundle into a remediation plan

1. User invokes `plan-audit-remediation` with a manifest path.
2. The server resolves the bundle and surfaces the report artifacts.
3. The model uses the remediation skill instructions to collapse duplicate work
   into grouped action buckets.

### Flow 3: Verify wrapper behavior against repo fixtures

1. User or maintainer calls `list_fixture_bundles`.
2. They choose a fixture such as `prompt-coverage-present`.
3. They use `inspect-fixture-bundle` or `review-audit-bundle` on that fixture.
4. They compare the behavior against the expected contract and notes.

## Inspector And Verification Plan

The MCP repo should ship with:

- automated tests for `resolve_audit_bundle`, `list_fixture_bundles`, and
  `validate_audit_bundle`
- fixture-driven tests against every bundle in this repo
- prompt registration tests ensuring the three v1 prompts are present
- resource listing tests for contracts and fixtures
- negative tests for paths outside client roots
- MCP Inspector smoke tests before release

Minimum manual inspector checklist:

1. Connect the local server in MCP Inspector.
2. Confirm the tool list matches the v1 tool surface.
3. Confirm the prompt list matches the v1 prompt surface.
4. Confirm contract and fixture resources are listed.
5. Run `resolve_audit_bundle` on `examples/sample-audit/audit-manifest.json`.
6. Run `validate_audit_bundle` on the same bundle and confirm zero errors.
7. Run the prompts on a noise-heavy and markdown-only fixture.

## V1 Non-Goals

V1 should explicitly not include:

- direct live crawling or fresh audit execution
- private PromptScout runtime access
- hosted multi-tenant auth or remote account linkage
- silent server-side LLM heuristics that bypass the public skill logic
- write access back into the user bundle
- Skills-over-MCP distribution as a requirement for launch

Skills-over-MCP can be evaluated later as an optional extension once the basic
tool/resource/prompt wrapper is stable.

## Separate Repo Bootstrap

Recommended repo target:

- name: `promptscout-ai-visibility-audit-mcp`
- language: TypeScript
- SDK: official MCP TypeScript SDK

Recommended initial layout:

```text
promptscout-ai-visibility-audit-mcp/
├── package.json
├── src/
│   ├── server.ts
│   ├── tools/
│   │   ├── resolve-audit-bundle.ts
│   │   ├── list-fixture-bundles.ts
│   │   └── validate-audit-bundle.ts
│   ├── prompts/
│   │   ├── review-audit-bundle.ts
│   │   ├── plan-audit-remediation.ts
│   │   └── inspect-fixture-bundle.ts
│   ├── resources/
│   │   ├── contracts.ts
│   │   └── fixtures.ts
│   └── lib/
│       ├── bundle-resolution.ts
│       └── repo-contract-loader.ts
└── test/
    ├── tools.test.ts
    ├── prompts.test.ts
    └── resources.test.ts
```

The bootstrap should vendor or import the public contract and fixture material
from this repo in a clearly versioned way rather than copying logic ad hoc.
