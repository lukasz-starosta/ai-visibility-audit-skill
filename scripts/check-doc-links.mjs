import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const docsToCheck = [
  "README.md",
  "docs/installation.md",
  "docs/usage.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "CHANGELOG.md",
];

const markdownLinkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
const problems = [];

for (const relativeFile of docsToCheck) {
  const absoluteFile = path.join(repoRoot, relativeFile);
  const contents = fs.readFileSync(absoluteFile, "utf8");
  const fileDir = path.dirname(absoluteFile);
  let match;

  while ((match = markdownLinkPattern.exec(contents)) !== null) {
    const rawTarget = match[1];

    if (
      rawTarget.startsWith("http://") ||
      rawTarget.startsWith("https://") ||
      rawTarget.startsWith("mailto:") ||
      rawTarget.startsWith("#")
    ) {
      continue;
    }

    if (rawTarget.startsWith("/Users/")) {
      problems.push(`${relativeFile}: local absolute path is not allowed: ${rawTarget}`);
      continue;
    }

    const targetWithoutAnchor = rawTarget.split("#")[0];
    const resolvedTarget = path.resolve(fileDir, targetWithoutAnchor);

    if (!fs.existsSync(resolvedTarget)) {
      problems.push(`${relativeFile}: missing relative link target: ${rawTarget}`);
    }
  }
}

if (problems.length > 0) {
  console.error("Doc link check failed:");
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exit(1);
}

console.log(`Doc link check passed for ${docsToCheck.length} files.`);
