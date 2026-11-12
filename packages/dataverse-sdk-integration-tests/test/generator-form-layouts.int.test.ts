/**
 * Live test for the generator's per-form types (#430, `formLayouts: true`): account's real main
 * and quick create forms, read from their `systemform` FormXml, generate types that type-check
 * with `@types/xrm`, and so does a form script that uses the main form's columns, controls and
 * tabs. Reads metadata and forms only; creates nothing.
 */
import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { live } from "./env.js";
import { generateLive, removeGenerated, typecheck } from "./generated.js";

const SLOW = 180_000;

describe.skipIf(!live)("live: generated form layout types (#430)", () => {
  let dir = "";
  let source = "";
  /** The type name stem of account's main form "Account". */
  let main = "";

  beforeAll(async () => {
    dir = await generateLive({ entities: ["account"], formLayouts: true });
    source = await readFile(path.join(dir, "forms", "AccountForms.ts"), "utf-8");
    // The standard main form is named "Account"; another main form may come first, so look it up
    main = /export type (AccountMain_Account(?:_\d+)?)FormContext\b/.exec(source)?.[1] ?? "";
  }, SLOW);

  afterAll(async () => {
    await removeGenerated();
  });

  it(
    "generates a form context for the main form Account and for a quick create form",
    () => {
      expect(main).not.toBe("");
      expect(source).toMatch(/export type AccountQuickCreate_\w+FormContext\b/);
      expect(source).toContain(`export interface ${main}Tabs {`);
      // Columns the standard Account form has in its body, and the header owner
      expect(source).toMatch(new RegExp(`interface ${main}Attributes \\{[^}]*\\bname: `));
      expect(source).toMatch(new RegExp(`interface ${main}Controls \\{[^}]*\\bheader_ownerid: `));
    },
    SLOW
  );

  it(
    "the forms, and a form script using the main form, type-check",
    async () => {
      const script = `
import type { ${main}FormContext, ${main}Tabs } from "./forms/index.js";

export function onLoad(executionContext: Xrm.Events.EventContext): void {
  const form = executionContext.getFormContext() as ${main}FormContext;
  const name: Xrm.Attributes.StringAttribute = form.getAttribute("name");
  name.getValue();
  form.getControl("header_ownerid").addPreSearch(() => undefined);
  form.getAttribute("industrycode")?.getValue();
  form.getControl("header_process_industrycode")?.setDisabled(true);
  const tab: keyof ${main}Tabs = Object.keys({} as ${main}Tabs)[0] as keyof ${main}Tabs;
  form.ui.tabs.get(tab).sections.forEach((section) => section.getName());
  // @ts-expect-error not a column of account
  form.getAttribute("notacolumn");
  // @ts-expect-error not a tab of the form
  form.ui.tabs.get("NOT_A_TAB_OF_THE_FORM");
}
`;
      await writeFile(path.join(dir, "form-script.ts"), script, "utf-8");
      expect(await typecheck(dir)).toEqual([]);
    },
    SLOW
  );
});
