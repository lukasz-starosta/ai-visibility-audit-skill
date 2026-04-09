import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const requiredFiles = [
  "examples/sample-audit/report.json",
  "examples/sample-audit/report.md",
  "examples/sample-audit/remediation-plan.md",
];

const missingFiles = requiredFiles.filter((relativeFile) => {
  return !fs.existsSync(path.join(repoRoot, relativeFile));
});

if (missingFiles.length > 0) {
  console.error("Example fixture check failed:");
  for (const relativeFile of missingFiles) {
    console.error(`- Missing ${relativeFile}`);
  }
  process.exit(1);
}

console.log(`Example fixture check passed for ${requiredFiles.length} files.`);
