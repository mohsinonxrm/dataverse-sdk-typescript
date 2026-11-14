/**
 * #431: type tests (tsd) for the typed client's `select` and `expand`. `select` narrows the
 * record to the selected columns; `expand` takes the table's navigation properties (with nested
 * options typed by the related table) and adds them to the result, a record or `null` for a
 * lookup and an array for a collection. The tables here are written by hand the way
 * `dataverse-gen` generates them (`<Entity>`, `<Entity>Column`, `<Entity>Navigation`).
 */
import { expectAssignable, expectError, expectNotAssignable, expectType } from "tsd";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import {
  type CollectionNavigation,
  type EntityMetadata,
  type EntityReference,
  EntitySetClient,
  type IEntity,
  type ManyToManyNavigation,
  type RecordAnnotations,
  type SingleNavigation,
} from "../src/index.js";

interface Account extends IEntity {
  accountid?: string | null;
  name?: string | null;
  creditlimit?: number | null;
  _primarycontactid_value?: string | null;
  primarycontactid?: Contact | EntityReference;
  contact_customer_accounts?: Contact[];
}
type AccountColumn = "accountid" | "name" | "creditlimit" | "_primarycontactid_value";
interface AccountNavigation {
  readonly contoso_account_contact: ManyToManyNavigation<Contact, ContactColumn, ContactNavigation>;
  readonly primarycontactid: SingleNavigation<Contact, ContactColumn, ContactNavigation>;
  readonly contact_customer_accounts: CollectionNavigation<
    Contact,
    ContactColumn,
    ContactNavigation
  >;
  readonly ownerid: SingleNavigation;
}

interface Contact extends IEntity {
  contactid?: string | null;
  fullname?: string | null;
  emailaddress1?: string | null;
  parentcustomerid?: Account | Contact | EntityReference;
}
type ContactColumn = "contactid" | "fullname" | "emailaddress1";
interface ContactNavigation {
  readonly contact_customer_accounts_nested: CollectionNavigation<
    Account,
    AccountColumn,
    AccountNavigation
  >;
  readonly parentcustomerid_account: SingleNavigation<Account, AccountColumn, AccountNavigation>;
  readonly parentcustomerid_contact: SingleNavigation<Contact, ContactColumn, ContactNavigation>;
}

declare const client: DataverseClient;
declare const metadata: EntityMetadata;
const accounts = new EntitySetClient<
  Account,
  Partial<Account>,
  Partial<Account>,
  AccountColumn,
  AccountNavigation
>(client, metadata);
const id = "00000000-0000-0000-0000-000000000001";

// --- select ---

// Without options, the table's interface
expectType<Account>(await accounts.byId(id).get());
expectType<Account[]>(await accounts.list());
expectType<Account>(await accounts.byId(id).get({}));

// select narrows to the selected columns
const named = await accounts.byId(id).get({ select: ["name", "creditlimit"] });
expectType<string | null | undefined>(named.name);
expectType<number | null | undefined>(named.creditlimit);
expectError(named.accountid);
expectError(named.primarycontactid);
// ...and keeps the annotations
expectType<string | undefined>(named["@odata.etag"]);
expectType<unknown>(named["name@OData.Community.Display.V1.FormattedValue"]);
// A narrowed record is still an Account
expectAssignable<Account>(named);

const listed = await accounts.list({ select: ["name"], filter: "statecode eq 0", top: 5 });
expectType<string | null | undefined>(listed[0].name);
expectError(listed[0].creditlimit);

// Only the table's columns
expectError(accounts.byId(id).get({ select: ["nmae"] }));
expectError(accounts.list({ select: ["fullname"] }));

// A select that isn't a literal doesn't narrow
declare const columns: string[];
expectType<Account>(
  await new EntitySetClient<Account>(client, metadata).byId(id).get({ select: columns })
);
declare const accountColumns: AccountColumn[];
expectAssignable<Account>(await accounts.byId(id).get({ select: accountColumns }));

// --- expand ---

// A lookup: the related record, narrowed by its own select, or null
const withContact = await accounts.byId(id).get({
  select: ["name"],
  expand: { primarycontactid: { select: ["fullname"] } },
});
expectType<string | null | undefined>(withContact.name);
expectType<string | null | undefined>(withContact.primarycontactid?.fullname);
expectError(withContact.primarycontactid?.emailaddress1);
expectError(withContact.creditlimit);
expectNotAssignable<{ primarycontactid: EntityReference }>(withContact);

// A collection: an array of related records, with filter, orderBy and top
const withContacts = await accounts.byId(id).get({
  select: ["name"],
  expand: {
    contact_customer_accounts: {
      select: ["fullname", "emailaddress1"],
      filter: "statecode eq 0",
      orderBy: ["fullname asc"],
      top: 5,
    },
  },
});
expectType<string | null | undefined>(withContacts.contact_customer_accounts[0].emailaddress1);
expectError(withContacts.contact_customer_accounts[0].contactid);

