import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  loadFixtureBundles,
  validateAuditManifest,
  validateAuditReport,
  validateRemediationPlan,
} from "../scripts/lib/contracts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

test("contract schemas exist", () => {
  const requiredSchemas = [
    "contracts/audit-manifest.schema.json",
    "contracts/audit-report.schema.json",
    "contracts/remediation-plan.schema.json",
  ];

  for (const relativePath of requiredSchemas) {
    assert.equal(
      fs.existsSync(path.join(repoRoot, relativePath)),
      true,
      `${relativePath} should exist`,
    );
  }
});

test("fixture bundles are manifest-driven and cover the full matrix", () => {
  const fixtures = loadFixtureBundles(repoRoot);
  const fixtureNames = fixtures.map((fixture) => fixture.name).sort();

  assert.deepEqual(fixtureNames, [
    "clean-low-issue",
    "json-only",
    "markdown-only",
    "noisy-discovered-urls",
    "prompt-coverage-present",
    "sample-audit",
    "unknown-heavy",
  ]);

  for (const fixture of fixtures) {
    assert.equal(validateAuditManifest(fixture.manifest).length, 0, `${fixture.name} manifest`);
  }
});

test("sample-audit report satisfies the public contract invariants", () => {
  const report = JSON.parse(
    fs.readFileSync(path.join(repoRoot, "examples/sample-audit/report.json"), "utf8"),
  );

  assert.equal(validateAuditReport(report).length, 0);
});

test("sample-audit remediation plan satisfies the public contract invariants", () => {
  const plan = JSON.parse(
    fs.readFileSync(path.join(repoRoot, "examples/sample-audit/remediation-plan.json"), "utf8"),
  );

  assert.equal(validateRemediationPlan(plan).length, 0);
});
