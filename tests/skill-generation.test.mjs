import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getGeneratedSkillFiles } from "../scripts/lib/skill-wrappers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

test("canonical cross-client skill sources exist", () => {
  const requiredSkillSources = [
    "skills/ai-visibility-audit/SKILL.md",
    "skills/ai-visibility-audit-remediation/SKILL.md",
  ];

  for (const relativePath of requiredSkillSources) {
    assert.equal(
      fs.existsSync(path.join(repoRoot, relativePath)),
      true,
      `${relativePath} should exist`,
    );
  }
});

test("generated wrappers match the checked-in Codex and Claude skill files", () => {
  const generatedFiles = getGeneratedSkillFiles(repoRoot);

  assert.deepEqual(
    generatedFiles.map((file) => file.relativePath).sort(),
    [
      "claude/ai-visibility-audit-remediation/SKILL.md",
      "claude/ai-visibility-audit/SKILL.md",
      "codex/ai-visibility-audit-remediation/SKILL.md",
      "codex/ai-visibility-audit/SKILL.md",
    ],
  );

  for (const file of generatedFiles) {
    const checkedInContents = fs.readFileSync(path.join(repoRoot, file.relativePath), "utf8");
    assert.equal(checkedInContents, file.contents, `${file.relativePath} should be generated`);
  }
});
