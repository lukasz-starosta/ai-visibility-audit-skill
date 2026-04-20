import fs from "node:fs";
import path from "node:path";

const SKILL_VARIANTS = [
  {
    source: "skills/ai-visibility-audit/SKILL.md",
    targets: [
      {
        relativePath: "claude/ai-visibility-audit/SKILL.md",
      },
      {
        relativePath: "codex/ai-visibility-audit/SKILL.md",
        allowedTools: "Read, Grep, Glob, Bash",
      },
    ],
  },
  {
    source: "skills/ai-visibility-audit-remediation/SKILL.md",
    targets: [
      {
        relativePath: "claude/ai-visibility-audit-remediation/SKILL.md",
      },
      {
        relativePath: "codex/ai-visibility-audit-remediation/SKILL.md",
        allowedTools: "Read, Grep, Glob",
      },
    ],
  },
];

function parseSkillMarkdown(sourceText) {
  if (!sourceText.startsWith("---\n")) {
    throw new Error("Skill file must start with YAML frontmatter");
  }

  const closingIndex = sourceText.indexOf("\n---\n", 4);
  if (closingIndex === -1) {
    throw new Error("Skill file must contain a closing YAML frontmatter delimiter");
  }

  const frontmatterBlock = sourceText.slice(4, closingIndex);
  const body = sourceText.slice(closingIndex + 5);
  const frontmatter = {};

  for (const line of frontmatterBlock.split("\n")) {
    if (!line.trim()) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      throw new Error(`Invalid frontmatter line: ${line}`);
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function serializeSkillMarkdown(frontmatter, body) {
  const lines = ["---"];
  for (const [key, value] of frontmatter) {
    lines.push(`${key}: ${value}`);
  }
  lines.push("---", "", body.trim(), "");
  return lines.join("\n");
}

function buildVariantContents(sourceText, allowedTools) {
  const { frontmatter, body } = parseSkillMarkdown(sourceText);
  const orderedFrontmatter = [
    ["name", frontmatter.name],
    ["description", frontmatter.description],
  ];

  if (allowedTools) {
    orderedFrontmatter.push(["allowed-tools", allowedTools]);
  }

  return serializeSkillMarkdown(orderedFrontmatter, body);
}

export function getGeneratedSkillFiles(repoRoot) {
  const generatedFiles = [];

  for (const variant of SKILL_VARIANTS) {
    const sourceText = fs.readFileSync(path.join(repoRoot, variant.source), "utf8");

    for (const target of variant.targets) {
      generatedFiles.push({
        relativePath: target.relativePath,
        contents: buildVariantContents(sourceText, target.allowedTools),
      });
    }
  }

  return generatedFiles;
}

export function writeGeneratedSkillFiles(repoRoot) {
  for (const file of getGeneratedSkillFiles(repoRoot)) {
    fs.mkdirSync(path.dirname(path.join(repoRoot, file.relativePath)), { recursive: true });
    fs.writeFileSync(path.join(repoRoot, file.relativePath), file.contents);
  }
}
