import { writeGeneratedSkillFiles } from "./lib/skill-wrappers.mjs";

writeGeneratedSkillFiles(process.cwd());

console.log("Generated Codex and Claude skill wrappers from canonical skills/ sources.");
