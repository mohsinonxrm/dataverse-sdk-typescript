/**
 * #73: complex-type properties the CSDL doesn't mark Nullable="false" are optional, and a
 * parameter declared with a base type (QueryExpressionToFetchXml's `Query: QueryBase`) takes a
 * union of the derived types, each with a required `@odata.type`.
 */
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import { QueryExpressionToFetchXmlAction } from "../src/index.js";

const SRC_INDEX = fileURLToPath(new URL("../src/index.js", import.meta.url));
const TYPES_INDEX = fileURLToPath(new URL("../src/types/index.js", import.meta.url));

let dir: string;
beforeAll(async () => {
  dir = await mkdtemp(join(tmpdir(), "actions-73-"));
});
afterAll(async () => {
  await rm(dir, { recursive: true, force: true });
});

/** Type-check a snippet that imports the package source; returns the snippet's diagnostics. */
async function typecheck(snippet: string): Promise<string[]> {
  const file = join(dir, `usage-${String(Math.random()).slice(2)}.ts`);
  await writeFile(
    file,
    snippet.replaceAll("TYPES", TYPES_INDEX).replaceAll("PKG", SRC_INDEX),
    "utf8"
  );
  const program = ts.createProgram([file], {
    strict: true,
    noEmit: true,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    lib: ["lib.es2022.d.ts", "lib.dom.d.ts"],
    skipLibCheck: true,
    types: [],
  });
  return ts
    .getPreEmitDiagnostics(program, program.getSourceFile(file))
    .map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
}

describe("#73: QueryExpressionToFetchXmlAction", () => {
  it("sends the query with its @odata.type and returns the FetchXml", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/QueryExpressionToFetchXml", () =>
      jsonResponse({ FetchXml: '<fetch><entity name="account" /></fetch>' })
    );

    const result = await client.execute(
      new QueryExpressionToFetchXmlAction({
        Query: {
          "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
          EntityName: "account",
          ColumnSet: { AllColumns: true },
        },
      })
    );

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      Query: {
        "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
        EntityName: "account",
        ColumnSet: { AllColumns: true },
      },
    });
    expect(result.FetchXml).toBe('<fetch><entity name="account" /></fetch>');
  });

  it("the QueryExpression from the issue, and a FetchExpression, compile without casts", async () => {
    const errors = await typecheck(`import { QueryExpressionToFetchXmlAction } from "PKG";
new QueryExpressionToFetchXmlAction({
  Query: {
    "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
    EntityName: "account",
    ColumnSet: { AllColumns: true },
  },
});
new QueryExpressionToFetchXmlAction({
  Query: {
    "@odata.type": "Microsoft.Dynamics.CRM.FetchExpression",
    Query: "<fetch><entity name='account'/></fetch>",
  },
});
`);
    expect(errors).toEqual([]);
  }, 120_000);

  it("complex-type properties without Nullable=false can be left out", async () => {
    const errors =
      await typecheck(`import type { ColumnSet, PagingInfo, QueryExpression } from "TYPES";
const columns: ColumnSet = { Columns: ["name"] };
const page: PagingInfo = { PageNumber: 1, Count: 50 };
const query: QueryExpression = { EntityName: "account", ColumnSet: columns, PageInfo: page };
export { query };
`);
    expect(errors).toEqual([]);
  }, 120_000);

  it("a query without @odata.type doesn't compile (Dataverse answers 400 for it)", async () => {
    const errors = await typecheck(`import { QueryExpressionToFetchXmlAction } from "PKG";
new QueryExpressionToFetchXmlAction({ Query: { EntityName: "account", ColumnSet: { AllColumns: true } } });
`);
    expect(errors.join("\n")).toMatch(/@odata\.type/);
  }, 120_000);
});
