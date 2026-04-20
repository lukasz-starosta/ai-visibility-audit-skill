import fs from "node:fs";
import path from "node:path";

const ALLOWED_ARTIFACT_KEYS = new Set([
  "auditReportJson",
  "auditReportMarkdown",
  "remediationPlanJson",
  "remediationPlanMarkdown",
  "compactSummaryText",
]);

const REPORT_STATUS = new Set(["healthy", "needs-work"]);
const FINDING_SCOPE = new Set(["sitewide", "pattern", "page", "discovered-url"]);
const FINDING_SEVERITY = new Set(["high", "medium", "low"]);
const NARRATIVE_SEVERITY = new Set(["down-ranked", "optional"]);
const PLAN_BUCKET_CATEGORY = new Set([
  "crawl-access-blockers",
  "diagnosis-groups",
  "template-fixes",
  "core-page-upgrades",
  "low-value-noise-handling",
  "prompt-coverage-gaps",
  "optional-follow-up",
]);
const PLAN_PRIORITY = new Set(["high", "medium", "low"]);
const PLAN_FIX_TYPE = new Set(["technical", "content", "both"]);

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoDateTime(value) {
  return isNonEmptyString(value) && !Number.isNaN(Date.parse(value));
}

function isSemver(value) {
  return isNonEmptyString(value) && /^[0-9]+\.[0-9]+\.[0-9]+$/.test(value);
}

function isRelativeArtifactPath(value) {
  return isNonEmptyString(value) && !path.isAbsolute(value) && !value.includes("..");
}

function pushError(errors, pathLabel, message) {
  errors.push(`${pathLabel}: ${message}`);
}

function validateStringArray(errors, pathLabel, value, { minItems = 0 } = {}) {
  if (!Array.isArray(value)) {
    pushError(errors, pathLabel, "must be an array");
    return;
  }

  if (value.length < minItems) {
    pushError(errors, pathLabel, `must contain at least ${minItems} item(s)`);
  }

  for (const [index, entry] of value.entries()) {
    if (!isNonEmptyString(entry)) {
      pushError(errors, `${pathLabel}[${index}]`, "must be a non-empty string");
    }
  }
}

export function validateAuditManifest(manifest, options = {}) {
  const errors = [];
  const fixtureDir = options.fixtureDir ?? null;

  if (!isObject(manifest)) {
    pushError(errors, "manifest", "must be an object");
    return errors;
  }

  if ("$schema" in manifest && !isNonEmptyString(manifest.$schema)) {
    pushError(errors, "$schema", "must be a non-empty string when present");
  }

  if (!isSemver(manifest.manifestVersion)) {
    pushError(errors, "manifestVersion", "must be a semver string");
  }

  if (!isNonEmptyString(manifest.bundleName)) {
    pushError(errors, "bundleName", "must be a non-empty string");
  }

  if (!isNonEmptyString(manifest.site)) {
    pushError(errors, "site", "must be a non-empty string");
  }

  if (!isIsoDateTime(manifest.generatedAt)) {
    pushError(errors, "generatedAt", "must be an ISO date-time string");
  }

  if ("contract" in manifest) {
    if (!isObject(manifest.contract)) {
      pushError(errors, "contract", "must be an object when present");
    } else {
      for (const key of ["auditReport", "remediationPlan"]) {
        if (key in manifest.contract && !isSemver(manifest.contract[key])) {
          pushError(errors, `contract.${key}`, "must be a semver string when present");
        }
      }
    }
  }

  if (!isObject(manifest.artifacts)) {
    pushError(errors, "artifacts", "must be an object");
    return errors;
  }

  const artifactKeys = Object.keys(manifest.artifacts);
  for (const key of artifactKeys) {
    if (!ALLOWED_ARTIFACT_KEYS.has(key)) {
      pushError(errors, `artifacts.${key}`, "is not a supported artifact key");
      continue;
    }

    const artifactPath = manifest.artifacts[key];
    if (!isRelativeArtifactPath(artifactPath)) {
      pushError(errors, `artifacts.${key}`, "must be a relative path without parent traversal");
      continue;
    }

    if (fixtureDir !== null) {
      const absoluteArtifactPath = path.join(fixtureDir, artifactPath);
      if (!fs.existsSync(absoluteArtifactPath)) {
        pushError(errors, `artifacts.${key}`, `references a missing file: ${artifactPath}`);
      }
    }
  }

  if (
    !manifest.artifacts.auditReportJson &&
    !manifest.artifacts.auditReportMarkdown
  ) {
    pushError(
      errors,
      "artifacts",
      "must include at least one audit report artifact",
    );
  }

  if ("notes" in manifest) {
    validateStringArray(errors, "notes", manifest.notes);
  }

  return errors;
}

