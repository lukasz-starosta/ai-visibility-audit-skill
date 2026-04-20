import fs from "node:fs";
import path from "node:path";

import { getGeneratedSkillFiles } from "./lib/skill-wrappers.mjs";

const repoRoot = process.cwd();
const problems = [];

for (const file of getGeneratedSkillFiles(repoRoot)) {
  const absolutePath = path.join(repoRoot, file.relativePath);

  if (!fs.existsSync(absolutePath)) {
    problems.push(`Missing generated skill wrapper: ${file.relativePath}`);
    continue;
  }

  const checkedInContents = fs.readFileSync(absolutePath, "utf8");
  if (checkedInContents !== file.contents) {
    problems.push(`Generated wrapper drift detected: ${file.relativePath}`);
  }
}

if (problems.length > 0) {
  console.error("Skill wrapper check failed:");
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exit(1);
}

console.log("Skill wrapper check passed.");
