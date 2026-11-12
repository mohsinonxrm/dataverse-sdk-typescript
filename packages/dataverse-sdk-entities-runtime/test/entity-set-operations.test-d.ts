/**
 * #432: type tests (tsd) for the typed client's record navigation, associate/disassociate,
 * upsert, bound operations and paging. The tables are written by hand the way `dataverse-gen`
 * generates them (`<Entity>`, `<Entity>Column`, `<Entity>Navigation`, `<Entity>Operations`).
 */
import { expectAssignable, expectError, expectType } from "tsd";
import type { DataverseClient, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import {
  ActionBase,
  type CollectionNavigation,
  createEntityReference,
  type EntityMetadata,
  type EntityReference,
  EntitySetClient,
  FunctionBase,
  type IEntity,
  type RecordPage,
  type RelatedCollectionClient,
  type RelatedRecordClient,
  type SingleNavigation,
} from "../src/index.js";

interface Account extends IEntity {
  accountid?: string | null;
  name?: string | null;
  creditlimit?: number | null;
  createdon?: string | null;
}
interface AccountCreate {
  accountid?: string | null;
  name?: string | null;
  creditlimit?: number | null;
  importsequencenumber?: number | null;
}
interface AccountUpdate {
  name?: string | null;
  creditlimit?: number | null;
  statecode?: number | null;
}
type AccountColumn = "accountid" | "name" | "creditlimit" | "createdon";
interface AccountNavigation {
  readonly primarycontactid: SingleNavigation<Contact, ContactColumn, ContactNavigation>;
  readonly contact_customer_accounts: CollectionNavigation<
    Contact,
    ContactColumn,
    ContactNavigation
  >;
}
interface Contact extends IEntity {
  contactid?: string | null;
  fullname?: string | null;
  emailaddress1?: string | null;
}
type ContactColumn = "contactid" | "fullname" | "emailaddress1";
interface ContactNavigation {
  readonly parentcustomerid_account: SingleNavigation<Account, AccountColumn, AccountNavigation>;
}

declare class RecalculateAction extends ActionBase<{ Total: number }> {
  constructor(accountId: string, parameters?: { Mode?: string | null });
  toRequestInformation(baseUrl: string): RequestInformation;
  parseResponse(response: Response): Promise<{ Total: number }>;
}
declare class MergeAction extends ActionBase {
  constructor(accountId: string, parameters: { Target: EntityReference });
  toRequestInformation(baseUrl: string): RequestInformation;
  parseResponse(response: Response): Promise<void>;
}
declare class CountFunction extends FunctionBase<number> {
  toRequestInformation(baseUrl: string): RequestInformation;
  parseResponse(response: Response): Promise<number>;
}
const AccountOperations = {
  record: {
    actions: { contoso_Recalculate: RecalculateAction, contoso_Merge: MergeAction },
    functions: {},
  },
  collection: { actions: {}, functions: { contoso_Count: CountFunction } },
};

declare const client: DataverseClient;
declare const metadata: EntityMetadata;
const accounts = new EntitySetClient<
  Account,
  AccountCreate,
  AccountUpdate,
  AccountColumn,
  AccountNavigation,
  typeof AccountOperations
>(client, metadata, { operations: AccountOperations });
const id = "00000000-0000-0000-0000-000000000001";
const record = accounts.byId(id);

// --- nav() ---

const contacts = record.nav("contact_customer_accounts");
expectType<RelatedCollectionClient<Contact, ContactColumn, ContactNavigation>>(contacts);
const listed = await contacts.list({ select: ["fullname"], filter: "statecode eq 0" });
expectType<string | null | undefined>(listed[0].fullname);
expectError(listed[0].emailaddress1);
const primary = record.nav("primarycontactid");
expectType<RelatedRecordClient<Contact, ContactColumn, ContactNavigation>>(primary);
const contact = await primary.get({
  select: ["fullname"],
  expand: { parentcustomerid_account: { select: ["name"] } },
});
expectType<string | null | undefined>(contact?.fullname);
expectType<string | null | undefined>(contact?.parentcustomerid_account?.name);
expectError(primary.list());
expectError(contacts.get());
expectError(record.nav("primarycontact"));
expectError(contacts.list({ select: ["name"] }));

// --- associate / disassociate ---

await record.associate("contact_customer_accounts", id);
await record.associate("contact_customer_accounts", [id, createEntityReference("contact", id)]);
await record.associate("contact_customer_accounts", { emailaddress1: "a@b.c" });
await record.associate("primarycontactid", createEntityReference("contact", id));
// Several records only for a collection
expectError(record.associate("primarycontactid", [id]));
expectError(record.associate("nope", id));
await record.disassociate("contact_customer_accounts", id);
await record.disassociate("primarycontactid");
// A collection needs the record to remove; a lookup takes none
expectError(record.disassociate("contact_customer_accounts"));
expectError(record.disassociate("primarycontactid", id));
await contacts.associate([id]);
await primary.set(id);
await primary.clear();

// --- upsert ---

expectType<string>(await accounts.upsert({ accountnumber: "A-1" }, { name: "Contoso" }));
await accounts.upsert(id, { creditlimit: 1 }, { mode: "createOnly" });
// Only the columns valid in both a create and an update
expectError(accounts.upsert(id, { importsequencenumber: 1 }));
expectError(accounts.upsert(id, { statecode: 1 }));
expectError(accounts.upsert(id, { name: "x" }, { mode: "replace" }));

// --- bound operations ---

expectType<{ Total: number }>(await record.actions.contoso_Recalculate({ Mode: "full" }));
expectType<{ Total: number }>(await record.actions.contoso_Recalculate());
await record.actions.contoso_Recalculate(undefined, { headers: { "x-a": "1" } });
expectType<Promise<void>>(
  record.actions.contoso_Merge({ Target: createEntityReference("account", id) })
);
expectError(record.actions.contoso_Merge());
expectError(record.actions.contoso_Recalculate({ Mode: 1 }));
expectType<number>(await accounts.functions.contoso_Count());
expectType<number>(await accounts.functions.contoso_Count({ headers: { "x-a": "1" } }));
expectError(record.actions.nope);
expectError(accounts.actions.contoso_Recalculate);
// A table without operations has none
const plain = new EntitySetClient<Account>(client, metadata);
expectError(plain.byId(id).actions.contoso_Recalculate);

// --- paging ---

for await (const account of accounts.iterate({ select: ["name"], pageSize: 100 })) {
  expectType<string | null | undefined>(account.name);
  expectError(account.creditlimit);
}
const page = await accounts.listPage({ select: ["name"], pageSize: 50, count: true });
expectAssignable<RecordPage<{ name?: string | null }>>(page);
expectType<string | undefined>(page.nextLink);
expectType<number | undefined>(page.count);
expectError(page.records[0].creditlimit);
const next = await accounts.listPage({ select: ["name"], pageSize: 50, nextLink: page.nextLink });
expectType<string | null | undefined>(next.records[0].name);