function countSitewideBlockers(findings) {
  return findings.filter((finding) => {
    return (
      finding.scope === "sitewide" &&
      finding.type !== "optional-signal" &&
      finding.narrativeSeverity !== "optional"
    );
  }).length;
}

function countRepeatedPatternProblems(findings) {
  return findings.filter((finding) => finding.scope === "pattern").length;
}

function countCorePageFailures(findings) {
  return findings.filter((finding) => finding.scope === "page").length;
}

function countLowValueNoiseFindings(findings) {
  return findings.filter((finding) => {
    return finding.scope === "discovered-url" && finding.narrativeSeverity === "down-ranked";
  }).length;
}

export function validateAuditReport(report) {
  const errors = [];

  if (!isObject(report)) {
    pushError(errors, "report", "must be an object");
    return errors;
  }

  if ("$schema" in report && !isNonEmptyString(report.$schema)) {
    pushError(errors, "$schema", "must be a non-empty string when present");
  }

  if (!isSemver(report.auditVersion)) {
    pushError(errors, "auditVersion", "must be a semver string");
  }

  if (!isNonEmptyString(report.site)) {
    pushError(errors, "site", "must be a non-empty string");
  }

  if (!isIsoDateTime(report.generatedAt)) {
    pushError(errors, "generatedAt", "must be an ISO date-time string");
  }

  if (!isObject(report.summary)) {
    pushError(errors, "summary", "must be an object");
  } else {
    if (!REPORT_STATUS.has(report.summary.status)) {
      pushError(errors, "summary.status", "must be healthy or needs-work");
    }

    for (const key of [
      "sitewideBlockers",
      "diagnosisGroups",
      "repeatedPatternProblems",
      "corePageFailures",
      "lowValueNoiseFindings",
    ]) {
      if (!Number.isInteger(report.summary[key]) || report.summary[key] < 0) {
        pushError(errors, `summary.${key}`, "must be a non-negative integer");
      }
    }
  }

  if (!Array.isArray(report.diagnosisGroups)) {
    pushError(errors, "diagnosisGroups", "must be an array");
  } else {
    for (const [index, group] of report.diagnosisGroups.entries()) {
      if (!isObject(group)) {
        pushError(errors, `diagnosisGroups[${index}]`, "must be an object");
        continue;
      }

      if (!isNonEmptyString(group.id)) {
        pushError(errors, `diagnosisGroups[${index}].id`, "must be a non-empty string");
      }

      if (!FINDING_SEVERITY.has(group.severity)) {
        pushError(errors, `diagnosisGroups[${index}].severity`, "must be high, medium, or low");
      }

      if (group.scope !== "group") {
        pushError(errors, `diagnosisGroups[${index}].scope`, "must equal group");
      }

      if (!isNonEmptyString(group.title)) {
        pushError(errors, `diagnosisGroups[${index}].title`, "must be a non-empty string");
      }

      validateStringArray(
        errors,
        `diagnosisGroups[${index}].affectedPages`,
        group.affectedPages,
        { minItems: 1 },
      );

      if (!isNonEmptyString(group.whyGrouped)) {
        pushError(errors, `diagnosisGroups[${index}].whyGrouped`, "must be a non-empty string");
      }
    }
  }

  if (!Array.isArray(report.findings)) {
    pushError(errors, "findings", "must be an array");
  } else {
    for (const [index, finding] of report.findings.entries()) {
      if (!isObject(finding)) {
        pushError(errors, `findings[${index}]`, "must be an object");
        continue;
      }

      if (!isNonEmptyString(finding.id)) {
        pushError(errors, `findings[${index}].id`, "must be a non-empty string");
      }

      if (!FINDING_SEVERITY.has(finding.severity)) {
        pushError(errors, `findings[${index}].severity`, "must be high, medium, or low");
      }

      if (!FINDING_SCOPE.has(finding.scope)) {
        pushError(errors, `findings[${index}].scope`, "must be a supported scope");
      }

      if (!isNonEmptyString(finding.type)) {
        pushError(errors, `findings[${index}].type`, "must be a non-empty string");
      }

      if (!isNonEmptyString(finding.title)) {
        pushError(errors, `findings[${index}].title`, "must be a non-empty string");
      }

      validateStringArray(errors, `findings[${index}].evidence`, finding.evidence, {
        minItems: 1,
      });

      if (
        "narrativeSeverity" in finding &&
        !NARRATIVE_SEVERITY.has(finding.narrativeSeverity)
      ) {
        pushError(
          errors,
          `findings[${index}].narrativeSeverity`,
          "must be down-ranked or optional when present",
        );
      }

      if (finding.scope === "discovered-url") {
        if (finding.severity !== "low") {
          pushError(
            errors,
            `findings[${index}].severity`,
            "discovered-url findings must be low severity",
          );
        }

        if (finding.narrativeSeverity !== "down-ranked") {
          pushError(
            errors,
            `findings[${index}].narrativeSeverity`,
            "discovered-url findings must be down-ranked",
          );
        }
      }

      if (finding.type === "optional-signal" && finding.narrativeSeverity !== "optional") {
        pushError(
          errors,
          `findings[${index}].narrativeSeverity`,
          "optional-signal findings must be marked optional",
        );
      }
    }
  }

  validateStringArray(errors, "unknowns", report.unknowns);
  validateStringArray(errors, "nextActions", report.nextActions, { minItems: 1 });

  if ("promptCoverage" in report) {
    if (!isObject(report.promptCoverage)) {
      pushError(errors, "promptCoverage", "must be an object when present");
    } else {
      if (!isNonEmptyString(report.promptCoverage.summary)) {
        pushError(errors, "promptCoverage.summary", "must be a non-empty string");
      }

      if (!Array.isArray(report.promptCoverage.categories) || report.promptCoverage.categories.length === 0) {
        pushError(errors, "promptCoverage.categories", "must contain at least one category");
      } else {
        for (const [index, category] of report.promptCoverage.categories.entries()) {
          if (!isObject(category)) {
            pushError(errors, `promptCoverage.categories[${index}]`, "must be an object");
            continue;
          }

          if (!isNonEmptyString(category.category)) {
            pushError(
              errors,
              `promptCoverage.categories[${index}].category`,
              "must be a non-empty string",
            );
          }

          if (!new Set(["strong", "partial", "missing"]).has(category.status)) {
            pushError(
              errors,
              `promptCoverage.categories[${index}].status`,
              "must be strong, partial, or missing",
            );
          }

          validateStringArray(
            errors,
            `promptCoverage.categories[${index}].ownedPages`,
            category.ownedPages,
          );

          if (!isNonEmptyString(category.notes)) {
            pushError(
              errors,
              `promptCoverage.categories[${index}].notes`,
              "must be a non-empty string",
            );
          }
        }
      }
    }
  }

  if (isObject(report.summary) && Array.isArray(report.findings) && Array.isArray(report.diagnosisGroups)) {
    const expectedCounts = {
      sitewideBlockers: countSitewideBlockers(report.findings),
      diagnosisGroups: report.diagnosisGroups.length,
      repeatedPatternProblems: countRepeatedPatternProblems(report.findings),
      corePageFailures: countCorePageFailures(report.findings),
      lowValueNoiseFindings: countLowValueNoiseFindings(report.findings),
    };

    for (const [key, expectedValue] of Object.entries(expectedCounts)) {
      if (report.summary[key] !== expectedValue) {
        pushError(
          errors,
          `summary.${key}`,
          `must equal ${expectedValue} based on diagnosis groups and findings`,
        );
      }
    }
  }

  return errors;
}

