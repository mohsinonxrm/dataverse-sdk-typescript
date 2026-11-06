/**
 * #88: the actions, functions and messages READMEs and docs/mapping named classes that don't exist
 * (`AssignAction`, `DisqualifyLeadAction`, `WhoAmIRequest`, …) and showed wrong constructors. Their
 * operation lists are now generated from the package source (`pnpm --filter generate-sdk-types
 * docs`); these tests fail when a list is stale or a doc names a class no package exports.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  OPERATION_DOCS,
  exportedOperationNames,
  readOperation,
  renderOperationBlocks,
  unknownOperationNames,
} from "../src/docs/operation-docs.js";

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const read = (doc: string): string => readFileSync(join(ROOT, doc), "utf8");

describe("operation docs (#88)", () => {
  it.each(OPERATION_DOCS)("%s is up to date with the packages", (doc) => {
    const markdown = read(doc);
    expect(renderOperationBlocks(markdown, ROOT)).toBe(markdown);
  });

  it.each(OPERATION_DOCS)("%s names only classes the packages export", (doc) => {
    expect(unknownOperationNames(read(doc), exportedOperationNames(ROOT))).toEqual([]);
  });

  it("reads a constructor and route from the package source", () => {
    const srcDir = join(ROOT, "packages", "dataverse-sdk-actions", "src");
    const op = readOperation(srcDir, "actions", "CreateMultiple");
    expect(op).toMatchObject({
      className: "CreateMultipleAction",
      method: "POST",
      route: "/{entitySetName}/Microsoft.Dynamics.CRM.CreateMultiple",
    });
    expect(op?.params.map((p) => p.name)).toEqual(["entitySetName", "targets"]);
    expect(readOperation(srcDir, "actions", "Assign")).toBeUndefined();
  });

  it("refuses to list an operation the package doesn't have", () => {
    const markdown =
      "<!-- operations:actions\nDisqualifyLead: no such action\n-->\n<!-- /operations -->";
    expect(() => renderOperationBlocks(markdown, ROOT)).toThrow(/has no operation DisqualifyLead/);
  });

  it("flags unknown classes in code, but not placeholders or .NET names", () => {
    const markdown = [
      "Use `AssignAction` here.",
      "The .NET `WhoAmIRequest` maps to `WhoAmIFunction`.",
      "```ts\nnew SetStateRequest();\nnew OrganizationRequest('new_CustomAction');\n```",
    ].join("\n");
    expect(unknownOperationNames(markdown, exportedOperationNames(ROOT))).toEqual([
      "AssignAction",
      "SetStateRequest",
    ]);
  });
});
