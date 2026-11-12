/**
 * #312: with `typedClient`, `client.ts` has `createTypedClient(client)`: one `EntitySetClient` per
 * generated table, by entity set name, typed by the table's interface, its create and update types
 * and a union of its columns. `typed.accounts.byId(id).get({ select })`, `.list()`, `.create()`,
 * `.update()` and `.delete()` type-check only with the table's columns, and send what core's
 * builder would.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import {
  createdResponse,
  createTestClient,
  jsonResponse,
  noContent,
} from "@mohsinonxrm/dataverse-sdk-testing";
import {
  compileToJs,
  fixtureMetadataService,
  generateFixture,
  importGenerated,
  scratchFolders,
  typecheck,
} from "./fixtures/compile.js";
import { WRITE_EDMX, WRITE_ENTITY_METADATA } from "./fixtures/write-metadata.js";

const scratch = scratchFolders("typed-client");
afterAll(scratch.cleanup);

// #431: a many-to-many navigation property is its own partner
const MANY_TO_MANY = `<NavigationProperty Name="contoso_account_contact" Type="Collection(mscrm.contact)" Partner="contoso_account_contact" />
        <NavigationProperty Name="contact_customer_accounts"`;
const service = fixtureMetadataService(
  WRITE_EDMX.replace('<NavigationProperty Name="contact_customer_accounts"', MANY_TO_MANY),
  WRITE_ENTITY_METADATA
);
const entities = ["account", "contact", "systemuser"];
const id = "00000000-0000-0000-0000-000000000001";

// An app using the typed client. Each @ts-expect-error must have an error under it.
const USAGE = `
import { DataverseClient, type AccessTokenProvider } from "@mohsinonxrm/dataverse-sdk-core";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { createTypedClient, type AccountColumn, type TypedDataverseClient } from "./index.js";
import type { Account, Contact } from "./entities/index.js";
import { account_statecode } from "./enums/index.js";

const tokenProvider: AccessTokenProvider = { getToken: () => Promise.resolve("token") };
const client = new DataverseClient({ baseUrl: "https://contoso.crm.dynamics.com", tokenProvider });
const typed: TypedDataverseClient = createTypedClient(client);
const id = "00000000-0000-0000-0000-000000000001";

export async function run(): Promise<void> {
  const account: Account = await typed.accounts.byId(id).get({ select: ["name", "creditlimit"] });
  const name: string | null | undefined = account.name;
  const columns: AccountColumn[] = ["accountid", "_primarycontactid_value"];
  const contacts: Contact[] = await typed.contacts.list({
    select: ["fullname"],
    filter: "statecode eq 0",
    orderBy: ["fullname asc"],
    top: 10,
  });
  const newId: string = await typed.accounts.create({
    name: "Contoso",
    primarycontactid: createEntityReference("contact", id),
  });
  await typed.accounts.byId(newId).update({ statecode: account_statecode.Inactive, name: null });
  await typed.accounts.byId({ accountnumber: "A-1" }).delete({ etag: 'W/"1"' });
  await typed.systemusers.byId(id).get();
  const raw = await typed.accounts.query().count().top(0).get();

  // #431: select narrows the record; expand takes the navigation properties, typed by the related table
  const narrowed = await typed.accounts.byId(id).get({
    select: ["name"],
    expand: {
      primarycontactid: { select: ["fullname"] },
      contact_customer_accounts: { select: ["lastname"], filter: "statecode eq 0", top: 5 },
      createdby: true,
      ownerid: true,
    },
  });
  const accountName: string | null | undefined = narrowed.name;
  const contactName: string | null | undefined = narrowed.primarycontactid?.fullname;
  const lastNames = narrowed.contact_customer_accounts.map((c) => c.lastname);
  const creator: string | null | undefined = narrowed.createdby?.systemuserid;
  // @ts-expect-error not selected
  narrowed.creditlimit;
  // @ts-expect-error not selected in the expansion
  narrowed.primarycontactid?.lastname;
  // A consolidated polymorphic lookup expands through the Web API's properties, one per target
  const parents = await typed.contacts.list({
    select: ["fullname"],
    expand: {
      parentcustomerid_account: { select: ["name"], expand: { primarycontactid: true } },
      parentcustomerid_contact: { select: ["fullname"] },
    },
  });
  const parentName: string | null | undefined = parents[0]?.parentcustomerid_account?.name;
  // @ts-expect-error not a navigation property of account
  await typed.accounts.byId(id).get({ expand: { primarycontact: true } });
  // @ts-expect-error not a column of contact
  await typed.accounts.byId(id).get({ expand: { primarycontactid: { select: ["name"] } } });
  // @ts-expect-error $top only inside a collection's expansion
  await typed.accounts.byId(id).get({ expand: { primarycontactid: { top: 1 } } });
  // @ts-expect-error $top isn't supported with a nested $expand
  await typed.accounts.byId(id).get({ expand: { contact_customer_accounts: { top: 5, expand: { createdby: true } } } });
  await typed.accounts.byId(id).get({ expand: { contoso_account_contact: { select: ["fullname"], top: 5 } } });
  // @ts-expect-error no nested $expand inside a many-to-many collection
  await typed.accounts.byId(id).get({ expand: { contoso_account_contact: { expand: { parentcustomerid_account: true } } } });
  // @ts-expect-error the consolidated lookup isn't a Web API navigation property
  await typed.contacts.list({ expand: { parentcustomerid: true } });

  // @ts-expect-error not a column of account
  await typed.accounts.byId(id).get({ select: ["nmae"] });
  // @ts-expect-error a contact column
  await typed.accounts.list({ select: ["fullname"] });
  // @ts-expect-error createdon is read-only
  await typed.accounts.create({ createdon: "2024-01-01T00:00:00Z" });
  // @ts-expect-error the primary key can't be changed
  await typed.accounts.byId(id).update({ accountid: id });
  // @ts-expect-error a lookup takes a reference
  await typed.accounts.create({ primarycontactid: id });
  // @ts-expect-error no such entity set
  typed.widgets;

  console.log(name, columns, contacts, raw, accountName, contactName, lastNames, creator, parentName);
}
`;

describe("typed per-entity-set request builders (#312)", () => {
  let dir = "";

  beforeAll(async () => {
    dir = await scratch.create();
    await generateFixture(service, dir, { entities, typedClient: true });
  });

  it("type-check with the table's columns and write types only", async () => {
    await fs.writeFile(path.join(dir, "usage.ts"), USAGE, "utf-8");
    expect(await typecheck(dir)).toEqual([]);
  });

  it("send the requests core's builder sends", async () => {
    await compileToJs(dir);
    const { createTypedClient } = await importGenerated<{
      createTypedClient: (client: DataverseClient) => Record<string, unknown>;
    }>(dir, "client.js");
    const { client, fake } = createTestClient();
    const typed = createTypedClient(client) as {
      accounts: {
        byId(key: unknown): {
          get(o?: unknown): Promise<unknown>;
          update(e: unknown): Promise<void>;
          delete(): Promise<void>;
        };
        list(o?: unknown): Promise<unknown[]>;
        create(e: unknown): Promise<string>;
      };
      contacts: { create(e: unknown): Promise<string> };
    };

    fake.on("GET", `/accounts(${id})`, () => jsonResponse({ accountid: id, name: "Contoso" }));
    expect(await typed.accounts.byId(id).get({ select: ["name"] })).toEqual({
      accountid: id,
      name: "Contoso",
    });
    expect(new URL(fake.last().url).searchParams.get("$select")).toBe("name");

    fake.on("GET", "/accounts", () => jsonResponse({ value: [{ name: "A" }] }));
    expect(await typed.accounts.list({ filter: "statecode eq 0" })).toEqual([{ name: "A" }]);

    // #431: a typed expand sends what core's expand(name, options) sends
    await typed.accounts.byId(id).get({
      select: ["name"],
      expand: {
        primarycontactid: { select: ["fullname"] },
        contact_customer_accounts: { select: ["lastname"], filter: "statecode eq 0", top: 5 },
      },
    });
    const typedUrl = fake.last().url;
    await client
      .api(`accounts(${id})`)
      .select("name")
      .expand("primarycontactid", { select: ["fullname"] }, "contact_customer_accounts", {
        select: ["lastname"],
        filter: "statecode eq 0",
        top: 5,
      })
      .get();
    expect(typedUrl).toBe(fake.last().url);
    expect(new URL(typedUrl).searchParams.get("$expand")).toBe(
      "primarycontactid($select=fullname),contact_customer_accounts($select=lastname;$filter=statecode eq 0;$top=5)"
    );

    // The generated EntityMetadataCache gives the custom lookup's entity set
    fake.on("POST", "/accounts", () => createdResponse("accounts", id));
    expect(
      await typed.accounts.create({
        name: "Contoso",
        contoso_ParentAccountId: createEntityReference("account", id),
      })
    ).toBe(id);
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: "Contoso",
      "contoso_ParentAccountId@odata.bind": `/accounts(${id})`,
    });

    fake.on("POST", "/contacts", () => createdResponse("contacts", id));
    await typed.contacts.create({
      lastname: "Doe",
      parentcustomerid: createEntityReference("account", id),
    });
    expect(JSON.parse(fake.last().bodyText ?? "")).toMatchObject({
      "parentcustomerid_account@odata.bind": `/accounts(${id})`,
    });

    fake.on("PATCH", `/accounts(${id})`, () => noContent());
    await typed.accounts.byId(id).update({ name: "Contoso Ltd" });
    expect(fake.last().headers["if-match"]).toBe("*");

    fake.on("DELETE", `/accounts(${id})`, () => noContent());
    await typed.accounts.byId(id).delete();
    expect(fake.last().method).toBe("DELETE");
  });

  it("documents the client and exports it from the index", async () => {
    const source = await fs.readFile(path.join(dir, "client.ts"), "utf-8");
    expect(source).toContain("export function createTypedClient(client: DataverseClient)");
    expect(source).toContain(
      "  readonly accounts: EntitySetClient<Account, AccountCreate, AccountUpdate, AccountColumn, AccountNavigation>;"
    );
    // #431: the navigation properties by name, typed by the related table; a table that isn't
    // generated (principal) takes any column
    expect(source).toContain(
      "  readonly contact_customer_accounts: CollectionNavigation<Contact, ContactColumn, ContactNavigation>;"
    );
    expect(source).toContain(
      "  readonly primarycontactid: SingleNavigation<Contact, ContactColumn, ContactNavigation>;"
    );
    expect(source).toContain("  readonly ownerid: SingleNavigation;");
    expect(source).toContain(
      "  readonly contoso_account_contact: ManyToManyNavigation<Contact, ContactColumn, ContactNavigation>;"
    );
    // The Web API's navigation properties of a consolidated polymorphic lookup
    expect(source).toContain(
      "  readonly parentcustomerid_account: SingleNavigation<Account, AccountColumn, AccountNavigation>;"
    );
    expect(source).not.toMatch(/readonly parentcustomerid:/);
    expect(source).toContain("export type SystemUserNavigation = Record<never, never>;");
    // Columns in name order
    expect(source).toMatch(
      /export type AccountColumn =\r?\n {2}\| "_contoso_parentaccountid_value"/
    );
    expect(source).toContain('  | "accountid"');
    expect(await fs.readFile(path.join(dir, "index.ts"), "utf-8")).toContain(
      "export * from './client.js';"
    );
  });

  it("is off by default", async () => {
    const off = await scratch.create();
    await generateFixture(service, off, { entities });
    await expect(fs.access(path.join(off, "client.ts"))).rejects.toThrow();
  });
});