export function validateRemediationPlan(plan) {
  const errors = [];

  if (!isObject(plan)) {
    pushError(errors, "plan", "must be an object");
    return errors;
  }

  if ("$schema" in plan && !isNonEmptyString(plan.$schema)) {
    pushError(errors, "$schema", "must be a non-empty string when present");
  }

  if (!isSemver(plan.planVersion)) {
    pushError(errors, "planVersion", "must be a semver string");
  }

  if (!isNonEmptyString(plan.site)) {
    pushError(errors, "site", "must be a non-empty string");
  }

  if (!isIsoDateTime(plan.generatedAt)) {
    pushError(errors, "generatedAt", "must be an ISO date-time string");
  }

  if (!isObject(plan.summary)) {
    pushError(errors, "summary", "must be an object");
  } else {
    if (!REPORT_STATUS.has(plan.summary.priority)) {
      pushError(errors, "summary.priority", "must be healthy or needs-work");
    }

    if (!Number.isInteger(plan.summary.bucketCount) || plan.summary.bucketCount < 0) {
      pushError(errors, "summary.bucketCount", "must be a non-negative integer");
    }
  }

  if (!Array.isArray(plan.actionBuckets)) {
    pushError(errors, "actionBuckets", "must be an array");
  } else {
    for (const [index, bucket] of plan.actionBuckets.entries()) {
      if (!isObject(bucket)) {
        pushError(errors, `actionBuckets[${index}]`, "must be an object");
        continue;
      }

      if (!isNonEmptyString(bucket.id)) {
        pushError(errors, `actionBuckets[${index}].id`, "must be a non-empty string");
      }

      if (!isNonEmptyString(bucket.title)) {
        pushError(errors, `actionBuckets[${index}].title`, "must be a non-empty string");
      }

      if (!PLAN_BUCKET_CATEGORY.has(bucket.category)) {
        pushError(errors, `actionBuckets[${index}].category`, "must be a supported category");
      }

      if (!PLAN_PRIORITY.has(bucket.priority)) {
        pushError(errors, `actionBuckets[${index}].priority`, "must be high, medium, or low");
      }

      if (!PLAN_FIX_TYPE.has(bucket.fixType)) {
        pushError(errors, `actionBuckets[${index}].fixType`, "must be technical, content, or both");
      }

      if (!isNonEmptyString(bucket.whyItMatters)) {
        pushError(errors, `actionBuckets[${index}].whyItMatters`, "must be a non-empty string");
      }

      validateStringArray(
        errors,
        `actionBuckets[${index}].smallestChangeSet`,
        bucket.smallestChangeSet,
        { minItems: 1 },
      );
      validateStringArray(
        errors,
        `actionBuckets[${index}].affectedEvidence`,
        bucket.affectedEvidence,
        { minItems: 1 },
      );

      if ("affectedPages" in bucket) {
        validateStringArray(errors, `actionBuckets[${index}].affectedPages`, bucket.affectedPages);
      }

      if ("counts" in bucket) {
        if (!isObject(bucket.counts)) {
          pushError(errors, `actionBuckets[${index}].counts`, "must be an object when present");
        } else {
          for (const [key, value] of Object.entries(bucket.counts)) {
            if (!Number.isInteger(value) || value < 0) {
              pushError(
                errors,
                `actionBuckets[${index}].counts.${key}`,
                "must be a non-negative integer",
              );
            }
          }
        }
      }
    }
  }

  if (isObject(plan.summary) && Array.isArray(plan.actionBuckets)) {
    if (plan.summary.bucketCount !== plan.actionBuckets.length) {
      pushError(
        errors,
        "summary.bucketCount",
        `must equal ${plan.actionBuckets.length} based on actionBuckets`,
      );
    }
  }

  if ("optionalFollowUps" in plan) {
    validateStringArray(errors, "optionalFollowUps", plan.optionalFollowUps);
  }

  return errors;
}

export function loadFixtureBundles(repoRoot) {
  const fixtureDirectories = [
    path.join(repoRoot, "examples", "sample-audit"),
  ];

  const extraFixturesRoot = path.join(repoRoot, "examples", "fixtures");
  if (fs.existsSync(extraFixturesRoot)) {
    const entries = fs.readdirSync(extraFixturesRoot, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        fixtureDirectories.push(path.join(extraFixturesRoot, entry.name));
      }
    }
  }

  return fixtureDirectories
    .map((fixtureDir) => {
      const manifestPath = path.join(fixtureDir, "audit-manifest.json");
      return {
        name: path.basename(fixtureDir),
        fixtureDir,
        manifestPath,
        manifest: JSON.parse(fs.readFileSync(manifestPath, "utf8")),
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));
}
