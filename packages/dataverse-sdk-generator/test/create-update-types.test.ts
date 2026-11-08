/**
 * #347: every generated table gets `<Entity>Create` and `<Entity>Update` types next to its
 * interface. They have only the columns Dataverse accepts in a create (`IsValidForCreate`) or an
 * update (`IsValidForUpdate`), and lookups are set through their navigation property with an
 * `EntityReference`, which `formatEntityForWrite()` turns into `<navigation>@odata.bind`.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { SchemaModel } from "../src/schema-model.js";
import {
  compileToJs,
  fixtureMetadataService,
  generateFixture,
  importGenerated,
  scratchFolders,
  typecheck,
} from "./fixtures/compile.js";
import { WRITE_EDMX, WRITE_ENTITY_METADATA } from "./fixtures/write-metadata.js";

const scratch = scratchFolders("create-update-types");
afterAll(scratch.cleanup);

const service = fixtureMetadataService(WRITE_EDMX, WRITE_ENTITY_METADATA);
const config = { entities: ["account", "contact", "systemuser"] };

// A file an app would write. Each @ts-expect-error must have an error under it, or the
// type-check fails ("Unused '@ts-expect-error' directive").
const USAGE = `
import {
  createEntityReference,
  formatEntityForWrite,
} from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import {
  type AccountCreate,
  type AccountUpdate,
  AccountMetadata,
  type ContactCreate,
  type ContactUpdate,
} from "./entities/index.js";
import { account_industrycode, account_statecode } from "./enums/index.js";
import { EntityMetadataCache } from "./metadata.js";

const id = "00000000-0000-0000-0000-000000000001";

export const create: AccountCreate = {
  accountid: id,
  name: "Contoso",
  description: null,
  creditlimit: 5000,
  numberofemployees: 10,
  industrycode: account_industrycode.Accounting,
  importsequencenumber: 1,
  primarycontactid: createEntityReference("contact", id),
  contoso_ParentAccountId: createEntityReference("account", id),
  ownerid: createEntityReference("systemuser", id),
};
export const update: AccountUpdate = {
  name: "Contoso Ltd",
  statecode: account_statecode.Inactive,
  primarycontactid: null,
};
export const contact: ContactCreate = {
  lastname: "Doe",
  parentcustomerid: createEntityReference("account", id),
};
export const contactUpdate: ContactUpdate = { parentcustomerid: null };

// Dataverse sets these; neither a create nor an update takes them
// @ts-expect-error createdon is read-only
export const c1: AccountCreate = { createdon: "2024-01-01T00:00:00Z" };
// @ts-expect-error versionnumber is read-only
export const u1: AccountUpdate = { versionnumber: 1 };
// @ts-expect-error createdby is a read-only lookup
export const c2: AccountCreate = { createdby: createEntityReference("systemuser", id) };
// @ts-expect-error a lookup's _<name>_value property is read-only: set the lookup itself
export const c3: AccountCreate = { _primarycontactid_value: id };
// @ts-expect-error the lookup's name column is read-only
export const c4: AccountCreate = { primarycontactidname: "Jane" };
// @ts-expect-error fullname is calculated
export const c5: ContactCreate = { fullname: "Jane Doe" };

// Valid for one of create and update only
// @ts-expect-error statecode can't be set on create
export const c6: AccountCreate = { statecode: account_statecode.Active };
// @ts-expect-error the primary key can't be changed
export const u2: AccountUpdate = { accountid: id };
// @ts-expect-error importsequencenumber is set on create only
export const u3: AccountUpdate = { importsequencenumber: 2 };

// A lookup takes a reference, not an id or a record
// @ts-expect-error not an id
export const c7: AccountCreate = { primarycontactid: id };
// @ts-expect-error a custom lookup is set through its navigation property, contoso_ParentAccountId
export const c8: AccountCreate = { contoso_parentaccountid: createEntityReference("account", id) };
// @ts-expect-error no columns but the ones the table has
export const c9: AccountCreate = { name: "Contoso", notacolumn: 1 };

export function body(): Record<string, unknown> {
  return formatEntityForWrite(create, AccountMetadata, { metadataCache: EntityMetadataCache });
}
`;

describe("create and update types (#347)", () => {
  let dir = "";
  let model: SchemaModel;

  beforeAll(async () => {
    dir = await scratch.create();
    model = await generateFixture(service, dir, config);
  });

  it("type-check with only the writable columns, lookups as references", async () => {
    await fs.writeFile(path.join(dir, "usage.ts"), USAGE, "utf-8");
    expect(await typecheck(dir)).toEqual([]);
  });

  it("the schema model knows which columns and lookups are writable", () => {
    const account = model.EntityTypes.find((e) => e.LogicalName === "account");
    const prop = (name: string) => account?.Properties.find((p) => p.Name === name);
    expect(prop("name")).toMatchObject({ IsValidForCreate: true, IsValidForUpdate: true });
    expect(prop("statecode")).toMatchObject({ IsValidForCreate: false, IsValidForUpdate: true });
    expect(prop("createdon")).toMatchObject({ IsValidForCreate: false, IsValidForUpdate: false });
    // The _x_value property has no attribute of its own: never written
    expect(prop("_primarycontactid_value")?.IsValidForCreate).toBeUndefined();

    const nav = (name: string) => account?.NavigationProperties.find((n) => n.Name === name);
    expect(nav("contoso_ParentAccountId")).toMatchObject({
      LookupAttribute: "contoso_parentaccountid",
      IsValidForCreate: true,
      IsValidForUpdate: true,
    });
    expect(nav("createdby")).toMatchObject({
      LookupAttribute: "createdby",
      IsValidForCreate: false,
      IsValidForUpdate: false,
    });
    expect(nav("contact_customer_accounts")?.LookupAttribute).toBeUndefined();

    const contact = model.EntityTypes.find((e) => e.LogicalName === "contact");
    expect(contact?.NavigationProperties.find((n) => n.Name === "parentcustomerid")).toMatchObject({
      LookupAttribute: "parentcustomerid",
      IsValidForCreate: true,
      IsValidForUpdate: true,
    });
  });

  it("formatEntityForWrite turns the lookups of a create into @odata.bind", async () => {
    await compileToJs(dir);
    const { AccountMetadata, ContactMetadata } = await importGenerated<{
      AccountMetadata: unknown;
      ContactMetadata: unknown;
    }>(dir, "entities/index.js");
    const { EntityMetadataCache } = await importGenerated<{ EntityMetadataCache: unknown }>(
      dir,
      "metadata.js"
    );
    const runtime = await import("@mohsinonxrm/dataverse-sdk-entities-runtime");
    const id = "00000000-0000-0000-0000-000000000001";
    const options = { metadataCache: EntityMetadataCache as never };

    expect(
      runtime.formatEntityForWrite(
        {
          name: "Contoso",
          primarycontactid: runtime.createEntityReference("contact", id),
          contoso_ParentAccountId: runtime.createEntityReference("account", id),
        },
        AccountMetadata as never,
        options
      )
    ).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: "Contoso",
      "primarycontactid@odata.bind": `/contacts(${id})`,
      "contoso_ParentAccountId@odata.bind": `/accounts(${id})`,
    });
    expect(
      runtime.formatEntityForWrite(
        { lastname: "Doe", parentcustomerid: runtime.createEntityReference("account", id) },
        ContactMetadata as never,
        options
      )
    ).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.contact",
      lastname: "Doe",
      "parentcustomerid_account@odata.bind": `/accounts(${id})`,
    });
  });

  it("documents each type and leaves the read interface as it was", async () => {
    const source = await fs.readFile(path.join(dir, "entities", "Account.ts"), "utf-8");
    expect(source).toContain("export type AccountCreate = {");
    expect(source).toContain("export type AccountUpdate = {");
    expect(source).toContain("  contoso_ParentAccountId?: EntityReference | null;");
    // The read interface still has every column, read-only ones included
    expect(source).toMatch(/export interface Account extends IEntity \{[^]*createdon\?: string/);
  });
});
