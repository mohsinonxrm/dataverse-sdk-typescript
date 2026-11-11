/**
 * #479: enums are const objects with a type of the same name, not TypeScript enums, so generated
 * code compiles under `erasableSyntaxOnly` and runs under Node's type stripping.
 *
 * - A choice's option set keeps its numbers (what Dataverse stores), also when the option set is
 *   a `$metadata` enum (a global choice).
 * - A CSDL enum type has its member names as values (what the Web API reads and writes), so an
 *   action body and a function's enum literal send `X.Member` as it is, and a returned value is
 *   typed with the enum.
 * - A flags enum keeps its numbers, typed `number`, so members combine with `|`; actions send the
 *   combination as member names.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import type { RetrieveMetadataChangesResponse } from "../src/metadata-service.js";
import {
  compileToJs,
  fixtureMetadataService,
  generateFixture,
  importGenerated,
  scratchFolders,
  typecheck,
} from "./fixtures/compile.js";
import { WRITE_EDMX, WRITE_ENTITY_METADATA } from "./fixtures/write-metadata.js";

const scratch = scratchFolders("as-const-enums");

const TYPES = `<EnumType Name="contoso_Priority">
        <Member Name="Low" Value="0" />
        <Member Name="High" Value="1" />
      </EnumType>
      <EnumType Name="contoso_Rights" IsFlags="true">
        <Member Name="None" Value="0" />
        <Member Name="Read" Value="1" />
        <Member Name="Write" Value="2" />
      </EnumType>
      <EnumType Name="contoso_method">
        <Member Name="Email" Value="1" />
        <Member Name="Phone" Value="2" />
      </EnumType>
      <ComplexType Name="contoso_Settings">
        <Property Name="Priority" Type="mscrm.contoso_Priority" />
        <Property Name="Rights" Type="mscrm.contoso_Rights" />
      </ComplexType>
      <Action Name="contoso_Prioritize">
        <Parameter Name="Priority" Type="mscrm.contoso_Priority" Nullable="false" />
        <Parameter Name="Rights" Type="mscrm.contoso_Rights" />
        <Parameter Name="Settings" Type="mscrm.contoso_Settings" />
      </Action>
      <Function Name="contoso_GetPriority">
        <Parameter Name="Fallback" Type="mscrm.contoso_Priority" Nullable="false" />
        <ReturnType Type="mscrm.contoso_Priority" Nullable="false" />
      </Function>`;

const EDMX = WRITE_EDMX.replace("<EntityContainer", `${TYPES}\n      <EntityContainer`).replace(
  '<Property Name="fullname" Type="Edm.String" Unicode="false" />',
  '<Property Name="fullname" Type="Edm.String" Unicode="false" />\n        <Property Name="contoso_method" Type="Edm.Int32" />'
);

/** A contact column whose (global) option set is the `contoso_method` enum of `$metadata`. */
function entityMetadata(): Record<string, RetrieveMetadataChangesResponse> {
  const contact = structuredClone(WRITE_ENTITY_METADATA.contact);
  contact.EntityMetadata?.[0].Attributes?.push({
    LogicalName: "contoso_method",
    SchemaName: "contoso_Method",
    AttributeType: "Picklist",
    IsValidForCreate: true,
    IsValidForUpdate: true,
    OptionSet: { Name: "contoso_method", IsGlobal: true },
  });
  return { ...WRITE_ENTITY_METADATA, contact };
}

let dir = "";
const read = (file: string) => fs.readFile(path.join(dir, file), "utf-8");

type Ctor = new (...args: unknown[]) => Executable<unknown>;
async function load(file: string, name: string): Promise<Ctor> {
  const mod = await importGenerated<Partial<Record<string, Ctor>>>(dir, file);
  const ctor = mod[name];
  if (!ctor) throw new Error(`${name} not exported from ${file}`);
  return ctor;
}

beforeAll(async () => {
  dir = await scratch.create();
  await generateFixture(fixtureMetadataService(EDMX, entityMetadata()), dir, {
    entities: ["account", "contact"],
    actions: ["contoso_Prioritize"],
    functions: ["contoso_GetPriority"],
  });
}, 60_000);

afterAll(scratch.cleanup);

