/**
 * #41: the code generator had no tests. These run the real parser and generators on a tiny
 * $metadata document and check the output for the fixes in #22 (function string literals),
 * #23 (lower-case content-type for actions and messages).
 */
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { parseEdmx } from "../src/parsers/edmx-parser.js";
import { generateActions } from "../src/generators/actions-generator.js";
import { generateFunctions } from "../src/generators/functions-generator.js";
import { generateMessages } from "../src/generators/messages-generator.js";

const EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <Action Name="SendGreeting">
        <Parameter Name="Message" Type="Edm.String" Nullable="false" />
        <ReturnType Type="Edm.String" />
      </Action>
      <Function Name="ValidateQuery">
        <Parameter Name="FetchXml" Type="Edm.String" Nullable="false" />
        <Parameter Name="Count" Type="Edm.Int32" Nullable="false" />
        <ReturnType Type="Edm.Boolean" />
      </Function>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

let dir: string;

beforeAll(async () => {
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  dir = await mkdtemp(join(tmpdir(), "gen-test-"));
  const csdl = parseEdmx(EDMX);
  await generateActions(csdl, join(dir, "actions"), false);
  await generateFunctions(csdl, join(dir, "functions"), false);
  await generateMessages(csdl, join(dir, "messages"), false);
});

afterAll(async () => {
  vi.restoreAllMocks();
  await rm(dir, { recursive: true, force: true });
});

describe("generate-sdk-types", () => {
  it("parses actions and functions from $metadata", () => {
    const csdl = parseEdmx(EDMX);
    expect(csdl.actions.map((a) => a.name)).toEqual(["SendGreeting"]);
    expect(csdl.functions.map((f) => f.name)).toEqual(["ValidateQuery"]);
    expect(csdl.functions[0]?.parameters.map((p) => `${p.name}:${p.type}`)).toEqual([
      "FetchXml:Edm.String",
      "Count:Edm.Int32",
    ]);
  });

  it("#23: generated actions and messages declare a lower-case content-type", async () => {
    const action = await readFile(join(dir, "actions", "SendGreetingAction.ts"), "utf8");
    const message = await readFile(join(dir, "messages", "SendGreetingMessage.ts"), "utf8");
    for (const code of [action, message]) {
      expect(code).toMatch(/["']content-type["']:\s*["']application\/json["']/);
      expect(code).not.toContain("Content-Type");
    }
  });

  it("#22: generated functions format every scalar alias with formatAliasValue", async () => {
    const fn = await readFile(join(dir, "functions", "ValidateQueryFunction.ts"), "utf8");
    expect(fn).toMatch(/import \{ formatAliasValue \} from ["']\.\/internal\/odataLiteral\.js["']/);
    expect(fn).toMatch(/formatAliasValue\(this\.fetchXml\)/);
    expect(fn).toMatch(/formatAliasValue\(this\.count\)/);
  });

  it("#22: the emitted formatAliasValue doubles embedded quotes", async () => {
    const mod = (await import(join(dir, "functions", "internal", "odataLiteral.ts"))) as {
      formatAliasValue: (v: unknown) => string;
    };
    expect(mod.formatAliasValue("O'Brien's")).toBe("'O''Brien''s'");
    expect(mod.formatAliasValue(5)).toBe("5");
    expect(mod.formatAliasValue(true)).toBe("true");
  });
});
