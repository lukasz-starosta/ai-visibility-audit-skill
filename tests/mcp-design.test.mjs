import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const designDocPath = path.join(repoRoot, "docs/mcp-wrapper-v1.md");

test("MCP wrapper v1 design doc exists", () => {
  assert.equal(fs.existsSync(designDocPath), true, "docs/mcp-wrapper-v1.md should exist");
});

test("MCP wrapper v1 design doc covers the required implementation sections", () => {
  const designDoc = fs.readFileSync(designDocPath, "utf8");
  const requiredSections = [
    "## Repo Boundary",
    "## V1 Tool Surface",
    "## V1 Resources",
    "## V1 Prompts",
    "## Roots And Local Bundle Loading",
    "## Example User Flows",
    "## Inspector And Verification Plan",
    "## V1 Non-Goals",
  ];

  for (const section of requiredSections) {
    assert.match(designDoc, new RegExp(`^${section.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}$`, "m"));
  }
});
