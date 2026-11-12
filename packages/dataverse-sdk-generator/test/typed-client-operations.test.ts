/**
 * #432: the typed client's record navigation (`byId(id).nav(…)`), associate/disassociate,
 * `upsert()`, paging (`iterate()`, `listPage()`) and the bound actions and functions, which
 * `client.ts` lists per table as `<Entity>Operations`. Usage type-checks only with the table's
 * names, and the requests are the generated classes' and core's.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  compileToJs,
  fixtureMetadataService,
  generateFixture,
  importGenerated,
  scratchFolders,
  typecheck,
} from "./fixtures/compile.js";
import { WRITE_EDMX, WRITE_ENTITY_METADATA } from "./fixtures/write-metadata.js";

const scratch = scratchFolders("typed-client-operations");
afterAll(scratch.cleanup);

// Bound operations: an action on one account, a function on the accounts entity set, and an
// action on contacts' entity set without parameters.
const OPERATIONS = `
      <Action Name="contoso_Recalculate" IsBound="true">
        <Parameter Name="entity" Type="mscrm.account" Nullable="false" />
        <Parameter Name="Mode" Type="Edm.String" Unicode="false" />
        <ReturnType Type="Edm.Int32" Nullable="false" />
      </Action>
      <Action Name="contoso_Merge" IsBound="true">
        <Parameter Name="entity" Type="mscrm.account" Nullable="false" />
        <Parameter Name="Target" Type="mscrm.account" Nullable="false" />
      </Action>
      <Action Name="contoso_Cleanup" IsBound="true">
        <Parameter Name="entityset" Type="Collection(mscrm.contact)" Nullable="false" />
      </Action>
      <Function Name="contoso_Count" IsBound="true">
        <Parameter Name="entityset" Type="Collection(mscrm.account)" Nullable="false" />
        <Parameter Name="State" Type="Edm.Int32" Nullable="false" />
        <ReturnType Type="Edm.Int32" Nullable="false" />
      </Function>
      <EntityContainer`;
const EDMX = WRITE_EDMX.replace("<EntityContainer", OPERATIONS.trimStart());

const service = fixtureMetadataService(EDMX, WRITE_ENTITY_METADATA);
const entities = ["account", "contact", "systemuser"];
const id = "00000000-0000-0000-0000-000000000001";
const contactId = "00000000-0000-0000-0000-000000000002";

// Each @ts-expect-error must have an error under it.
const USAGE = `
import { DataverseClient, type AccessTokenProvider } from "@mohsinonxrm/dataverse-sdk-core";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { createTypedClient } from "./index.js";

const tokenProvider: AccessTokenProvider = { getToken: () => Promise.resolve("token") };
const typed = createTypedClient(new DataverseClient({ baseUrl: "https://contoso.crm.dynamics.com", tokenProvider }));
const id = "00000000-0000-0000-0000-000000000001";

export async function run(): Promise<unknown[]> {
  // Navigation, typed by the related table
  const contacts = await typed.accounts.byId(id).nav("contact_customer_accounts").list({ select: ["fullname"], top: 5 });
  const fullname: string | null | undefined = contacts[0]?.fullname;
  const primary = await typed.accounts.byId(id).nav("primarycontactid").get({ select: ["lastname"] });
  const lastname: string | null | undefined = primary?.lastname;
  const parent = await typed.contacts.byId(id).nav("parentcustomerid_account").get({ select: ["name"] });
  // @ts-expect-error not a column of contact
  await typed.accounts.byId(id).nav("contact_customer_accounts").list({ select: ["name"] });
  // @ts-expect-error a lookup has no list()
  await typed.accounts.byId(id).nav("primarycontactid").list();
  // @ts-expect-error not a navigation property of account
  typed.accounts.byId(id).nav("contacts");

  // Associate / disassociate
  await typed.accounts.byId(id).associate("contact_customer_accounts", id);
  await typed.accounts.byId(id).associate("contact_customer_accounts", [id, createEntityReference("contact", id)]);
  await typed.accounts.byId(id).associate("primarycontactid", id);
  await typed.accounts.byId(id).disassociate("contact_customer_accounts", id);
  await typed.accounts.byId(id).disassociate("primarycontactid");
  // @ts-expect-error a collection needs the record to remove
  await typed.accounts.byId(id).disassociate("contact_customer_accounts");

  // Upsert: the columns valid in both a create and an update
  const upserted: string = await typed.accounts.upsert({ accountnumber: "A-1" }, { name: "Contoso" });
  // @ts-expect-error createdon is set by Dataverse
  await typed.accounts.upsert(id, { createdon: "2024-01-01T00:00:00Z" });
  // @ts-expect-error importsequencenumber is valid on create only
  await typed.accounts.upsert(id, { importsequencenumber: 1 });

  // Bound operations
  const total: number = await typed.accounts.byId(id).actions.contoso_Recalculate({ Mode: "full" });
  await typed.accounts.byId(id).actions.contoso_Recalculate();
  await typed.accounts.byId(id).actions.contoso_Merge({ Target: createEntityReference("account", id) });
  const count: number = await typed.accounts.functions.contoso_Count({ State: 0 });
  await typed.contacts.actions.contoso_Cleanup({ headers: { "x-a": "1" } });
  // @ts-expect-error Target is required
  await typed.accounts.byId(id).actions.contoso_Merge();
  // @ts-expect-error bound to the entity set, not a record
  await typed.accounts.byId(id).functions.contoso_Count({ State: 0 });
  // @ts-expect-error bound to account
  await typed.contacts.byId(id).actions.contoso_Recalculate();

  // Paging
  const names: unknown[] = [];
  for await (const account of typed.accounts.iterate({ select: ["name"], pageSize: 100 })) names.push(account.name);
  const page = await typed.accounts.listPage({ select: ["name"], pageSize: 50, count: true });
  const next = page.nextLink ? await typed.accounts.listPage({ select: ["name"], pageSize: 50, nextLink: page.nextLink }) : undefined;
  const nextName: string | null | undefined = next?.records[0]?.name;
  // @ts-expect-error not selected
  page.records[0]?.creditlimit;

  return [fullname, lastname, parent, upserted, total, count, names, nextName];
}
`;

describe("typed client operations (#432)", () => {
  let dir = "";

  beforeAll(async () => {
    dir = await scratch.create();
    await generateFixture(service, dir, { entities, typedClient: true });
  });

  it("lists each table's bound operations in client.ts", async () => {
    const source = await fs.readFile(path.join(dir, "client.ts"), "utf-8");
    expect(source).toMatch(
      /export const AccountOperations = \{\r?\n {2}record: \{\r?\n {4}actions: \{\r?\n {6}contoso_Merge: contoso_MergeAction,\r?\n {6}contoso_Recalculate: contoso_RecalculateAction,\r?\n {4}\},\r?\n {4}functions: \{\},\r?\n {2}\},\r?\n {2}collection: \{\r?\n {4}actions: \{\},\r?\n {4}functions: \{\r?\n {6}contoso_Count: contoso_CountFunction,/
    );
    expect(source).toContain(
      "  readonly accounts: EntitySetClient<Account, AccountCreate, AccountUpdate, AccountColumn, AccountNavigation, typeof AccountOperations>;"
    );
    expect(source).toContain("{ ...options, operations: AccountOperations }");
    // A table without bound operations has no <Entity>Operations
    expect(source).not.toContain("SystemUserOperations");
    expect(source).toContain(
      "  readonly systemusers: EntitySetClient<SystemUser, SystemUserCreate, SystemUserUpdate, SystemUserColumn, SystemUserNavigation>;"
    );
  });

  it("type-checks navigation, associate, upsert, operations and paging by the table", async () => {
    await fs.writeFile(path.join(dir, "usage.ts"), USAGE, "utf-8");
    expect(await typecheck(dir)).toEqual([]);
  });

  it("sends the generated classes' requests and core's", async () => {
    await compileToJs(dir);
    const { createTypedClient } = await importGenerated<{
      createTypedClient: (client: DataverseClient) => unknown;
    }>(dir, "client.js");
    const { client, fake } = createTestClient();
    type Callable = Record<string, (...args: unknown[]) => Promise<unknown>>;
    const typed = createTypedClient(client) as {
      accounts: {
        byId(key: unknown): {
          actions: Callable;
          nav(name: string): { list(o?: unknown): Promise<unknown[]> };
          associate(name: string, target: unknown): Promise<void>;
        };
        functions: Callable;
        upsert(key: unknown, entity: unknown): Promise<string>;
      };
    };

    fake.on("POST", `/accounts(${id})/Microsoft.Dynamics.CRM.contoso_Recalculate`, () =>
      jsonResponse({ value: 42 })
    );
    expect(await typed.accounts.byId(id).actions.contoso_Recalculate({ Mode: "full" })).toBe(42);
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({ Mode: "full" });

    fake.on("GET", "/accounts/Microsoft.Dynamics.CRM.contoso_Count(State=@p1)", () =>
      jsonResponse({ value: 3 })
    );
    expect(await typed.accounts.functions.contoso_Count({ State: 0 })).toBe(3);
    expect(new URL(fake.last().url).searchParams.get("@p1")).toBe("0");

    fake.on("GET", `/accounts(${id})/contact_customer_accounts`, () =>
      jsonResponse({ value: [{ fullname: "Doe" }] })
    );
    expect(
      await typed.accounts
        .byId(id)
        .nav("contact_customer_accounts")
        .list({ select: ["fullname"] })
    ).toEqual([{ fullname: "Doe" }]);

    fake.on("POST", `/accounts(${id})/contact_customer_accounts/$ref`, () => noContent());
    await typed.accounts.byId(id).associate("contact_customer_accounts", contactId);
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.id": `https://contoso.crm.dynamics.com/api/data/v9.2/contacts(${contactId})`,
    });

    fake.on("PATCH", "/accounts(accountnumber='A-1')", () =>
      noContent({
        "odata-entityid": `https://contoso.crm.dynamics.com/api/data/v9.2/accounts(${id})`,
      })
    );
    expect(await typed.accounts.upsert({ accountnumber: "A-1" }, { name: "Contoso" })).toBe(id);
    expect(fake.last().headers["if-match"]).toBeUndefined();
  });
});
