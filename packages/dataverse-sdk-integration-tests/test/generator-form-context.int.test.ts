/**
 * Live test for the generator's form context types (#347, `formContext: true`): the forms
 * generated from the org's account and contact metadata (every column type the real tables have)
 * type-check with `@types/xrm`, and so does a form script that uses them. Reads metadata only.
 */
import { writeFile } from "node:fs/promises";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { live } from "./env.js";
import { generateLive, removeGenerated, typecheck } from "./generated.js";

const SLOW = 120_000;

// Each @ts-expect-error must have an error under it, or the type-check fails.
const FORM_SCRIPT = `
import type { AccountFormContext, ContactFormContext } from "./forms/index.js";

export function onLoad(executionContext: Xrm.Events.EventContext): void {
  const account = executionContext.getFormContext() as AccountFormContext;
  const name: Xrm.Attributes.StringAttribute | null = account.getAttribute("name");
  const credit: Xrm.Attributes.NumberAttribute | null = account.getAttribute("creditlimit");
  const contact: Xrm.Attributes.LookupAttribute | null = account.getAttribute("primarycontactid");
  const industry = account.getAttribute("industrycode");
  industry?.getValue();
  account.getControl("primarycontactid")?.addPreSearch(() => undefined);
  account.getControl("header_ownerid")?.setDisabled(true);
  // @ts-expect-error not a column of account
  account.getAttribute("notacolumn");
  // @ts-expect-error text for a number column
  credit?.setValue("1");

  const person = executionContext.getFormContext() as ContactFormContext;
  const parent: Xrm.Attributes.LookupAttribute | null = person.getAttribute("parentcustomerid");
  const birthday: Xrm.Attributes.DateAttribute | null = person.getAttribute("birthdate");
  console.log(name, contact, parent, birthday);
}
`;

describe.skipIf(!live)("live: generated form context types (#347)", () => {
  let dir = "";

  beforeAll(async () => {
    dir = await generateLive({ entities: ["account", "contact"], formContext: true });
  }, SLOW);

  afterAll(async () => {
    await removeGenerated();
  });

  it(
    "the forms of account and contact, and a form script using them, type-check",
    async () => {
      await writeFile(path.join(dir, "form-script.ts"), FORM_SCRIPT, "utf-8");
      expect(await typecheck(dir)).toEqual([]);
    },
    SLOW
  );
});
