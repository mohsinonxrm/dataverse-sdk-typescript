/**
 * The demo environment's data: a few tables with seed rows and the metadata that describes them.
 * Everything lives in memory and resets on reload.
 */

export type Row = Record<string, unknown>;

export type AttributeType =
  | "Uniqueidentifier"
  | "String"
  | "Memo"
  | "Integer"
  | "BigInt"
  | "Money"
  | "Decimal"
  | "Boolean"
  | "DateTime"
  | "Picklist"
  | "State"
  | "Status"
  | "Lookup"
  | "Owner"
  | "Image"
  | "File";

export interface AttributeDef {
  logicalName: string;
  type: AttributeType;
  displayName: string;
  required?: boolean;
  maxLength?: number;
  /** Picklist, State and Status options. */
  options?: Array<{ value: number; label: string }>;
  /** Lookup targets (logical names). */
  targets?: string[];
  readOnly?: boolean;
}

export interface NavigationDef {
  /** Single-valued navigation property, e.g. `primarycontactid`. */
  name: string;
  /** The lookup attribute it sets, e.g. `primarycontactid`. */
  attribute: string;
  /** Entity set of the related table. */
  target: string;
}

export interface CollectionNavigationDef {
  /** Collection-valued navigation property, e.g. `contact_customer_accounts`. */
  name: string;
  target: string;
  /** Lookup attribute on the related table that points back here. */
  referencingAttribute: string;
}

export interface TableDef {
  logicalName: string;
  entitySetName: string;
  displayName: string;
  displayCollectionName: string;
  primaryIdAttribute: string;
  primaryNameAttribute: string;
  objectTypeCode: number;
  isCustom: boolean;
  ownership: "UserOwned" | "OrganizationOwned" | "None";
  attributes: AttributeDef[];
  navigations: NavigationDef[];
  collections: CollectionNavigationDef[];
  /** Alternate keys (metadata only: the fake doesn't address rows by them). */
  keys?: KeyDef[];
  rows: Map<string, Row>;
}

export interface KeyDef {
  logicalName: string;
  displayName: string;
  attributes: string[];
}

const STATE = [
  { value: 0, label: "Active" },
  { value: 1, label: "Inactive" },
];
const STATUS = [
  { value: 1, label: "Active" },
  { value: 2, label: "Inactive" },
];

