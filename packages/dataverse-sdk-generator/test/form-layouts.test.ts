/**
 * #430: with `formLayouts`, each table's main and quick create forms get their own types, from
 * their FormXml: the columns and controls on the form (duplicates, header controls, party list,
 * file and image columns, subgrids, web resources, IFRAMEs, quick view forms, the timeline), its
 * tabs and sections, and a form context whose `getAttribute()`, `getControl()` and `ui.tabs.get()`
 * take those names. A form script type-checks against them with `@types/xrm`; a name that isn't on
 * the form doesn't.
 */
import { afterAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { parseFormXml, toFormLayout } from "../src/form-xml.js";
import { SchemaModel } from "../src/schema-model.js";
import { TypescriptGenerator } from "../src/typescript-generator.js";
import type { DataverseGenConfig } from "../src/types.js";
import {
  fixtureMetadataService,
  generateFixture,
  scratchFolders,
  typecheck,
} from "./fixtures/compile.js";
import {
  ACCOUNT_MAIN_FORMXML,
  FORM_ENTITY_METADATA,
  FORM_RECORDS,
} from "./fixtures/form-layouts.js";
import { WRITE_EDMX } from "./fixtures/write-metadata.js";

const scratch = scratchFolders("form-layouts");
afterAll(scratch.cleanup);

const service = fixtureMetadataService(WRITE_EDMX, FORM_ENTITY_METADATA, FORM_RECORDS);
const entities = ["account", "contact", "systemuser"];

// A form script. Each @ts-expect-error must have an error under it, or the type-check fails.
const FORM_SCRIPT = `
import type {
  AccountMain_AccountControls,
  AccountMain_AccountFormContext,
  AccountMain_SalesInsightsFormContext,
  AccountQuickCreate_AccountQuickCreateFormContext,
} from "./forms/index.js";
import { account_industrycode, contoso_channel } from "./enums/index.js";

export function onLoad(executionContext: Xrm.Events.EventContext): void {
  const form = executionContext.getFormContext() as AccountMain_AccountFormContext;

  // On the form: not null
  const name: Xrm.Attributes.StringAttribute = form.getAttribute("name");
  name.setValue("Contoso");
  form.getAttribute("industrycode").setValue(account_industrycode.Accounting);
  form.getAttribute("contoso_channels").setValue([contoso_channel.Email]);
  form.getAttribute("creditlimit").setValue(5000);
  const contactId: string | undefined = form.getAttribute("primarycontactid").getValue()?.[0]?.id;
  const attendees: Xrm.Attributes.LookupAttribute = form.getAttribute("contoso_attendees");
  form.getAttribute("contoso_contract").getName();
  form.getAttribute("entityimage").getName();
  // Header columns are on the form too
  form.getAttribute("ownerid").getValue();
  form.getAttribute("creditonhold").setValue(true);

  form.getControl("name").setDisabled(true);
  form.getControl("name1").setVisible(false);
  form.getControl("header_ownerid").addPreSearch(() => undefined);
  form.getControl("header_creditonhold").setDisabled(true);
  form.getControl("industrycode").removeOption(1);
  form.getControl("contoso_attendees").addPreSearch(() => undefined);
  form.getControl("contoso_contract").setVisible(false);
  form.getControl("Contacts").refresh();
  form.getControl("WebResource_map").getSrc();
  form.getControl("IFRAME_news").setSrc("https://example.com");
  form.getControl("contactquickform").isLoaded();
  form.getControl("notescontrol").refresh();

  // Another column of the table, a business process flow control: | null
  form.getAttribute("statecode")?.getValue();
  form.getAttribute("description")?.getMaxLength();
  form.getControl("header_process_industrycode")?.removeOption(1);

  // Tabs and sections by name
  form.ui.tabs.get("SUMMARY_TAB").sections.get("ACCOUNT_INFORMATION").setVisible(false);
  form.ui.tabs.get("DETAILS_TAB").sections.get("BILLING").getName();
  form.ui.tabs.get("SUMMARY_TAB").setDisplayState("collapsed");
  form.ui.tabs.get(0)?.getName();
  form.ui.tabs.forEach((tab) => tab.getName());

  // Everything else is Xrm.FormContext
  form.ui.setFormNotification("Saved", "INFO", "saved");
  form.data.entity.getId();
  form.getAttribute().forEach((a) => a.getName());
  form.getControl((c) => c.getControlType() === "subgrid").length;

  // @ts-expect-error a footer control: getControl() doesn't reach it
  form.getControl("footer_statecode");
  // @ts-expect-error not a column of account
  form.getAttribute("notacolumn");
  // @ts-expect-error a column that isn't on the form can be null
  form.getAttribute("statecode").getValue();
  // @ts-expect-error a column has no control on a form it isn't on
  form.getControl("description");
  // @ts-expect-error the column is on the form twice, not three times
  form.getControl("name2");
  // @ts-expect-error not a tab of the form
  form.ui.tabs.get("NOT_A_TAB");
  // @ts-expect-error a tab without a name isn't typed
  form.ui.tabs.get("UNNAMED_TAB_SECTION");
  // @ts-expect-error a section of another tab
  form.ui.tabs.get("SUMMARY_TAB").sections.get("BILLING");
  // @ts-expect-error a subgrid has no lookup methods
  form.getControl("Contacts").addPreSearch(() => undefined);
  // @ts-expect-error not an option of industrycode
  form.getAttribute("industrycode").setValue(7);

  const quick = executionContext.getFormContext() as AccountQuickCreate_AccountQuickCreateFormContext;
  quick.getAttribute("name").getValue();
  quick.ui.tabs.get("tab_1").sections.get("section_1").setVisible(true);
  // @ts-expect-error not on the quick create form
  quick.getControl("Contacts");

  const insights = executionContext.getFormContext() as AccountMain_SalesInsightsFormContext;
  insights.getAttribute("description").getMaxLength();
  // @ts-expect-error not on this form
  insights.getControl("name");

  const control: keyof AccountMain_AccountControls = "header_creditonhold";
  console.log(attendees, contactId, control);
}
`;

describe("FormXml (#430)", () => {
  it("reads the named tabs and sections, and the body and header controls by id", () => {
    const { tabs, controls } = parseFormXml(ACCOUNT_MAIN_FORMXML);
    expect(tabs).toEqual([
      {
        Name: "SUMMARY_TAB",
        Label: "Summary",
        Sections: [
          { Name: "ACCOUNT_INFORMATION", Label: "Account Information" },
          { Name: "CONTACTS", Label: "Contacts" },
        ],
      },
      { Name: "DETAILS_TAB", Sections: [{ Name: "BILLING" }] },
    ]);
    expect(controls.map((c) => [c.Id, c.Location, c.Kind, c.DataField])).toEqual([
      ["name", "body", "column", "name"],
      ["industrycode", "body", "column", "industrycode"],
      ["primarycontactid", "body", "column", "primarycontactid"],
      ["contoso_attendees", "body", "column", "contoso_attendees"],
      ["contoso_contract", "body", "column", "contoso_contract"],
      ["entityimage", "body", "column", "entityimage"],
      ["Contacts", "body", "subgrid", undefined],
      ["contactquickform", "body", "quickView", undefined],
      ["notescontrol", "body", "timeline", undefined],
      ["name1", "body", "column", "name"],
      ["creditlimit", "body", "column", "creditlimit"],
      ["contoso_channels", "body", "column", "contoso_channels"],
      ["WebResource_map", "body", "webResource", undefined],
      ["IFRAME_news", "body", "iframe", undefined],
      ["header_ownerid", "header", "column", "ownerid"],
      ["header_creditonhold", "header", "column", "creditonhold"],
    ]);
  });

  it("reads main and quick create forms only, with each bound column's type", () => {
    const columnTypes = new Map([["contoso_attendees", "PartyListType"]]);
    const [quickCreate, main, , card] = FORM_RECORDS.account;
    expect(toFormLayout(card, columnTypes)).toBeUndefined();
    expect(toFormLayout(quickCreate, columnTypes)?.Kind).toBe("quickCreate");
    const layout = toFormLayout(main, columnTypes);
    expect(layout).toMatchObject({ FormId: "11111111-1111-1111-1111-111111111111", Kind: "main" });
    expect(layout?.Controls.find((c) => c.Id === "contoso_attendees")?.ColumnType).toBe(
      "PartyListType"
    );
    expect(toFormLayout({ formid: "x", type: 2 }, columnTypes)).toBeUndefined();
  });
});

describe("per-form types (#430)", () => {
  it("a form script type-checks against them, and names that aren't on the form don't", async () => {
    const dir = await scratch.create();
    await generateFixture(service, dir, { entities, formLayouts: true });
    await fs.writeFile(path.join(dir, "form-script.ts"), FORM_SCRIPT, "utf-8");
    expect(await typecheck(dir)).toEqual([]);
  });

  it("forms/<Entity>Forms.ts has each form's members with their Xrm types", async () => {
    const dir = await scratch.create();
    const model = await generateFixture(service, dir, { entities, formLayouts: true });
    expect(
      model.EntityTypes.find((e) => e.LogicalName === "account")?.Forms?.map((f) => f.Name)
    ).toEqual(["Account", "Sales Insights", "Account Quick Create"]);

    const source = await fs.readFile(path.join(dir, "forms", "AccountForms.ts"), "utf-8");
    expect(source.startsWith('/// <reference types="xrm" />')).toBe(true);
    for (const line of [
      'import type { AccountAttributes, AccountControls } from "./AccountForm.js";',
      'import type { FormLayoutUi } from "./form-layout.js";',
      "export interface AccountMain_AccountAttributes {",
      '  name: AccountAttributes["name"];',
      '  industrycode: AccountAttributes["industrycode"];',
      "  contoso_attendees: Xrm.Attributes.LookupAttribute;",
      "  contoso_contract: Xrm.Attributes.Attribute;",
      "  entityimage: Xrm.Attributes.Attribute;",
      '  ownerid: AccountAttributes["ownerid"];',
      "export interface AccountMain_AccountControls {",
      '  name1: AccountControls["name"];',
      '  header_ownerid: AccountControls["ownerid"];',
      "  contoso_attendees: Xrm.Controls.LookupControl;",
      "  contoso_contract: Xrm.Controls.StandardControl;",
      "  Contacts: Xrm.Controls.GridControl;",
      "  WebResource_map: Xrm.Controls.IframeControl;",
      "  IFRAME_news: Xrm.Controls.IframeControl;",
      "  contactquickform: Xrm.Controls.QuickFormControl;",
      "  notescontrol: Xrm.Controls.TimelineWall;",
      "export interface AccountMain_AccountTabs {",
      '  SUMMARY_TAB: "ACCOUNT_INFORMATION" | "CONTACTS";',
      '  DETAILS_TAB: "BILLING";',
      "export type AccountMain_AccountFormContext = Omit<",
      "  ui: FormLayoutUi<AccountMain_AccountTabs>;",
      "export type AccountMain_SalesInsightsFormContext = Omit<",
      "export type AccountQuickCreate_AccountQuickCreateFormContext = Omit<",
    ]) {
      expect(source).toContain(line);
    }
    // The footer, a spacer without an id, a tab without a name
    expect(source).not.toMatch(/footer_statecode|UNNAMED_TAB_SECTION| {2}statecode:/);
    // A column is an attribute once, however many controls it has
    expect(source.match(/^ {2}name: AccountAttributes\["name"\];$/gm)).toHaveLength(2);

    // contact has no forms: an empty module
    expect(await fs.readFile(path.join(dir, "forms", "ContactForms.ts"), "utf-8")).toContain(
      "export {};"
    );
    const index = await fs.readFile(path.join(dir, "forms", "index.ts"), "utf-8");
    expect(index).toContain("export * from './AccountForm.js';");
    expect(index).toContain("export * from './AccountForms.js';");
    expect(index).not.toContain("form-layout");
  });

  it("turns on the table-wide form contexts, and is off by default", async () => {
    const dir = await scratch.create();
    await generateFixture(service, dir, { entities, formLayouts: true });
    await expect(fs.access(path.join(dir, "forms", "AccountForm.ts"))).resolves.toBeUndefined();

    const off = await scratch.create();
    await generateFixture(service, off, { entities, formContext: true });
    await expect(fs.access(path.join(off, "forms", "AccountForms.ts"))).rejects.toThrow();
    await expect(fs.access(path.join(off, "forms", "form-layout.ts"))).rejects.toThrow();
  });

  it("incremental: a changed form regenerates its table's files and keeps the others", async () => {
    const dir = await scratch.create();
    const run = async (forms: typeof FORM_RECORDS) => {
      const config: DataverseGenConfig = {
        environmentUrl: "https://contoso.crm.dynamics.com",
        entities,
        formLayouts: true,
        output: { outputRoot: dir, incremental: true },
      };
      const model = new SchemaModel(
        fixtureMetadataService(WRITE_EDMX, FORM_ENTITY_METADATA, forms),
        config
      );
      await model.generate();
      const generator = new TypescriptGenerator(model, config);
      await generator.generate();
      return generator.unchangedTables;
    };
    expect(await run(FORM_RECORDS)).toEqual([]);
    expect(await run(FORM_RECORDS)).toEqual(["account", "contact", "systemuser"]);

    // The quick create form gains a column
    const changed = structuredClone(FORM_RECORDS);
    const quickCreate = changed.account.find((f) => f.type === 7);
    if (quickCreate?.formxml) {
      quickCreate.formxml = quickCreate.formxml.replace(
        "</rows>",
        '<row><cell><control id="creditlimit" classid="{533B9E00-756B-4312-95A0-DC888637AC78}" datafieldname="creditlimit" /></cell></row></rows>'
      );
    }
    expect(await run(changed)).toEqual(["contact", "systemuser"]);
    expect(await fs.readFile(path.join(dir, "forms", "AccountForms.ts"), "utf-8")).toMatch(
      /AccountQuickCreate_AccountQuickCreateAttributes \{[^}]*creditlimit/
    );
    expect(await typecheck(dir)).toEqual([]);
  });
});