// `true`: the related records whole
const whole = await accounts.byId(id).get({ select: ["name"], expand: { primarycontactid: true } });
expectType<Contact | null>(whole.primarycontactid);

// Nested expand, typed by the related table
const nested = await accounts.byId(id).get({
  select: ["name"],
  expand: {
    contact_customer_accounts: {
      select: ["fullname"],
      expand: { parentcustomerid_account: { select: ["creditlimit"] } },
    },
  },
});
expectType<number | null | undefined>(
  nested.contact_customer_accounts[0].parentcustomerid_account?.creditlimit
);
expectError(nested.contact_customer_accounts[0].parentcustomerid_account?.name);

// Expand without select: every column, with the expanded property typed by the expansion
const all = await accounts.byId(id).get({ expand: { primarycontactid: { select: ["fullname"] } } });
expectType<number | null | undefined>(all.creditlimit);
expectError(all.primarycontactid?.emailaddress1);

// A navigation property to a table that isn't generated: any column
const owner = await accounts.byId(id).get({ select: ["name"], expand: { ownerid: true } });
expectType<IEntity | null>(owner.ownerid);

// The array form: names (with inline options), each read as the related record
const listForm = await accounts.byId(id).get({
  select: ["name"],
  expand: ["primarycontactid($select=fullname)", "contact_customer_accounts"],
});
expectType<Contact | null>(listForm.primarycontactid);
expectType<Contact[]>(listForm.contact_customer_accounts);
// A name with inline options isn't checked, and typed only when it is the table's
const unchecked = await accounts
  .byId(id)
  .get({ select: ["name"], expand: ["primarycontact($top=1)"] });
expectError(unchecked.primarycontact);

// In list() too
const listExpanded = await accounts.list({
  select: ["name"],
  expand: { primarycontactid: { select: ["fullname"] } },
});
expectType<string | null | undefined>(listExpanded[0].primarycontactid?.fullname);

// Only the table's navigation properties, and the related table's columns
expectError(accounts.byId(id).get({ expand: { primarycontact: true } }));
expectError(accounts.byId(id).get({ expand: ["primarycontact"] }));
expectError(accounts.byId(id).get({ expand: { primarycontactid: { select: ["name"] } } }));
expectError(
  accounts.byId(id).get({
    expand: {
      contact_customer_accounts: { expand: { parentcustomerid_account: { select: ["fullname"] } } },
    },
  })
);
// filter, orderBy and top only on a collection
expectError(accounts.byId(id).get({ expand: { primarycontactid: { top: 1 } } }));
// ...and not with a nested expand (Dataverse refuses $top / $orderby with a nested $expand)
expectError(
  accounts.byId(id).get({
    expand: { contact_customer_accounts: { top: 5, expand: { parentcustomerid_account: true } } },
  })
);
expectError(
  accounts.byId(id).get({
    expand: {
      contact_customer_accounts: {
        orderBy: ["fullname asc"],
        expand: { parentcustomerid_account: true },
      },
    },
  })
);
// A collection inside another expansion takes select, filter and expand only
const nestedCollection = await accounts.byId(id).get({
  select: ["name"],
  expand: {
    primarycontactid: {
      select: ["fullname"],
      expand: { contact_customer_accounts_nested: { select: ["name"], filter: "statecode eq 0" } },
    },
  },
});
expectType<string | null | undefined>(
  nestedCollection.primarycontactid?.contact_customer_accounts_nested[0].name
);
expectError(
  accounts.byId(id).get({
    expand: {
      primarycontactid: { expand: { contact_customer_accounts_nested: { top: 1 } } },
    },
  })
);
// filter with a nested expand is fine
await accounts.byId(id).get({
  expand: {
    contact_customer_accounts: {
      filter: "statecode eq 0",
      expand: { parentcustomerid_account: true },
    },
  },
});
// A many-to-many collection takes top and orderBy, but no nested expand
await accounts
  .byId(id)
  .get({ expand: { contoso_account_contact: { top: 5, orderBy: ["fullname"] } } });
expectError(
  accounts.byId(id).get({
    expand: { contoso_account_contact: { expand: { parentcustomerid_account: true } } },
  })
);
const manyToMany = await accounts.byId(id).get({
  select: ["name"],
  expand: { contoso_account_contact: { select: ["fullname"] } },
});
expectType<string | null | undefined>(manyToMany.contoso_account_contact[0].fullname);

// Without a navigation type, expand takes any name and the result keeps the interface's types
const untyped = new EntitySetClient<Account, Partial<Account>, Partial<Account>, AccountColumn>(
  client,
  metadata
);
const loose = await untyped.byId(id).get({ select: ["name"], expand: ["primarycontactid"] });
expectType<Contact | EntityReference | undefined>(loose.primarycontactid);
expectType<Account>(await untyped.byId(id).get({ expand: ["anything($select=x)"] }));

expectAssignable<RecordAnnotations>(named);
