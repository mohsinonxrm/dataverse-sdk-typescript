/**
 * #234: `OrganizationRequestOptions` (the `boundTo` option, #185) must be importable from the
 * messages package root, both from a regenerated index and from the committed one.
 */
import { copyFile, mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateMessages } from "../src/generators/messages-generator.js";
import { typecheck } from "./typecheck.js";

const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));
const MESSAGES_SRC = fileURLToPath(
  new URL("../../../packages/dataverse-sdk-messages/src", import.meta.url)
);

const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <Action Name="SendGreeting">
        <Parameter Name="Message" Type="Edm.String" Nullable="false" />
        <ReturnType Type="Edm.String" />
      </Action>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

let dir: string;

/** The hand-written base-export block of an index, with import quotes normalised. */
function baseExports(index: string): string[] {
  const start = index.indexOf("// Base classes and types");
  const end = index.indexOf("// Message classes");
  return index
    .slice(start, end)
    .replace(/'/g, '"')
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("export"));
}

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  dir = await mkdtemp(join(OUT_ROOT, ".gen-messages-index-test-"));
  await generateMessages(parseEdmx(EDMX), dir, false);
  // The hand-written files the generator keeps rather than writes.
  for (const file of ["OrganizationRequest.ts", "EntityReference.ts", "types.ts"]) {
    await copyFile(join(MESSAGES_SRC, file), join(dir, file));
  }
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(dir, { recursive: true, force: true });
});

describe("messages index (#234)", () => {
  it("exports OrganizationRequestOptions from the generated index", async () => {
    const errors = await typecheck(
      dir,
      "use-options.ts",
      `import { OrganizationRequest } from "./index.js";
import type { OrganizationRequestOptions } from "./index.js";
const options: OrganizationRequestOptions = { boundTo: { entitySetName: "accounts", id: "1" } };
export const request = new OrganizationRequest("new_Custom", {}, options);
`
    );
    expect(errors).toEqual([]);
  });

  it("the committed index exports the same base classes and types as the generator", async () => {
    const generated = await readFile(join(dir, "index.ts"), "utf8");
    const committed = await readFile(join(MESSAGES_SRC, "index.ts"), "utf8");
    expect(baseExports(generated)).toContain(
      'export type { OrganizationRequestOptions } from "./OrganizationRequest.js";'
    );
    expect(baseExports(committed)).toEqual(baseExports(generated));
  });
});
