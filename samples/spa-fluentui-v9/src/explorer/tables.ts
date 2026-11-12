/**
 * The explorer's table browser: the environment's tables from `EntityDefinitions` (a light
 * `$select`, not the whole `$metadata` document), and one table's columns, alternate keys and
 * relationships, read when the table is opened. The results are cached for the session, per
 * account, environment and Web API version, so each is read once.
 */
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import type { RawRequestInput } from "./types";

type Json = Record<string, unknown>;

const isObject = (value: unknown): value is Json =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const str = (value: unknown): string => (typeof value === "string" ? value : "");

/** A metadata `Label`: the user's language, else the first localized one. */
export function labelText(value: unknown): string {
  if (!isObject(value)) return "";
  const user = isObject(value.UserLocalizedLabel) ? str(value.UserLocalizedLabel.Label) : "";
  if (user) return user;
  const first: unknown = Array.isArray(value.LocalizedLabels)
    ? value.LocalizedLabels[0]
    : undefined;
  return isObject(first) ? str(first.Label) : "";
}

const rowsOf = (body: unknown): Json[] =>
  isObject(body) && Array.isArray(body.value) ? body.value.filter(isObject) : [];

// ───────────────────────────── tables ─────────────────────────────

export interface TableSummary {
  logicalName: string;
  entitySetName: string;
  displayName: string;
  primaryIdAttribute: string;
  primaryNameAttribute: string;
  custom: boolean;
}

export const TABLE_SELECT = [
  "LogicalName",
  "EntitySetName",
  "DisplayName",
  "PrimaryIdAttribute",
  "PrimaryNameAttribute",
  "IsCustomEntity",
];

/** The tables of an `EntityDefinitions` response that have an entity set, by logical name. */
export function parseTables(body: unknown): TableSummary[] {
  return rowsOf(body)
    .map((t) => ({
      logicalName: str(t.LogicalName),
      entitySetName: str(t.EntitySetName),
      displayName: labelText(t.DisplayName),
      primaryIdAttribute: str(t.PrimaryIdAttribute),
      primaryNameAttribute: str(t.PrimaryNameAttribute),
      custom: t.IsCustomEntity === true,
    }))
    .filter((t) => t.logicalName && t.entitySetName)
    .sort((a, b) => a.logicalName.localeCompare(b.logicalName));
}

/** The tables whose logical name, display name or entity set contain every word of `query`. */
export function filterTables(tables: readonly TableSummary[], query: string): TableSummary[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [...tables];
  return tables.filter((t) => {
    const text = `${t.logicalName} ${t.displayName} ${t.entitySetName}`.toLowerCase();
    return words.every((w) => text.includes(w));
  });
}

// ───────────────────────────── columns ─────────────────────────────

export interface ColumnInfo {
  logicalName: string;
  displayName: string;
  /** `AttributeType`, e.g. `String` or `Lookup`. */
  type: string;
  /** "Required", "Recommended", "Optional" or "System required". */
  required: string;
  /** For text columns. */
  maxLength?: number;
  primary?: "id" | "name";
  /** The name for `$select`: `_<name>_value` for a lookup. */
  selectName: string;
  /** Whether `$select` can name it: readable, and a value of its own. */
  selectable: boolean;
}

export const COLUMN_SELECT = [
  "LogicalName",
  "DisplayName",
  "AttributeType",
  "RequiredLevel",
  "IsPrimaryId",
  "IsPrimaryName",
  "IsValidForRead",
  "AttributeOf",
];

const REQUIRED: Record<string, string> = {
  None: "Optional",
  Recommended: "Recommended",
  ApplicationRequired: "Required",
  SystemRequired: "System required",
};

const LOOKUP_TYPES = new Set(["Lookup", "Owner", "Customer"]);
/** Columns `$select` can't name: computed from others, or several values. */
const NOT_SELECTABLE_TYPES = new Set(["Virtual", "PartyList", "CalendarRules", "ManagedProperty"]);

/**
 * The columns of an `Attributes` response, the primary id and name first, then by logical name.
 * `maxLengths` comes from the text casts (`StringAttributeMetadata`, `MemoAttributeMetadata`).
 */
