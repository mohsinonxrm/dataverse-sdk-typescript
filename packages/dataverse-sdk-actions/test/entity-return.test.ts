/**
 * #71: an action that returns one entity (ExecuteWorkflow returns an asyncoperation) is typed as
 * that entity. The response body is the entity itself; `res.value.asyncoperationid` was undefined at
 * runtime and the correct `res.asyncoperationid` didn't type-check.
 */
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import { ExecuteWorkflowAction } from "../src/index.js";

const SRC: string = fileURLToPath(new URL("../src/ExecuteWorkflowAction.js", import.meta.url));
const WORKFLOW = "11111111-1111-1111-1111-111111111111";

let dir: string;
beforeAll(async () => {
  dir = await mkdtemp(join(tmpdir(), "actions-71-"));
});
afterAll(async () => {
  await rm(dir, { recursive: true, force: true });
});

async function typecheck(snippet: string): Promise<string[]> {
  const file = join(dir, `usage-${String(Math.random()).slice(2)}.ts`);
  await writeFile(file, snippet.replaceAll("SRC", SRC), "utf8");
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

describe("#71: entity-returning actions", () => {
  it("(await client.execute(new ExecuteWorkflowAction(...))).asyncoperationid works", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", `/workflows(${WORKFLOW})/Microsoft.Dynamics.CRM.ExecuteWorkflow`, () =>
      jsonResponse({
        "@odata.context": "$metadata#asyncoperations/$entity",
        asyncoperationid: "aaa",
      })
    );

    const res = await client.execute(new ExecuteWorkflowAction(WORKFLOW, "e1", {}));

    expect(res.asyncoperationid).toBe("aaa");
    expect(res["@odata.context"]).toBe("$metadata#asyncoperations/$entity");
  });

  it("res.asyncoperationid type-checks; res.value doesn't", async () => {
    expect(
      await typecheck(`import type { ExecuteWorkflowResponse } from "SRC";
declare const res: ExecuteWorkflowResponse;
export const id: string | undefined = res.asyncoperationid;
`)
    ).toEqual([]);
    expect(
      (
        await typecheck(`import type { ExecuteWorkflowResponse } from "SRC";
declare const res: ExecuteWorkflowResponse;
export const v: unknown = res.value;
`)
      ).length
    ).toBeGreaterThan(0);
  }, 120_000);
});
