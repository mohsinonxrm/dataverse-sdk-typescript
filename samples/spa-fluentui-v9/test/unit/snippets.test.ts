/**
 * The Code panels show `#region`s of the scenario modules. These tests make sure every region a
 * page asks for exists (a missing one would throw while rendering) and that a snippet is the
 * region's code with the package imports it uses.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { regionNames, snippet } from "../../src/lib/snippet";

const src = resolve(dirname(fileURLToPath(import.meta.url)), "../../src");

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)]
  );
}

describe("snippets", () => {
  const pages = files(src).filter((f) => f.endsWith(".tsx"));
  const uses = pages.flatMap((page) => {
    const text = readFileSync(page, "utf8");
    const sources = new Map<string, string>();
    for (const m of text.matchAll(/import (\w+) from "(.+)\?raw";/g)) {
      sources.set(m[1] ?? "", resolve(dirname(page), m[2] ?? ""));
    }
    return [...text.matchAll(/snippet\((\w+), "([^"]+)"\)/g)].map((m) => ({
      page: page.slice(src.length + 1),
      file: sources.get(m[1] ?? ""),
      region: m[2] ?? "",
    }));
  });

  it("pages show snippets", () => {
    expect(uses.length).toBeGreaterThan(5);
  });

  it.each(uses)("$page shows region $region, which exists", ({ file, region }) => {
    expect(file).toBeDefined();
    const source = readFileSync(file ?? "", "utf8");
    expect(regionNames(source)).toContain(region);
    expect(() => snippet(source, region)).not.toThrow();
  });

  it("includes the package imports the region uses, and no others", () => {
    const source = [
      'import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";',
      'import { odata, type FetchProvider } from "@mohsinonxrm/dataverse-sdk-core";',
      'import type { Sdk } from "../sdk/createSdk";',
      "",
      "  // #region demo",
      "  export function f(sdk: Sdk) {",
      "    return new BatchRequestBuilder(sdk.client);",
      "  }",
      "  // #endregion",
    ].join("\n");
    expect(snippet(source, "demo")).toBe(
      [
        'import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";',
        "",
        "export function f(sdk: Sdk) {",
        "  return new BatchRequestBuilder(sdk.client);",
        "}",
      ].join("\n")
    );
    expect(() => snippet(source, "missing")).toThrow(/No snippet region/);
  });
});