export function parseColumns(
  body: unknown,
  maxLengths: ReadonlyMap<string, number> = new Map()
): ColumnInfo[] {
  const rank = (c: ColumnInfo) => (c.primary === "id" ? 0 : c.primary === "name" ? 1 : 2);
  return rowsOf(body)
    .map((a): ColumnInfo => {
      const logicalName = str(a.LogicalName);
      const type = str(a.AttributeType);
      const level = isObject(a.RequiredLevel) ? str(a.RequiredLevel.Value) : "";
      return {
        logicalName,
        displayName: labelText(a.DisplayName),
        type,
        required: REQUIRED[level] ?? level,
        maxLength: maxLengths.get(logicalName),
        primary: a.IsPrimaryId === true ? "id" : a.IsPrimaryName === true ? "name" : undefined,
        selectName: LOOKUP_TYPES.has(type) ? `_${logicalName}_value` : logicalName,
        selectable:
          a.IsValidForRead !== false && !str(a.AttributeOf) && !NOT_SELECTABLE_TYPES.has(type),
      };
    })
    .filter((c) => c.logicalName)
    .sort((a, b) => rank(a) - rank(b) || a.logicalName.localeCompare(b.logicalName));
}

/** `LogicalName` → `MaxLength` of a text cast's response. */
export function parseMaxLengths(...bodies: unknown[]): Map<string, number> {
  const lengths = new Map<string, number>();
  for (const row of bodies.flatMap(rowsOf)) {
    if (typeof row.MaxLength === "number") lengths.set(str(row.LogicalName), row.MaxLength);
  }
  return lengths;
}

// ───────────────────────────── keys ─────────────────────────────

export interface KeyInfo {
  logicalName: string;
  displayName: string;
  attributes: string[];
  /** `EntityKeyIndexStatus`: `Active` once the key's index is built. */
  status: string;
}

export const KEY_SELECT = ["LogicalName", "DisplayName", "KeyAttributes", "EntityKeyIndexStatus"];

export function parseKeys(body: unknown): KeyInfo[] {
  return rowsOf(body).map((k) => ({
    logicalName: str(k.LogicalName),
    displayName: labelText(k.DisplayName),
    attributes: Array.isArray(k.KeyAttributes) ? k.KeyAttributes.map(String) : [],
    status: str(k.EntityKeyIndexStatus),
  }));
}

// ───────────────────────────── relationships ─────────────────────────────

export interface RelationshipInfo {
  kind: "Many-to-one" | "One-to-many" | "Many-to-many";
  schemaName: string;
  /** The table at the other end. */
  relatedTable: string;
  /** This table's navigation property, for `$expand`. */
  navigationProperty: string;
  /** The lookup column: this table's (many-to-one) or the related table's (one-to-many). */
  lookup: string;
}

export const MANY_TO_ONE_SELECT = [
  "SchemaName",
  "ReferencedEntity",
  "ReferencingAttribute",
  "ReferencingEntityNavigationPropertyName",
];
export const ONE_TO_MANY_SELECT = [
  "SchemaName",
  "ReferencingEntity",
  "ReferencingAttribute",
  "ReferencedEntityNavigationPropertyName",
];
export const MANY_TO_MANY_SELECT = [
  "SchemaName",
  "Entity1LogicalName",
  "Entity2LogicalName",
  "Entity1NavigationPropertyName",
  "Entity2NavigationPropertyName",
];

