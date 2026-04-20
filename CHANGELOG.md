# Changelog

## Unreleased

- add canonical `skills/` sources plus generated Codex and Claude wrappers to
  reduce cross-client drift
- add skill wrapper generation and drift checks for cross-client packaging
- add machine-readable audit, remediation, and manifest schemas plus a
  manifest-driven fixture matrix for downstream wrappers
- add semantic contract validation and regression tests for report and
  remediation invariants
- reposition the repo as the public contract/examples/skills layer for future
  CLI and MCP wrappers
- refresh audit and remediation skill prompts for grouped diagnoses, core-page
  failures, and down-ranked discovered URL noise
- add grouped sample artifacts and a public parity-gap note aligned with Website
  Audit v2 semantics
- keep `llms.txt` messaging explicitly optional and low-priority

## 0.1.0

- scaffold Codex and Claude audit/remediation skills
- add installation, usage, and upgrade docs
- add sample artifact and remediation examples
- add dependency-free validation scripts for docs and example fixtures
