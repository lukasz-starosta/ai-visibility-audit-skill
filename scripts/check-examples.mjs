import fs from "node:fs";
import path from "node:path";
import {
  loadFixtureBundles,
  validateAuditManifest,
  validateAuditReport,
  validateRemediationPlan,
} from "./lib/contracts.mjs";

const repoRoot = process.cwd();
const problems = [];
const fixtureBundles = loadFixtureBundles(repoRoot);

for (const fixture of fixtureBundles) {
  const manifestProblems = validateAuditManifest(fixture.manifest, {
    fixtureDir: fixture.fixtureDir,
  });

  for (const problem of manifestProblems) {
    problems.push(`${fixture.name}: ${problem}`);
  }

  const auditReportJsonPath = fixture.manifest.artifacts?.auditReportJson;
  if (auditReportJsonPath) {
    const report = JSON.parse(
      fs.readFileSync(path.join(fixture.fixtureDir, auditReportJsonPath), "utf8"),
    );

    for (const problem of validateAuditReport(report)) {
      problems.push(`${fixture.name}: ${problem}`);
    }
  }

  const remediationPlanJsonPath = fixture.manifest.artifacts?.remediationPlanJson;
  if (remediationPlanJsonPath) {
    const plan = JSON.parse(
      fs.readFileSync(path.join(fixture.fixtureDir, remediationPlanJsonPath), "utf8"),
    );

    for (const problem of validateRemediationPlan(plan)) {
      problems.push(`${fixture.name}: ${problem}`);
    }
  }
}

if (problems.length > 0) {
  console.error("Example fixture check failed:");
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exit(1);
}

console.log(`Example fixture check passed for ${fixtureBundles.length} fixture bundles.`);
