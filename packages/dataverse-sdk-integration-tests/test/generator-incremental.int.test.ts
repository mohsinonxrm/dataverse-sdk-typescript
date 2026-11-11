/**
 * Live test for incremental generation (#347, `output.incremental`): the hashes of the org's
 * tables are stable from one run to the next, so a second run over unchanged metadata keeps every
 * table's files, and the output still type-checks. Reads metadata only.
 *
 * It uses contact and task because no other live test changes them: the suite runs files in
 * parallel, and metadata-builders and metadata-create add lookups to account, which change
 * account's metadata (and so its hash) between this test's two runs.
 *
 * It's read-only and each attempt generates into a new directory, so it may retry once
 * (`{ retry: 1 }`): in the run for #496 the second generation found contact and task changed,
 * although no test in that run touched them. The flaky reporter lists it if it needs the retry.
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
    { timeout: SLOW, retry: 1 },
    async () => {
      const selection = { entities: ["contact", "task"], formContext: true };
      const dir = await generateLive({ entities: ["contact"] });
      const first = await generateLiveInto(dir, selection, { incremental: true });
      expect(first.unchangedTables).toEqual([]);
      const contact = path.join(dir, "entities", "Contact.ts");
      const before = (await stat(contact)).mtimeMs;
      const text = await readFile(contact, "utf-8");

      const second = await generateLiveInto(dir, selection, { incremental: true });
      expect([...second.unchangedTables].sort()).toEqual(["contact", "task"]);
      expect((await stat(contact)).mtimeMs).toBe(before);
      expect(await readFile(contact, "utf-8")).toBe(text);
      expect(await typecheck(dir)).toEqual([]);
    }
  );
});
