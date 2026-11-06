/**
 * The SDK's one record reference (#295). The actions, functions, messages and xrm packages import
 * these from here and re-export them, so a reference made with any package's
 * `createEntityReference` is the same type everywhere.
 *
 * The Web API identifies a record in a request body by its entity type and primary key
 * (`{"@odata.type": "Microsoft.Dynamics.CRM.account", "accountid": "…"}`; activities use
 * `activityid`), in a function parameter by `{"@odata.id": "accounts(…)"}`, and in a lookup by
 * `"<lookup>@odata.bind": "/accounts(…)"`. The primary keys and entity sets come from the
 * `$metadata` snapshot the SDK is generated from (`./generated/entity-tables.ts`), so nothing is
 * guessed by pluralization.
 */
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { ENTITY_SETS, PRIMARY_KEYS } from "./generated/entity-tables.js";

/** Only {@link createEntityReference} makes an {@link EntityReference}. */
declare const entityReferenceBrand: unique symbol;

/**
 * The JSON of a record reference in a request body: `@odata.type` and the primary key, for example
 * `{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "<id>" }`. Write one by hand when
 * you know the primary key column, or use {@link createEntityReference}. `logicalName`, `id` and
 * `entitySetName` are not part of it: the Web API rejects them.
 */
export interface WebApiEntityReference {
  readonly "@odata.type": string;
  readonly logicalName?: never;
  readonly id?: never;
  readonly entitySetName?: never;
  /** The primary key column, e.g. `accountid`. */
  readonly [primaryKey: string]: string | undefined;
}

/**
 * A reference to one record.
 *
 * Its enumerable properties are the Web API shape: `@odata.type` and the primary key, for example
 * `{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "<id>" }` (activities use
 * `activityid`). `logicalName`, `id`, `entitySetName` and `name` are not enumerable, so they are
 * not sent in a request body. Create one with {@link createEntityReference}; to write the JSON by
 * hand, use {@link WebApiEntityReference}.
 *
 * Every package that takes a reference (action and message parameters, function parameters,
 * `formatEntityForWrite()` lookups, `OrganizationService.associate()`) takes this type.
 */
export interface EntityReference {
  /** Set by {@link createEntityReference}: a hand-written object isn't an `EntityReference`. */
  readonly [entityReferenceBrand]: true;
  readonly "@odata.type": string;
  /** Logical name, e.g. `account` (not enumerable). */
  readonly logicalName: string;
  /** Record id (not enumerable). */
  readonly id: string;
  /** Entity set, e.g. `accounts`, for `@odata.id` and `@odata.bind` (not enumerable). */
  readonly entitySetName?: string;
  /** Display name, if given (not enumerable, never sent). */
  readonly name?: string;
  /** The primary key column, e.g. `accountid`. */
  readonly [primaryKey: string]: string | undefined;
}

/** Options for {@link createEntityReference}. */
export interface EntityReferenceOptions {
  /**
   * Primary key column. Default: from the `$metadata` snapshot, else `<logicalName>id`. Pass it
   * for a table the snapshot doesn't know whose key isn't `<logicalName>id`.
   */
  primaryIdAttribute?: string;
  /**
   * Entity set name. Default: from the `$metadata` snapshot. Pass it for a table the snapshot
   * doesn't know, such as a custom table, when the reference is used in a function parameter, a
   * lookup or `associate()`.
   */
  entitySetName?: string;
  /** Display name, kept on the reference (not sent). */
  name?: string;
}

let entitySets: Map<string, string> | undefined;

/**
 * The entity set of a table, from the `$metadata` snapshot, or `undefined` for a table it doesn't
 * know.
 */
function entitySetNameOf(logicalName: string): string | undefined {
  if (!entitySets) {
    entitySets = new Map();
    for (const entry of ENTITY_SETS.split(",")) {
      const colon = entry.indexOf(":");
      if (colon === -1) entitySets.set(entry, `${entry}s`);
      else entitySets.set(entry.slice(0, colon), entry.slice(colon + 1));
    }
  }
  return entitySets.get(logicalName);
}

/** The primary key column of a table: from the `$metadata` snapshot, else `<logicalName>id`. */
function primaryIdAttributeOf(logicalName: string): string {
  return Object.hasOwn(PRIMARY_KEYS, logicalName) ? PRIMARY_KEYS[logicalName] : `${logicalName}id`;
}

/**
 * Create a reference to a record. In an action or message body it is sent as
 * `{"@odata.type": "Microsoft.Dynamics.CRM.account", "accountid": "<id>"}`, in a function
 * parameter as `{"@odata.id": "accounts(<id>)"}`, and as a lookup in `formatEntityForWrite()` as
 * `"<lookup>@odata.bind": "/accounts(<id>)"`.
 *
 * @param logicalName - Table logical name, e.g. `account`, `email`
 * @param id - Record id
 * @param options - A display name, or the primary key or entity set for a table the `$metadata`
 *   snapshot doesn't know
 *
 * @example
 * ```typescript
 * const ref = createEntityReference("account", "a1");
 * // JSON: {"@odata.type":"Microsoft.Dynamics.CRM.account","accountid":"a1"}
 * const widget = createEntityReference("new_widget", "w1", { entitySetName: "new_widgets" });
 * ```
 */
export function createEntityReference(
  logicalName: string,
  id: string,
  options: EntityReferenceOptions = {}
): EntityReference {
  const key = options.primaryIdAttribute ?? primaryIdAttributeOf(logicalName);
  const reference: Record<string, string> = {
    "@odata.type": `Microsoft.Dynamics.CRM.${logicalName}`,
    [key]: id,
  };
  Object.defineProperties(reference, {
    logicalName: { value: logicalName, enumerable: false },
    id: { value: id, enumerable: false },
    entitySetName: {
      value: options.entitySetName ?? entitySetNameOf(logicalName),
      enumerable: false,
    },
    name: { value: options.name, enumerable: false },
  });
  return reference as unknown as EntityReference;
}

/**
 * The entity set of a reference: its own `entitySetName`, else the `$metadata` snapshot's for its
 * table.
 *
 * @throws DataverseInvalidRequestError when neither is known (pass `entitySetName`).
 */
export function getEntitySetNameFromReference(entityRef: EntityReference): string {
  const entitySetName = entityRef.entitySetName ?? entitySetNameOf(entityRef.logicalName);
  if (!entitySetName) {
    throw DataverseInvalidRequestError.invalidParameter(
      "entityReference",
      `the entity set of '${entityRef.logicalName}' is unknown; pass entitySetName to createEntityReference`
    );
  }
  return entitySetName;
}

/**
 * Whether `value` is an {@link EntityReference}: an object with a string `@odata.type`,
 * `logicalName` and `id`, as {@link createEntityReference} makes.
 */
export function isEntityReference(value: unknown): value is EntityReference {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<Record<"@odata.type" | "logicalName" | "id", unknown>>;
  return (
    typeof candidate["@odata.type"] === "string" &&
    typeof candidate.logicalName === "string" &&
    typeof candidate.id === "string"
  );
}
