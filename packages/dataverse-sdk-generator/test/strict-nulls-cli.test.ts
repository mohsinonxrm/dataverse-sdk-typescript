/**
 * #305: `dataverse-gen generate --strict-nulls` and `"strictNulls": true` in the configuration file
 * turn the option on; `validate` rejects a value that isn't a boolean. The CLI module runs as it
 * does from the command line (it parses `process.argv` when imported); only `fetch` is replaced.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { TYPECHECK_EDMX, TYPECHECK_ENTITY_METADATA } from "./fixtures/typecheck-metadata.js";

let dir = "";
const argv = process.argv;

beforeEach(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), "dataverse-gen-305-"));
  vi.stubGlobal("fetch", (url: string) =>
    Promise.resolve(
      new Response(
        url.includes("$metadata")
          ? TYPECHECK_EDMX
          : JSON.stringify(TYPECHECK_ENTITY_METADATA.account),
        { status: 200 }
      )
    )
  );
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
  vi.spyOn(process.stderr, "write").mockImplementation(() => true);
  vi.spyOn(process, "exit").mockImplementation((code) => {
    throw new Error(`process.exit(${String(code)})`);
  });
});

afterEach(async () => {
  process.argv = argv;
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.resetModules();
  await fs.rm(dir, { recursive: true, force: true });
});

/** Run `dataverse-gen <args>` with a configuration file; returns the generated WhoAmI file. */
async function run(args: string[], config: Record<string, unknown> = {}): Promise<string> {
  const configPath = path.join(dir, "dataverse-gen.json");
  await fs.writeFile(
    configPath,
    JSON.stringify({
      environmentUrl: "https://contoso.crm.dynamics.com",
      entities: ["account"],
      actions: ["PublishAllXml"],
      functions: ["WhoAmI"],
      output: { outputRoot: path.join(dir, "out") },
      ...config,
    })
  );
  process.argv = ["node", "dataverse-gen", ...args, "-c", configPath];
  await import("../src/cli.js");
  if (args[0] !== "generate") return "";
  return fs.readFile(path.join(dir, "out", "complextypes", "WhoAmIResponse.ts"), "utf-8");
}

describe("#305: turning strictNulls on", () => {
  it("is off by default", async () => {
    expect(await run(["generate", "--token", "t"])).not.toContain("WhoAmIResponseOutput");
  });

  it("--strict-nulls turns it on", async () => {
    const file = await run(["generate", "--token", "t", "--strict-nulls"]);
    expect(file).toContain(
      "export interface WhoAmIResponseOutput {\n  BusinessUnitId: string | null;"
    );
  });

  it('"strictNulls": true in the configuration file turns it on', async () => {
    const file = await run(["generate", "--token", "t"], { strictNulls: true });
    expect(file).toContain("export interface WhoAmIResponseOutput {");
  });

  it("validate rejects a strictNulls that isn't a boolean", async () => {
    await expect(run(["validate"], { strictNulls: "yes" })).rejects.toThrow("process.exit(1)");
    expect(vi.mocked(console.log).mock.calls.flat().join("\n")).toContain(
      "strictNulls must be true or false"
    );
  });
});