describe("#479: generated enums", () => {
  it("are const objects with a type of the same name, never a TypeScript enum", async () => {
    for (const name of ["account_industrycode", "contoso_Priority", "contoso_Rights"]) {
      const code = await read(`enums/${name}.ts`);
      expect(code).toContain(`export const ${name} = {`);
      expect(code).toContain("} as const;");
      expect(code).not.toMatch(/\benum\s+\w+\s*\{/);
    }
  });

  it("an option set keeps its numbers", async () => {
    const code = await read("enums/account_industrycode.ts");
    expect(code).toContain("  Accounting: 1,");
    expect(code).toContain(
      "export type account_industrycode = (typeof account_industrycode)[keyof typeof account_industrycode];"
    );
    // A $metadata enum used as a column's (global) option set is an option set: numbers
    const method = await read("enums/contoso_method.ts");
    expect(method).toContain("(global option set)");
    expect(method).toContain("  Email: 1,");
  });

  it("a CSDL enum type has its member names, with each number in its comment", async () => {
    const code = await read("enums/contoso_Priority.ts");
    expect(code).toContain('  /** 0 */\n  Low: "Low",');
    expect(code).toContain('  /** 1 */\n  High: "High",');
    expect(code).toContain(
      "export type contoso_Priority = (typeof contoso_Priority)[keyof typeof contoso_Priority];"
    );
  });

  it("a flags enum keeps its numbers, typed number", async () => {
    const code = await read("enums/contoso_Rights.ts");
    expect(code).toContain("  Write: 2,");
    expect(code).toContain("export type contoso_Rights = number;");
  });

  it("type-check under erasableSyntaxOnly, and as a consumer uses them", async () => {
    await fs.writeFile(
      path.join(dir, "usage-479.ts"),
      `import {
  account_industrycode,
  contoso_Priority,
  contoso_Rights,
  contoso_PrioritizeAction,
  contoso_GetPriorityFunction,
  type contoso_GetPriorityFunctionResponse,
  type Account,
} from "./index.js";

const account: Account = { industrycode: account_industrycode.Accounting };
const priority: contoso_Priority = contoso_Priority.High;
const named: contoso_Priority = "Low";
const rights: contoso_Rights = contoso_Rights.Read | contoso_Rights.Write;
new contoso_PrioritizeAction({ Priority: priority, Rights: rights, Settings: { Priority: named } });
new contoso_GetPriorityFunction({ Fallback: contoso_Priority.Low });
export const returned: contoso_GetPriorityFunctionResponse = "High";
// @ts-expect-error a CSDL enum's value is a member name, not its number
export const wrong: contoso_Priority = 1;
// @ts-expect-error an option set's value is one of its numbers
export const unknownChoice: account_industrycode = 999;
export { account };
`,
      "utf-8"
    );
    expect(await typecheck(dir)).toEqual([]);
  });
});

describe("#479: requests", () => {
  beforeAll(async () => {
    await compileToJs(dir);
  });

  it("an action body sends a CSDL enum's member as it is, and a flags value as member names", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", /contoso_Prioritize/, () => noContent());
    const Prioritize = await load(
      "actions/contoso_PrioritizeAction.js",
      "contoso_PrioritizeAction"
    );
    const { contoso_Priority } = await importGenerated<{
      contoso_Priority: Record<string, string>;
    }>(dir, "enums/contoso_Priority.js");

    await client.execute(
      new Prioritize({
        Priority: contoso_Priority.High,
        Rights: 1 | 2,
        Settings: { Priority: contoso_Priority.Low, Rights: 2 },
      })
    );
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      Priority: "High",
      Rights: "Read, Write",
      Settings: { Priority: "Low", Rights: "Write" },
    });
    // Only the flags enum is in the conversion tables
    expect(await read("internal/actionBody.ts")).not.toContain('"contoso_Priority"');
  });

  it("a function's enum parameter is an enum literal with the member name; the return is the name", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /contoso_GetPriority/, () => jsonResponse({ value: "High" }));
    const GetPriority = await load(
      "functions/contoso_GetPriorityFunction.js",
      "contoso_GetPriorityFunction"
    );

    const result = await client.execute(new GetPriority({ Fallback: "Low" }));
    expect(result).toBe("High");
    expect(new URL(fake.last().url).searchParams.get("@p1")).toBe(
      "Microsoft.Dynamics.CRM.contoso_Priority'Low'"
    );
  });
});
