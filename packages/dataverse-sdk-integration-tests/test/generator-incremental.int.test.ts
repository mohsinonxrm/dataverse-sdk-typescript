/**
 * Live test for incremental generation (#347, `output.incremental`): the hashes of the org's
 * tables are stable from one run to the next, so a second run over unchanged metadata keeps every
 * table's files, and the output still type-checks. Reads metadata only.
 */
import { readFile, stat } from "node:fs/promises";
import * as path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { live } from "./env.js";
import { generateLive, generateLiveInto, removeGenerated, typecheck } from "./generated.js";

const SLOW = 240_000;

describe.skipIf(!live)("live: incremental generation (#347)", () => {
  afterAll(async () => {
    await removeGenerated();
  });

  it(
    "a second run over unchanged metadata keeps every table",
    async () => {
      const selection = { entities: ["account", "contact"], formContext: true };
      const dir = await generateLive({ entities: ["account"] });
      const first = await generateLiveInto(dir, selection, { incremental: true });
      expect(first.unchangedTables).toEqual([]);
      const account = path.join(dir, "entities", "Account.ts");
      const before = (await stat(account)).mtimeMs;
      const text = await readFile(account, "utf-8");

      const second = await generateLiveInto(dir, selection, { incremental: true });
      expect([...second.unchangedTables].sort()).toEqual(["account", "contact"]);
      expect((await stat(account)).mtimeMs).toBe(before);
      expect(await readFile(account, "utf-8")).toBe(text);
      expect(await typecheck(dir)).toEqual([]);
    },
    SLOW
  );
});
