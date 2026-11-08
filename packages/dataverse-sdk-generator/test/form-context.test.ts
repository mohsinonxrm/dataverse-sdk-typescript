/**
 * #347: with `formContext`, each table gets `forms/<Entity>Form.ts`: its columns typed as
 * `Xrm.Attributes` / `Xrm.Controls` (from `@types/xrm`) by logical name, and a form context whose
 * `getAttribute()` / `getControl()` take those names. A form script type-checks against it; a
 * misspelt column or a value of the wrong type doesn't.
 */
import { afterAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  fixtureMetadataService,
  generateFixture,
  scratchFolders,
  typecheck,
} from "./fixtures/compile.js";
import { WRITE_EDMX, WRITE_ENTITY_METADATA } from "./fixtures/write-metadata.js";

const scratch = scratchFolders("form-context");
afterAll(scratch.cleanup);

const service = fixtureMetadataService(WRITE_EDMX, WRITE_ENTITY_METADATA);
const entities = ["account", "contact", "systemuser"];

// A form script. Each @ts-expect-error must have an error under it, or the type-check fails.
const FORM_SCRIPT = `
import type { AccountFormContext, ContactFormContext } from "./forms/index.js";
import { account_industrycode, contoso_channel } from "./enums/index.js";

export function onLoad(executionContext: Xrm.Events.EventContext): void {
  const form = executionContext.getFormContext() as AccountFormContext;

  const name: Xrm.Attributes.StringAttribute | null = form.getAttribute("name");
  name?.setValue("Contoso");
  form.getAttribute("description")?.getMaxLength();

  const industry = form.getAttribute("industrycode");
  if (industry?.getValue() === account_industrycode.Accounting) {
    industry.setValue(account_industrycode.Agriculture);
  }
  form.getAttribute("statecode")?.getValue();
  form.getAttribute("contoso_channels")?.setValue([contoso_channel.Email, contoso_channel.Phone]);

  const credit = form.getAttribute("creditlimit");
  credit?.setValue(5000);
  form.getAttribute("numberofemployees")?.getMax();
  form.getAttribute("creditonhold")?.setValue(true);
  const created: Date | null | undefined = form.getAttribute("createdon")?.getValue();

  const contact = form.getAttribute("primarycontactid");
  const contactId: string | undefined = contact?.getValue()?.[0]?.id;
  form.getAttribute("contoso_parentaccountid")?.setValue(null);
  form.getAttribute("ownerid")?.getValue();

  form.getControl("name")?.setDisabled(true);
  form.getControl("header_name")?.setVisible(false);
  form.getControl("header_process_industrycode")?.removeOption(1);
  form.getControl("primarycontactid")?.addPreSearch(() => undefined);
  form.getControl("contoso_channels")?.clearOptions();

  // Everything else is Xrm.FormContext
  form.data.entity.getId();
  form.ui.setFormNotification("Saved", "INFO", "saved");
  form.getAttribute().forEach((a) => a.getName());
  form.getControl((c) => c.getControlType() === "lookup").length;

  // @ts-expect-error not a column of account
  form.getAttribute("notacolumn");
  // @ts-expect-error the lookup's navigation property isn't an attribute name
  form.getAttribute("contoso_ParentAccountId");
  // @ts-expect-error not an option of industrycode
  industry?.setValue(7);
  // @ts-expect-error text for a number column
  credit?.setValue("5000");
  // @ts-expect-error a lookup takes LookupValue[]
  contact?.setValue("00000000-0000-0000-0000-000000000001");
  // @ts-expect-error a text column has no lookup methods
  form.getControl("name")?.addPreSearch(() => undefined);
  // @ts-expect-error the read-only name column of a lookup isn't on forms
  form.getAttribute("primarycontactidname");

  const contactForm = executionContext.getFormContext() as ContactFormContext;
  contactForm.getAttribute("parentcustomerid")?.getValue();
  // @ts-expect-error an account column
  contactForm.getAttribute("industrycode");

  console.log(created, contactId);
}
`;

describe("Xrm form context types (#347)", () => {
  it("a form script type-checks against them, and mistakes don't", async () => {
    const dir = await scratch.create();
    await generateFixture(service, dir, { entities, formContext: true });
    await fs.writeFile(path.join(dir, "form-script.ts"), FORM_SCRIPT, "utf-8");
    expect(await typecheck(dir)).toEqual([]);
  });

  it("forms/<Entity>Form.ts has the columns by logical name with their Xrm types", async () => {
    const dir = await scratch.create();
    await generateFixture(service, dir, { entities, formContext: true });
    const source = await fs.readFile(path.join(dir, "forms", "AccountForm.ts"), "utf-8");
    expect(source.startsWith('/// <reference types="xrm" />')).toBe(true);
    for (const line of [
      "  name: Xrm.Attributes.StringAttribute;",
      "  industrycode: Xrm.Attributes.OptionSetAttribute<account_industrycode>;",
      "  contoso_channels: Xrm.Attributes.MultiSelectOptionSetAttribute<contoso_channel>;",
      "  creditlimit: Xrm.Attributes.NumberAttribute;",
      "  createdon: Xrm.Attributes.DateAttribute;",
      "  creditonhold: Xrm.Attributes.BooleanAttribute;",
      "  contoso_parentaccountid: Xrm.Attributes.LookupAttribute;",
      "  primarycontactid: Xrm.Controls.LookupControl;",
      "export type AccountFormContext = Omit<",
    ]) {
      expect(source).toContain(line);
    }
    // Not on forms: the primary key, a lookup's _value property and name column
    expect(source).not.toMatch(/\baccountid:|_primarycontactid_value|primarycontactidname/);
    const index = await fs.readFile(path.join(dir, "index.ts"), "utf-8");
    expect(index).toContain("export * from './forms/index.js';");
  });

  it("is off by default: no forms folder, and no Xrm in the output", async () => {
    const dir = await scratch.create();
    await generateFixture(service, dir, { entities });
    await expect(fs.access(path.join(dir, "forms"))).rejects.toThrow();
    expect(await fs.readFile(path.join(dir, "index.ts"), "utf-8")).not.toContain("forms");
  });
});