/** A table's relationships of the three kinds, each kind by schema name. */
export function parseRelationships(
  table: string,
  bodies: { manyToOne: unknown; oneToMany: unknown; manyToMany: unknown }
): RelationshipInfo[] {
  const bySchema = (a: RelationshipInfo, b: RelationshipInfo) =>
    a.schemaName.localeCompare(b.schemaName);
  const manyToOne = rowsOf(bodies.manyToOne).map((r): RelationshipInfo => ({
    kind: "Many-to-one",
    schemaName: str(r.SchemaName),
    relatedTable: str(r.ReferencedEntity),
    navigationProperty: str(r.ReferencingEntityNavigationPropertyName),
    lookup: str(r.ReferencingAttribute),
  }));
  const oneToMany = rowsOf(bodies.oneToMany).map((r): RelationshipInfo => ({
    kind: "One-to-many",
    schemaName: str(r.SchemaName),
    relatedTable: str(r.ReferencingEntity),
    navigationProperty: str(r.ReferencedEntityNavigationPropertyName),
    lookup: str(r.ReferencingAttribute),
  }));
  const manyToMany = rowsOf(bodies.manyToMany).map((r): RelationshipInfo => {
    const first = str(r.Entity1LogicalName) === table;
    return {
      kind: "Many-to-many",
      schemaName: str(r.SchemaName),
      relatedTable: str(first ? r.Entity2LogicalName : r.Entity1LogicalName),
      navigationProperty: str(
        first ? r.Entity1NavigationPropertyName : r.Entity2NavigationPropertyName
      ),
      lookup: "",
    };
  });
  return [...manyToOne.sort(bySchema), ...oneToMany.sort(bySchema), ...manyToMany.sort(bySchema)];
}

// ───────────────────────────── the request ─────────────────────────────

/** Rows a "Query this table" request reads. */
export const QUERY_TOP = 10;

/**
 * The explorer request for "Query this table": `GET <entityset>?$select=…&$top=10`, selecting
 * `columns` (their `$select` names), or by default the primary id and name.
 */
export function tableQuery(table: TableSummary, columns: readonly string[] = []): RawRequestInput {
  const select = columns.length
    ? [...columns]
    : [table.primaryIdAttribute, table.primaryNameAttribute].filter(Boolean);
  const query = [
    ...(select.length ? [`$select=${select.join(",")}`] : []),
    `$top=${QUERY_TOP}`,
  ].join("&");
  return { method: "GET", url: `${table.entitySetName}?${query}`, headers: "", body: "" };
}

// ───────────────────────────── loading ─────────────────────────────

export interface TableDetails {
  columns: ColumnInfo[];
  keys: KeyInfo[];
  relationships: RelationshipInfo[];
}

const LOGICAL_NAME = /^[a-z0-9_]+$/i;

/** All the environment's tables. */
export async function fetchTables(client: DataverseClient): Promise<TableSummary[]> {
  return parseTables(
    await client
      .api("EntityDefinitions")
      .select(...TABLE_SELECT)
      .get()
  );
}

/** One table's columns, keys and relationships, read in parallel. */
export async function fetchTableDetails(
  client: DataverseClient,
  logicalName: string
): Promise<TableDetails> {
  if (!LOGICAL_NAME.test(logicalName)) throw new Error(`"${logicalName}" isn't a logical name.`);
  const entity = `EntityDefinitions(LogicalName='${logicalName}')`;
  const read = (path: string, select: string[]) =>
    client
      .api(`${entity}/${path}`)
      .select(...select)
      .get();
  const [columns, strings, memos, keys, manyToOne, oneToMany, manyToMany] = await Promise.all([
    read("Attributes", COLUMN_SELECT),
    read("Attributes/Microsoft.Dynamics.CRM.StringAttributeMetadata", ["LogicalName", "MaxLength"]),
    read("Attributes/Microsoft.Dynamics.CRM.MemoAttributeMetadata", ["LogicalName", "MaxLength"]),
    read("Keys", KEY_SELECT),
    read("ManyToOneRelationships", MANY_TO_ONE_SELECT),
    read("OneToManyRelationships", ONE_TO_MANY_SELECT),
    read("ManyToManyRelationships", MANY_TO_MANY_SELECT),
  ]);
  return {
    columns: parseColumns(columns, parseMaxLengths(strings, memos)),
    keys: parseKeys(keys),
    relationships: parseRelationships(logicalName, { manyToOne, oneToMany, manyToMany }),
  };
}

const cache = new Map<string, Promise<unknown>>();

/** `load()` once per `key` for the session; a failure isn't kept, so it can be tried again. */
export function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  let entry = cache.get(key) as Promise<T> | undefined;
  if (!entry) {
    entry = load();
    cache.set(key, entry);
    entry.catch(() => cache.delete(key));
  }
  return entry;
}