function random(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = random(2026);
function guid(): string {
  const hex = (n: number) =>
    Array.from({ length: n }, () => Math.floor(rand() * 16).toString(16)).join("");
  return `${hex(8)}-${hex(4)}-4${hex(3)}-${"89ab"[Math.floor(rand() * 4)]}${hex(3)}-${hex(12)}`;
}

export const DEMO_USER = {
  systemuserid: "5f3c1a2b-8d4e-4f60-9a7b-1c2d3e4f5a6b",
  fullname: "Avery Demo",
  internalemailaddress: "avery.demo@contoso.com",
  azureactivedirectoryobjectid: "0b5e8a1c-3f2d-4e6a-9b7c-8d1e2f3a4b5c",
};
export const BUSINESS_UNIT_ID = "7a1b2c3d-4e5f-4061-8a9b-0c1d2e3f4a5b";
export const ORGANIZATION_ID = "1e2d3c4b-5a69-4788-9a0b-c1d2e3f4a5b6";

const USERS = [
  DEMO_USER,
  {
    systemuserid: "6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d",
    fullname: "Kai Carter",
    internalemailaddress: "kai.carter@contoso.com",
    azureactivedirectoryobjectid: "2c4e6a8b-1d3f-4b5c-8e7a-9f0b1c2d3e4f",
  },
  {
    systemuserid: "7b8c9d0e-1f2a-4b3c-9d4e-5f6a7b8c9d0e",
    fullname: "Robin Kline",
    internalemailaddress: "robin.kline@contoso.com",
    azureactivedirectoryobjectid: "3d5f7b9c-2e4a-4c6d-9f8b-0a1c2d3e4f5a",
  },
];

const ACCOUNT_NAMES = [
  "A. Datum Corporation",
  "Adventure Works",
  "Alpine Ski House",
  "Bellows College",
  "Best For You Organics",
  "Blue Yonder Airlines",
  "City Power & Light",
  "Coho Winery",
  "Consolidated Messenger",
  "Contoso Pharmaceuticals",
  "Fabrikam",
  "Fourth Coffee",
  "Graphic Design Institute",
  "Humongous Insurance",
  "Litware",
  "Lucerne Publishing",
  "Margie's Travel",
  "Munson's Pickles and Preserves",
  "Northwind Traders",
  "Proseware",
  "Relecloud",
  "School of Fine Art",
  "Southridge Video",
  "Tailspin Toys",
  "Trey Research",
  "VanArsdel",
  "Wide World Importers",
  "Wingtip Toys",
  "Woodgrove Bank",
  "Northwind Electric Cars",
  "Contoso Bank",
  "Fabrikam Residences",
];
const CITIES = ["Seattle", "Redmond", "London", "Dublin", "Sydney", "Toronto", "Paris", "Berlin"];
const FIRST = ["Alex", "Sam", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Quinn"];
const LAST = ["Garcia", "Chen", "Patel", "Okafor", "Nowak", "Silva", "Kim", "Haddad", "Larsen"];
const TITLES = ["Purchasing Manager", "CTO", "Account Executive", "Operations Lead", "CFO"];

function isoDaysAgo(days: number): string {
  return new Date(Date.UTC(2026, 9, 1) - days * 86_400_000).toISOString().replace(/\.\d+Z$/, "Z");
}

function table(def: Omit<TableDef, "rows">, rows: Row[] = []): TableDef {
  return { ...def, rows: new Map(rows.map((r) => [String(r[def.primaryIdAttribute]), r])) };
}

const common = (prefix: string): AttributeDef[] => [
  { logicalName: "statecode", type: "State", displayName: "Status", options: STATE },
  { logicalName: "statuscode", type: "Status", displayName: "Status Reason", options: STATUS },
  { logicalName: "createdon", type: "DateTime", displayName: "Created On", readOnly: true },
  { logicalName: "modifiedon", type: "DateTime", displayName: "Modified On", readOnly: true },
  {
    logicalName: "createdby",
    type: "Lookup",
    displayName: "Created By",
    targets: ["systemuser"],
    readOnly: true,
  },
  {
    logicalName: "modifiedby",
    type: "Lookup",
    displayName: "Modified By",
    targets: ["systemuser"],
    readOnly: true,
  },
  {
    logicalName: "createdonbehalfby",
    type: "Lookup",
    displayName: "Created By (Delegate)",
    targets: ["systemuser"],
    readOnly: true,
  },
  { logicalName: "ownerid", type: "Owner", displayName: "Owner", targets: ["systemuser"] },
  { logicalName: "versionnumber", type: "BigInt", displayName: "Version Number", readOnly: true },
  { logicalName: `${prefix}_description`, type: "Memo", displayName: "Notes", maxLength: 2000 },
];

export interface Schema {
  tables: Map<string, TableDef>;
  bySetName(entitySetName: string): TableDef | undefined;
  byLogicalName(logicalName: string): TableDef | undefined;
}

export function createSchema(): Schema {
  const accounts: Row[] = ACCOUNT_NAMES.map((name, i) => ({
    accountid: guid(),
    name,
    accountnumber: `ACC-${String(1001 + i)}`,
    telephone1: `+1 425 555 ${String(100 + i * 7).padStart(4, "0")}`,
    address1_city: CITIES[i % CITIES.length],
    revenue: Math.round(rand() * 900 + 50) * 10_000,
    numberofemployees: Math.round(rand() * 4900 + 100),
    industrycode: 1 + (i % 4),
    statecode: i % 9 === 8 ? 1 : 0,
    statuscode: i % 9 === 8 ? 2 : 1,
    createdon: isoDaysAgo(400 - i * 11),
    modifiedon: isoDaysAgo(30 - (i % 30)),
    versionnumber: 1000 + i,
    _ownerid_value: DEMO_USER.systemuserid,
    _createdby_value: DEMO_USER.systemuserid,
    _modifiedby_value: DEMO_USER.systemuserid,
    _primarycontactid_value: null,
    new_description: null,
  }));
  const contacts: Row[] = Array.from({ length: 40 }, (_, i) => {
    const firstname = FIRST[i % FIRST.length] ?? "Alex";
    const lastname = LAST[(i * 5) % LAST.length] ?? "Chen";
    const account = accounts[i % accounts.length];
    return {
      contactid: guid(),
      firstname,
      lastname,
      fullname: `${firstname} ${lastname}`,
      emailaddress1: `${firstname}.${lastname}${i}@example.com`.toLowerCase(),
      jobtitle: TITLES[i % TITLES.length],
      telephone1: `+1 206 555 ${String(200 + i * 3).padStart(4, "0")}`,
      address1_city: CITIES[(i + 3) % CITIES.length],
      statecode: 0,
      statuscode: 1,
      createdon: isoDaysAgo(300 - i * 5),
      modifiedon: isoDaysAgo(20 - (i % 20)),
      versionnumber: 5000 + i,
      _ownerid_value: DEMO_USER.systemuserid,
      _createdby_value: DEMO_USER.systemuserid,
      _modifiedby_value: DEMO_USER.systemuserid,
      _parentcustomerid_value: account?.accountid ?? null,
      new_description: null,
    };
  });
  // The first contact of each account is its primary contact.
  for (const account of accounts) {
    const primary = contacts.find((c) => c._parentcustomerid_value === account.accountid);
    if (primary) account._primarycontactid_value = primary.contactid;
  }

  const tables = new Map<string, TableDef>();
  const add = (t: TableDef) => tables.set(t.entitySetName, t);

  add(
    table(
      {
        logicalName: "account",
        entitySetName: "accounts",
        displayName: "Account",
        displayCollectionName: "Accounts",
        primaryIdAttribute: "accountid",
        primaryNameAttribute: "name",
        objectTypeCode: 1,
        isCustom: false,
        ownership: "UserOwned",
        attributes: [
          { logicalName: "accountid", type: "Uniqueidentifier", displayName: "Account" },
          {
            logicalName: "name",
            type: "String",
            displayName: "Account Name",
            required: true,
            maxLength: 160,
          },
          {
            logicalName: "accountnumber",
            type: "String",
            displayName: "Account Number",
            maxLength: 20,
          },
          { logicalName: "telephone1", type: "String", displayName: "Main Phone", maxLength: 50 },
          {
            logicalName: "address1_city",
            type: "String",
            displayName: "Address 1: City",
            maxLength: 80,
          },
          { logicalName: "revenue", type: "Money", displayName: "Annual Revenue" },
          { logicalName: "numberofemployees", type: "Integer", displayName: "Number of Employees" },
          {
            logicalName: "industrycode",
            type: "Picklist",
            displayName: "Industry",
            options: [
              { value: 1, label: "Accounting" },
              { value: 2, label: "Agriculture" },
              { value: 3, label: "Broadcasting" },
              { value: 4, label: "Consulting" },
            ],
          },
          {
            logicalName: "primarycontactid",
            type: "Lookup",
            displayName: "Primary Contact",
            targets: ["contact"],
          },
          { logicalName: "entityimage", type: "Image", displayName: "Default Image" },
          ...common("new"),
        ],
        navigations: [
          { name: "primarycontactid", attribute: "primarycontactid", target: "contacts" },
          { name: "ownerid", attribute: "ownerid", target: "systemusers" },
          { name: "createdby", attribute: "createdby", target: "systemusers" },
        ],
        collections: [
          {
            name: "contact_customer_accounts",
            target: "contacts",
            referencingAttribute: "parentcustomerid",
          },
        ],
        keys: [
          {
            logicalName: "new_accountnumberkey",
            displayName: "Account number",
            attributes: ["accountnumber"],
          },
        ],
      },
      accounts
    )
  );
  add(
    table(
      {
        logicalName: "contact",
        entitySetName: "contacts",
        displayName: "Contact",
        displayCollectionName: "Contacts",
        primaryIdAttribute: "contactid",
        primaryNameAttribute: "fullname",
        objectTypeCode: 2,
        isCustom: false,
        ownership: "UserOwned",
        attributes: [
          { logicalName: "contactid", type: "Uniqueidentifier", displayName: "Contact" },
          { logicalName: "firstname", type: "String", displayName: "First Name", maxLength: 50 },
          {
            logicalName: "lastname",
            type: "String",
            displayName: "Last Name",
            required: true,
            maxLength: 50,
          },
          {
            logicalName: "fullname",
            type: "String",
            displayName: "Full Name",
            maxLength: 160,
            readOnly: true,
          },
          { logicalName: "emailaddress1", type: "String", displayName: "Email", maxLength: 100 },
          { logicalName: "jobtitle", type: "String", displayName: "Job Title", maxLength: 100 },
          {
            logicalName: "telephone1",
            type: "String",
            displayName: "Business Phone",
            maxLength: 50,
          },
          {
            logicalName: "address1_city",
            type: "String",
            displayName: "Address 1: City",
            maxLength: 80,
          },
          {
            logicalName: "parentcustomerid",
            type: "Lookup",
            displayName: "Company Name",
            targets: ["account"],
          },
          { logicalName: "new_resume", type: "File", displayName: "Résumé" },
          ...common("new"),
        ],
        navigations: [
          { name: "parentcustomerid_account", attribute: "parentcustomerid", target: "accounts" },
          { name: "ownerid", attribute: "ownerid", target: "systemusers" },
        ],
        collections: [],
        keys: [
          {
            logicalName: "new_emailkey",
            displayName: "Email",
            attributes: ["emailaddress1"],
          },
        ],
      },
      contacts
    )
  );
  add(
    table(
      {
        logicalName: "systemuser",
        entitySetName: "systemusers",
        displayName: "User",
        displayCollectionName: "Users",
        primaryIdAttribute: "systemuserid",
        primaryNameAttribute: "fullname",
        objectTypeCode: 8,
        isCustom: false,
        ownership: "None",
        attributes: [
          { logicalName: "systemuserid", type: "Uniqueidentifier", displayName: "User" },
          { logicalName: "fullname", type: "String", displayName: "Full Name", maxLength: 200 },
          {
            logicalName: "internalemailaddress",
            type: "String",
            displayName: "Primary Email",
            maxLength: 100,
          },
          {
            logicalName: "azureactivedirectoryobjectid",
            type: "Uniqueidentifier",
            displayName: "Azure AD Object ID",
          },
          { logicalName: "isdisabled", type: "Boolean", displayName: "Status" },
        ],
        navigations: [],
        collections: [],
      },
      USERS.map((u) => ({ ...u, isdisabled: false, versionnumber: 100 }))
    )
  );
  add(
    table(
      {
        logicalName: "savedquery",
        entitySetName: "savedqueries",
        displayName: "View",
        displayCollectionName: "Views",
        primaryIdAttribute: "savedqueryid",
        primaryNameAttribute: "name",
        objectTypeCode: 1039,
        isCustom: false,
        ownership: "OrganizationOwned",
        attributes: [
          { logicalName: "savedqueryid", type: "Uniqueidentifier", displayName: "View" },
          { logicalName: "name", type: "String", displayName: "Name", maxLength: 200 },
          { logicalName: "returnedtypecode", type: "String", displayName: "Table" },
          { logicalName: "querytype", type: "Integer", displayName: "Query Type" },
          { logicalName: "fetchxml", type: "Memo", displayName: "FetchXML" },
          { logicalName: "isdefault", type: "Boolean", displayName: "Is Default" },
        ],
        navigations: [],
        collections: [],
      },
      [
        {
          savedqueryid: "00000000-0000-0000-00aa-000010001001",
          name: "Active Accounts",
          returnedtypecode: "account",
          querytype: 0,
          isdefault: true,
          fetchxml:
            '<fetch><entity name="account"><attribute name="name"/><attribute name="address1_city"/><attribute name="revenue"/><order attribute="name"/><filter><condition attribute="statecode" operator="eq" value="0"/></filter></entity></fetch>',
        },
        {
          savedqueryid: "00000000-0000-0000-00aa-000010001002",
          name: "Inactive Accounts",
          returnedtypecode: "account",
          querytype: 0,
          isdefault: false,
          fetchxml:
            '<fetch><entity name="account"><attribute name="name"/><attribute name="address1_city"/><order attribute="name"/><filter><condition attribute="statecode" operator="eq" value="1"/></filter></entity></fetch>',
        },
        {
          savedqueryid: "00000000-0000-0000-00aa-000010001003",
          name: "Accounts by Revenue",
          returnedtypecode: "account",
          querytype: 0,
          isdefault: false,
          fetchxml:
            '<fetch><entity name="account"><attribute name="name"/><attribute name="revenue"/><attribute name="numberofemployees"/><order attribute="revenue" descending="true"/></entity></fetch>',
        },
        {
          savedqueryid: "00000000-0000-0000-00aa-000020002001",
          name: "Active Contacts",
          returnedtypecode: "contact",
          querytype: 0,
          isdefault: true,
          fetchxml:
            '<fetch><entity name="contact"><attribute name="fullname"/><attribute name="emailaddress1"/><attribute name="jobtitle"/><order attribute="fullname"/></entity></fetch>',
        },
      ].map((v) => ({ ...v, versionnumber: 1, statecode: 0 }))
    )
  );

  return {
    tables,
    bySetName: (name) => tables.get(name),
    byLogicalName: (logicalName) => [...tables.values()].find((t) => t.logicalName === logicalName),
  };
}

export function newGuid(): string {
  return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : guid();
}

/** A cell value as text: strings as they are, numbers and booleans formatted, anything else empty. */
export function str(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}
