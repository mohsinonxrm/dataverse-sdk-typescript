/**
 * Typed request builders per entity set (#312), in the style of the Graph (Kiota) SDKs:
 * `accounts.byId(id).get({ select })`, `accounts.list()`, `accounts.create()`,
 * `accounts.byId(id).update()`, `accounts.byId(id).delete()`. `dataverse-gen` generates
 * `createTypedClient(client)` with one {@link EntitySetClient} per generated table, typed by the
 * table's interface and its create and update types; they're thin wrappers over core's
 * `DataverseRequestBuilder` (`client.api(...)`), which `query()` and `request()` hand out for
 * anything they don't cover.
 */
import {
  type BindManyExecutor,
  type DataverseClient,
  DataverseInvalidRequestError,
  type DataverseRequestBuilder,
  entityIdFromResponse,
  type Executable,
  type ExpandOptions,
  odataKey,
  type ODataKey,
  parseODataError,
  Prefer,
  type RequestOptions,
} from "@mohsinonxrm/dataverse-sdk-core";
import { type EntityReference, entitySetNameOf, isEntityReference } from "./entity-reference.js";
import {
  type EntityMetadata,
  type FormatEntityForWriteOptions,
  formatEntityForWrite,
  type IEntity,
} from "./index.js";

// ---------------------------------------------------------------------------------------------
// Navigation properties, for typed `expand` (#431). These types describe a table to the compiler
// only: no value of them exists. `dataverse-gen` generates an `<Entity>Navigation` interface per
// table, with one member per navigation property.
// ---------------------------------------------------------------------------------------------

/**
 * A single-valued navigation property (a lookup, such as `primarycontactid`): the related
 * table's record type, its column names and its own navigation properties. Expanded, it is the
 * related record, or `null` when the lookup is empty.
 */
export interface SingleNavigation<
  TEntity extends object = IEntity,
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
> {
  readonly collection: false;
  readonly entity: TEntity;
  readonly column: TColumn;
  readonly navigation: TNavigation;
}

/**
 * A one-to-many collection-valued navigation property (such as `contact_customer_accounts`).
 * Expanded, it is an array of the related records.
 */
export interface CollectionNavigation<
  TEntity extends object = IEntity,
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
> {
  readonly collection: true;
  readonly entity: TEntity;
  readonly column: TColumn;
  readonly navigation: TNavigation;
}

/**
 * A many-to-many collection-valued navigation property (its name is its own partner's, such as
 * `teammembership_association`). Expanded, it is an array of the related records; Dataverse
 * refuses a nested `$expand` inside it ("Only many-to-one relationships are supported for nested
 * expansion"), so its expand options have no `expand`.
 */
export interface ManyToManyNavigation<
  TEntity extends object = IEntity,
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
> {
  readonly collection: true;
  readonly manyToMany: true;
  readonly entity: TEntity;
  readonly column: TColumn;
  readonly navigation: TNavigation;
}

/** A navigation property of any kind. */
export type NavigationProperty = SingleNavigation | CollectionNavigation | ManyToManyNavigation;

/**
 * The navigation properties of a table the compiler knows nothing about: any name, any column.
 * The default for an {@link EntitySetClient} made without a navigation type, so `expand` takes
 * any name, as before #431.
 */
export type UntypedNavigation = Readonly<Record<string, NavigationProperty>>;

/** Options any expanded property takes: `$select` of the related table's columns. */
export interface ExpandSelectOption<TColumn extends string> {
  /** `$select` inside the expansion: the related table's columns. */
  readonly select?: readonly TColumn[];
}

/** `$filter`, which an expanded collection takes. */
export interface ExpandFilterOption {
  /** `$filter` inside the expansion, e.g. `"statecode eq 0"`. */
  readonly filter?: string;
}

/** `$orderby` and `$top`, which only a collection expanded at the top level, without a nested `$expand`, takes. */
export interface ExpandLimitOptions {
  /** `$orderby` inside the expansion, e.g. `["fullname asc"]`. */
  readonly orderBy?: readonly string[];
  /** `$top` inside the expansion. */
  readonly top?: number;
}

/** No `$orderby` or `$top`: with a nested `$expand`, or inside another expansion. */
export interface ExpandNoLimitOptions {
  readonly orderBy?: never;
  readonly top?: never;
}

/**
 * Options for one expanded navigation property, as Dataverse accepts them (Learn: "Join tables
 * by using OData"):
 *
 * - a lookup: `select` and a nested `expand`;
 * - a one-to-many collection: `select` and `filter`, plus either `orderBy` / `top` or a nested
 *   `expand`, not both ($top and $orderby aren't supported with a nested $expand, 0x80060888);
 *   inside another expansion (`TNested`), only `select`, `filter` and `expand`;
 * - a many-to-many collection: no nested `expand`.
 *
 * Dataverse may also refuse `$top` / `$orderby` on one expanded collection when another part of
 * the query has a nested `$expand`; the types check each property on its own.
 */
export type ExpandPropertyOptions<TProperty, TNested extends boolean = false> = TProperty extends {
  readonly collection: true;
  readonly column: infer TColumn extends string;
  readonly navigation: infer TNavigation;
}
  ? TProperty extends { readonly manyToMany: true }
    ? ExpandSelectOption<TColumn> &
        ExpandFilterOption &
        (TNested extends true ? ExpandNoLimitOptions : ExpandLimitOptions)
    : TNested extends true
      ? ExpandSelectOption<TColumn> &
          ExpandFilterOption &
          ExpandNoLimitOptions & {
            /** Nested expansions, of the related table's navigation properties. */
            readonly expand?: Expand<TNavigation, true>;
          }
      : | (ExpandSelectOption<TColumn> &
            ExpandFilterOption &
            ExpandLimitOptions & { readonly expand?: never })
        | (ExpandSelectOption<TColumn> &
            ExpandFilterOption &
            ExpandNoLimitOptions & {
              /** Nested expansions (no `orderBy` / `top` then). */
              readonly expand?: Expand<TNavigation, true>;
            })
  : TProperty extends {
        readonly column: infer TColumn extends string;
        readonly navigation: infer TNavigation;
      }
    ? ExpandSelectOption<TColumn> & {
        /** Nested expansions, of the related table's navigation properties. */
        readonly expand?: Expand<TNavigation, true>;
      }
    : never;

/**
 * `$expand`, typed by a table's navigation properties, in one of two forms:
 *
 * - an object, one key per navigation property, `true` or its options:
 *   `{ primarycontactid: { select: ["fullname"] }, contact_customer_accounts: true }`;
 * - an array of names, each optionally with inline options (as before #431):
 *   `["primarycontactid", "contact_customer_accounts($top=5)"]`. A plain name must be one of the
 *   table's; one with inline options isn't checked (a union of every name with `(…)` after it
 *   is slow to compile for a table with hundreds of navigation properties), and the result
 *   types it only when the name is the table's.
 *
 * `TNested` is `true` inside another expansion (see {@link ExpandPropertyOptions}). The object
 * form sends what core's `expand(name, options)` sends; the array form sends the strings as they
 * are.
 */
export type Expand<TNavigation, TNested extends boolean = false> =
  | ReadonlyArray<(keyof TNavigation & string) | `${string}(${string})`>
  | {
      readonly [K in keyof TNavigation & string]?:
        true | ExpandPropertyOptions<TNavigation[K], TNested>;
    };

/**
 * Annotations a record can come back with (`@odata.etag`, formatted values such as
 * `name@OData.Community.Display.V1.FormattedValue`): a record narrowed by `select` keeps them.
 * (A type literal rather than an interface, so a narrowed record is still assignable to the
 * table's interface and its index signature.)
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RecordAnnotations = {
  readonly "@odata.etag"?: string;
  readonly [annotation: `${string}@${string}`]: unknown;
};

/**
 * A record of `TEntity` with only the columns `TColumn` (and its annotations): what a read with
 * `select: [...TColumn]` resolves to. `SelectedColumns<Account, "name">` has `name` only.
 */
export type SelectedColumns<TEntity, TColumn> = Pick<TEntity, Extract<TColumn, keyof TEntity>> &
  RecordAnnotations;

/**
 * `TEntity` without the properties `TKey`, keeping its index signature (`Omit` would keep only
 * the index signature of an `IEntity`): an expanded property replaces the interface's own.
 */
export type WithoutProperties<TEntity, TKey> = {
  [P in keyof TEntity as P extends TKey ? never : P]: TEntity[P];
};

/**
 * The names an `expand` value expands: the object's keys, or the array's names (`"a($top=1)"`
 * names `a`).
 */
export type ExpandedNames<TExpand> =
  TExpand extends ReadonlyArray<infer TItem>
    ? TItem extends `${infer TName}(${string}`
      ? TName
      : TItem & string
    : keyof TExpand & string;

/**
 * What one expanded navigation property reads as, given its options (`true`: none): the related
 * record or `null` for a lookup, an array of them for a collection.
 */
export type ExpandedValue<TProperty, TOptions> = TProperty extends {
  readonly collection: infer TCollection;
  readonly entity: infer TEntity;
  readonly navigation: infer TNavigation;
}
  ? TCollection extends true
    ? Array<ReadResult<TEntity, TNavigation, TOptions>>
    : ReadResult<TEntity, TNavigation, TOptions> | null
  : never;

/** The navigation properties an `expand` value adds to a record, by name. */
export type ExpandedProperties<TNavigation, TExpand> = {
  [K in ExpandedNames<TExpand> & keyof TNavigation]: ExpandedValue<
    TNavigation[K],
    TExpand extends readonly unknown[] ? true : K extends keyof TExpand ? TExpand[K] : true
  >;
};

/**
 * What a read with `TOptions` resolves to, per record (#431):
 *
 * - with `select`, only the selected columns (and the record's annotations), so reading a
 *   column that wasn't selected doesn't compile;
 * - with `expand`, each expanded navigation property as the related record (or `null` when a
 *   lookup is empty), or an array of them, each narrowed by its own `select` and `expand`;
 * - with neither, `TEntity` itself.
 *
 * A `select` or `expand` that isn't a literal (a `string[]` variable) doesn't narrow, and with a
 * navigation type that isn't generated ({@link UntypedNavigation}) an expanded property keeps its
 * type in `TEntity`.
 */
export type ReadResult<TEntity, TNavigation, TOptions> = TOptions extends {
  readonly expand: infer TExpand;
}
  ? string extends ExpandedNames<TExpand>
    ? TEntity
    : TOptions extends { readonly select: infer TSelect extends readonly string[] }
      ? string extends TSelect[number]
        ? string extends keyof TNavigation
          ? TEntity
          : WithoutProperties<TEntity, ExpandedNames<TExpand>> &
              ExpandedProperties<TNavigation, TExpand>
        : string extends keyof TNavigation
          ? // Untyped navigation: an expanded property keeps the interface's type
            SelectedColumns<TEntity, TSelect[number] | ExpandedNames<TExpand>>
          : SelectedColumns<TEntity, TSelect[number]> & ExpandedProperties<TNavigation, TExpand>
      : string extends keyof TNavigation
        ? TEntity
        : WithoutProperties<TEntity, ExpandedNames<TExpand>> &
            ExpandedProperties<TNavigation, TExpand>
  : TOptions extends { readonly select: infer TSelect extends readonly string[] }
    ? string extends TSelect[number]
      ? TEntity
      : SelectedColumns<TEntity, TSelect[number]>
    : TEntity;

/** Options for {@link EntityRecordClient.get}. */
export interface GetRecordOptions<
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
> {
  /**
   * The columns to return (`$select`). Without it, every column comes back. A literal list
   * narrows the result to those columns.
   */
  readonly select?: readonly TColumn[];
  /**
   * Navigation properties to expand (`$expand`): `{ primarycontactid: { select: ["fullname"] } }`,
   * or names with inline options, `["primarycontactid($select=fullname)"]`. See {@link Expand}.
   */
  readonly expand?: Expand<TNavigation>;
}

/** Options for {@link EntitySetClient.list}. */
export interface ListRecordsOptions<
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
> extends GetRecordOptions<TColumn, TNavigation> {
  /** `$filter`, e.g. `"statecode eq 0"`. */
  readonly filter?: string;
  /** `$orderby` clauses, e.g. `["name asc"]`. */
  readonly orderBy?: readonly string[];
  /** `$top`: at most this many records, in one page. */
  readonly top?: number;
  /**
   * Stop after this many records. `list()` otherwise follows `@odata.nextLink` to the last page.
   */
  readonly maxItems?: number;
}

/** Request options for an update or a delete: the core options, plus a concurrency check. */
export interface WriteRecordOptions extends RequestOptions {
  /**
   * The record's `@odata.etag`: the request fails with 412 if the record changed since
   * (optimistic concurrency). Without it, `If-Match: *` is sent, so the request fails with 404
   * when the record doesn't exist (an update doesn't create it).
   */
  etag?: string;
}

/** Options for {@link EntitySetClient.iterate} (#432). */
export interface IterateRecordsOptions<
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
> extends ListRecordsOptions<TColumn, TNavigation> {
  /** Records per page (`Prefer: odata.maxpagesize`); Dataverse's default is 5,000. */
  readonly pageSize?: number;
}

/** Options for {@link EntitySetClient.listPage} (#432). */
export interface ListPageOptions<
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
> extends GetRecordOptions<TColumn, TNavigation> {
  /** `$filter`, e.g. `"statecode eq 0"`. */
  readonly filter?: string;
  /** `$orderby` clauses, e.g. `["name asc"]`. */
  readonly orderBy?: readonly string[];
  /** `$top`: at most this many records, with no next page. */
  readonly top?: number;
  /** Records per page (`Prefer: odata.maxpagesize`); Dataverse's default is 5,000. */
  readonly pageSize?: number;
  /** `$count=true`: the page carries the number of matching records (up to 5,000). */
  readonly count?: boolean;
  /**
   * The {@link RecordPage.nextLink} of the page before: request the page after it. The query is
   * in the link, so the other options only type the result (and `pageSize` is sent again).
   */
  readonly nextLink?: string;
}

/** One page of records, from {@link EntitySetClient.listPage} (#432). */
export interface RecordPage<T> {
  /** The page's records. */
  readonly records: T[];
  /** `@odata.nextLink`: pass it as `nextLink` for the next page. Absent on the last page. */
  readonly nextLink?: string;
  /** `@odata.count`, with `count: true`. */
  readonly count?: number;
}

/** How {@link EntitySetClient.upsert} writes (#432). */
export type UpsertMode =
  /** Update the record if it exists, else create it (no `If-Match`). */
  | "upsert"
  /** Create the record; fail with 412 if it exists (`If-None-Match: *`). */
  | "createOnly"
  /** Update the record; fail with 404 if it doesn't exist (`If-Match: *`). */
  | "updateOnly";

/** Options for {@link EntitySetClient.upsert} (#432). */
export interface UpsertRecordOptions extends RequestOptions {
  /** Default `"upsert"`. */
  readonly mode?: UpsertMode;
}

/**
 * What an upsert sets: the columns valid both in a create and in an update, since Dataverse
 * decides which it is. (The key is in the URL.)
 */
export type UpsertEntity<TCreate, TUpdate> = Pick<TCreate, Extract<keyof TCreate, keyof TUpdate>>;

/**
 * The record a navigation property is associated with: its id or alternate key (the related
 * table's entity set comes from the generated metadata), or an `EntityReference`.
 */
export type AssociateTarget = ODataKey | EntityReference;

/** Options for associating records with a collection-valued navigation property (#432). */
export interface AssociateOptions extends RequestOptions {
  /**
   * For several records: how to send them, such as `createBindManyExecutor()` from
   * `@mohsinonxrm/dataverse-sdk-batch` (one `$batch`). Default: one request per record.
   */
  readonly executor?: BindManyExecutor;
}

// ---------------------------------------------------------------------------------------------
// Bound operations (#432). `dataverse-gen` generates, for a table with bound actions or
// functions, an `<Entity>Operations` object of their generated classes, which the typed client
// turns into methods: `typed.accounts.byId(id).actions.contoso_Recalculate(parameters)`.
// ---------------------------------------------------------------------------------------------

/** A generated action or function class. */
export type OperationClass = abstract new (...args: never[]) => Executable<unknown>;

/** Bound actions and functions, by name: the generated classes. */
export interface OperationGroup {
  readonly actions?: Readonly<Record<string, OperationClass>>;
  readonly functions?: Readonly<Record<string, OperationClass>>;
}

/**
 * The operations bound to a table: to one record (`record`, constructed with the record id first)
 * and to its entity set (`collection`).
 */
export interface BoundOperations {
  readonly record?: OperationGroup;
  readonly collection?: OperationGroup;
}

/**
 * A bound operation as a method: `(parameters, requestOptions?)`, or `(requestOptions?)` for one
 * without parameters; it resolves the operation's response.
 */
export type BoundOperationMethod<
  TArgs extends readonly unknown[],
  TResult,
> = TArgs extends readonly []
  ? (requestOptions?: RequestOptions) => Promise<TResult>
  : [] extends TArgs
    ? (parameters?: TArgs[0], requestOptions?: RequestOptions) => Promise<TResult>
    : (parameters: TArgs[0], requestOptions?: RequestOptions) => Promise<TResult>;

/** Record-bound operation classes (constructed with the record id first) as methods. */
export type RecordOperationMethods<TClasses> = {
  readonly [K in keyof TClasses]: TClasses[K] extends abstract new (
    id: string,
    ...args: infer TArgs
  ) => Executable<infer TResult>
    ? BoundOperationMethod<TArgs, TResult>
    : never;
};

/** Collection-bound operation classes as methods. */
export type CollectionOperationMethods<TClasses> = {
  readonly [K in keyof TClasses]: TClasses[K] extends abstract new (
    ...args: infer TArgs
  ) => Executable<infer TResult>
    ? BoundOperationMethod<TArgs, TResult>
    : never;
};

/** The classes of `TOperations[TBinding][TKind]`, or none. */
export type OperationClasses<
  TOperations,
  TBinding extends keyof BoundOperations,
  TKind extends keyof OperationGroup,
> =
  TOperations extends Readonly<Record<TBinding, infer TGroup>>
    ? TGroup extends Readonly<Record<TKind, infer TClasses>>
      ? TClasses
      : NoOperationClasses
    : NoOperationClasses;

/**
 * No operation classes: a table without bound operations has no methods in `actions` /
 * `functions`.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- no keys, on purpose
export interface NoOperationClasses {}

/** Options for an {@link EntitySetClient}: `formatEntityForWrite()`'s, and the bound operations. */
export interface EntitySetClientOptions extends FormatEntityForWriteOptions {
  /** The table's bound actions and functions (the generated `<Entity>Operations`). */
  readonly operations?: BoundOperations;
}

// ---------------------------------------------------------------------------------------------
// Record navigation (#432): `typed.accounts.byId(id).nav("contact_customer_accounts").list()`.
// ---------------------------------------------------------------------------------------------

/**
 * The client {@link EntityRecordClient.nav} returns for a navigation property: a
 * {@link RelatedCollectionClient} for a collection, a {@link RelatedRecordClient} for a lookup.
 */
export type RelatedClient<TProperty> = TProperty extends {
  readonly collection: true;
  readonly entity: infer TEntity extends object;
  readonly column: infer TColumn extends string;
  readonly navigation: infer TNavigation extends object;
}
  ? RelatedCollectionClient<TEntity, TColumn, TNavigation>
  : TProperty extends {
        readonly entity: infer TEntity extends object;
        readonly column: infer TColumn extends string;
        readonly navigation: infer TNavigation extends object;
      }
    ? RelatedRecordClient<TEntity, TColumn, TNavigation>
    : never;

/** What `associate()` takes for a navigation property: several records only for a collection. */
export type AssociateTargets<TProperty> = TProperty extends { readonly collection: true }
  ? AssociateTarget | ReadonlyArray<string | EntityReference>
  : AssociateTarget;

/** What `disassociate()` takes after the name: the record for a collection, nothing for a lookup. */
export type DisassociateArguments<TProperty> = TProperty extends { readonly collection: true }
  ? [target: AssociateTarget, requestOptions?: RequestOptions]
  : [requestOptions?: RequestOptions];

/**
 * What a {@link RelatedCollectionClient} or {@link RelatedRecordClient} needs from the record it
 * starts from; {@link EntityRecordClient.nav} makes it.
 */
export interface RelatedClientContext {
  readonly client: DataverseClient;
  readonly metadata: EntityMetadata;
  /** The record's path, e.g. `accounts(<id>)`. */
  readonly recordPath: string;
  /** The navigation property, e.g. `contact_customer_accounts`. */
  readonly name: string;
  readonly options: EntitySetClientOptions;
}

/**
 * One table's entity set: list and create records, and reach one with {@link byId}.
 *
 * - `TEntity`: the table's interface (`Account`), what `get()` and `list()` resolve.
 * - `TCreate` / `TUpdate`: what `create()` and `update()` take (`AccountCreate`, `AccountUpdate`).
 * - `TColumn`: the names `select` takes (the generated `AccountColumn` union).
 * - `TNavigation`: the navigation properties `expand` and `nav()` take (the generated
 *   `AccountNavigation`); without it, any name, and `expand` doesn't narrow the result.
 * - `TOperations`: the bound actions and functions (the generated `AccountOperations`), as the
 *   `actions` and `functions` methods.
 *
 * Writes go through {@link formatEntityForWrite}, so a lookup is set with an `EntityReference`.
 */
export class EntitySetClient<
  TEntity extends object,
  TCreate extends object = Partial<TEntity>,
  TUpdate extends object = TCreate,
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
  TOperations extends BoundOperations = BoundOperations,
> {
  /** The entity set name, e.g. `accounts`. */
  readonly entitySetName: string;

  /**
   * @param client - The client requests are sent with.
   * @param metadata - The table's generated metadata (`AccountMetadata`).
   * @param writeOptions - For `formatEntityForWrite()`: the generated `EntityMetadataCache`, so a
   *   lookup to a custom table finds its entity set; and the table's bound `operations`.
   */
  constructor(
    private readonly client: DataverseClient,
    /** The table's generated metadata. */
    readonly metadata: EntityMetadata,
    private readonly writeOptions: EntitySetClientOptions = {}
  ) {
    this.entitySetName = metadata.collectionName;
  }

  /**
   * One record, by its id or by an alternate key (`{ accountnumber: "A-1" }`); nothing is sent
   * until a method of the result is called.
   */
  byId(key: ODataKey): EntityRecordClient<TEntity, TUpdate, TColumn, TNavigation, TOperations> {
    return new EntityRecordClient(
      this.client,
      this.metadata,
      `${this.entitySetName}(${odataKey(key)})`,
      this.writeOptions,
      key
    );
  }

  /**
   * The records that match, following `@odata.nextLink` to the last page (or until `maxItems`).
   * A literal `select` narrows each record to those columns, and `expand` adds the expanded
   * navigation properties (see {@link ReadResult}).
   */
  async list<
    const TOptions extends ListRecordsOptions<TColumn, TNavigation> = ListRecordsOptions<
      TColumn,
      TNavigation
    >,
  >(
    options?: TOptions,
    requestOptions?: RequestOptions
  ): Promise<Array<ReadResult<TEntity, TNavigation, TOptions>>> {
    return listRecords(this.query(), options, requestOptions);
  }

  /**
   * The records that match, one at a time, following `@odata.nextLink` as they're read (#432).
   * Nothing is sent until the first record is read; `maxItems` stops early.
   *
   * ```typescript
   * for await (const account of typed.accounts.iterate({ select: ["name"], pageSize: 500 })) { … }
   * ```
   */
  iterate<
    const TOptions extends IterateRecordsOptions<TColumn, TNavigation> = IterateRecordsOptions<
      TColumn,
      TNavigation
    >,
  >(
    options?: TOptions,
    requestOptions?: RequestOptions
  ): AsyncIterable<ReadResult<TEntity, TNavigation, TOptions>> {
    return iterateRecords(this.query(), options, requestOptions);
  }

  /**
   * One page of the records that match, and the link to the next (#432): pass `nextLink` back
   * with the same options for the page after.
   *
   * ```typescript
   * const page = await typed.accounts.listPage({ select: ["name"], pageSize: 50 });
   * const next = page.nextLink && (await typed.accounts.listPage({ select: ["name"], pageSize: 50, nextLink: page.nextLink }));
   * ```
   */
  async listPage<
    const TOptions extends ListPageOptions<TColumn, TNavigation> = ListPageOptions<
      TColumn,
      TNavigation
    >,
  >(
    options?: TOptions,
    requestOptions?: RequestOptions
  ): Promise<RecordPage<ReadResult<TEntity, TNavigation, TOptions>>> {
    return listRecordPage(this.client, this.query(), options, requestOptions);
  }

  /** Create a record and return its id. */
  async create(entity: TCreate, requestOptions?: RequestOptions): Promise<string> {
    return this.query().createAndGetId(
      formatEntityForWrite(entity, this.metadata, this.writeOptions),
      { ...requestOptions, primaryIdAttribute: this.metadata.primaryIdAttribute }
    );
  }

  /**
   * Create or update the record with this id or alternate key (#432): `PATCH` without
   * `If-Match`, so Dataverse creates the record when it doesn't exist. `mode: "createOnly"`
   * sends `If-None-Match: *` (412 if it exists), `mode: "updateOnly"` sends `If-Match: *` (404 if
   * it doesn't). Resolves the record's id: by id, that id; by alternate key, the primary key
   * Dataverse returns (the request asks for it with `Prefer: return=representation` and
   * `$select=<primary key>`, since its `OData-EntityId` then names the record by the key).
   *
   * ```typescript
   * const id = await typed.accounts.upsert({ accountnumber: "A-1" }, { name: "Contoso" });
   * ```
   */
  async upsert(
    key: ODataKey,
    entity: UpsertEntity<TCreate, TUpdate>,
    options: UpsertRecordOptions = {}
  ): Promise<string> {
    const { mode = "upsert", ...requestOptions } = options;
    const builder = this.byId(key).request();
    if (mode === "createOnly") builder.ifNoneMatch("*");
    else if (mode === "updateOnly") builder.ifMatch("*");
    const byId = typeof key === "string";
    const primaryKey = this.metadata.primaryIdAttribute;
    if (!byId) builder.select(primaryKey).prefer(Prefer.returnRepresentation());
    const response = await builder.response(
      "PATCH",
      formatEntityForWrite(entity, this.metadata, this.writeOptions),
      requestOptions
    );
    if (!response.ok) throw await parseODataError(response);
    if (byId) {
      await response.body?.cancel();
      return odataKey(key);
    }
    // 201 (created) or 200 (updated) with the record; a 204 has only the header to go on
    if (response.status !== 204) {
      const record = (await response.json()) as Record<string, unknown>;
      const id = record[primaryKey];
      if (typeof id === "string") return id;
    }
    return entityIdFromResponse(response);
  }

  /** The actions bound to the entity set (the generated `<Entity>Operations`), as methods (#432). */
  get actions(): CollectionOperationMethods<
    OperationClasses<TOperations, "collection", "actions">
  > {
    return operationMethods(
      this.client,
      this.writeOptions.operations?.collection?.actions,
      []
    ) as CollectionOperationMethods<OperationClasses<TOperations, "collection", "actions">>;
  }

  /** The functions bound to the entity set, as methods (#432). */
  get functions(): CollectionOperationMethods<
    OperationClasses<TOperations, "collection", "functions">
  > {
    return operationMethods(
      this.client,
      this.writeOptions.operations?.collection?.functions,
      []
    ) as CollectionOperationMethods<OperationClasses<TOperations, "collection", "functions">>;
  }

  /** Core's request builder for the entity set, for what the methods here don't cover. */
  query(): DataverseRequestBuilder {
    return this.client.api(this.entitySetName);
  }
}

/**
 * One record of an entity set: `get()`, `update()` and `delete()` it; reach its related records
 * with {@link nav}, and call its bound operations with {@link actions} and {@link functions}.
 */
export class EntityRecordClient<
  TEntity extends object,
  TUpdate extends object = Partial<TEntity>,
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
  TOperations extends BoundOperations = BoundOperations,
> {
  /**
   * @param client - The client requests are sent with.
   * @param metadata - The table's generated metadata.
   * @param path - The record's path, e.g. `accounts(<id>)`.
   * @param writeOptions - For `formatEntityForWrite()` in `update()`, and the bound operations.
   * @param key - The record's id or alternate key (a bound operation needs the id).
   */
  constructor(
    private readonly client: DataverseClient,
    /** The table's generated metadata. */
    readonly metadata: EntityMetadata,
    /** The record's path, relative to the Web API root, e.g. `accounts(<id>)`. */
    readonly path: string,
    private readonly writeOptions: EntitySetClientOptions = {},
    private readonly key?: ODataKey
  ) {}

  /**
   * Retrieve the record. Rejects with a 404 `DataverseODataError` when it doesn't exist. A
   * literal `select` narrows the result to those columns, and `expand` adds the expanded
   * navigation properties (see {@link ReadResult}).
   */
  async get<
    const TOptions extends GetRecordOptions<TColumn, TNavigation> = GetRecordOptions<
      TColumn,
      TNavigation
    >,
  >(
    options?: TOptions,
    requestOptions?: RequestOptions
  ): Promise<ReadResult<TEntity, TNavigation, TOptions>> {
    const builder = this.request();
    applyRead(builder, options ?? {});
    return builder.get<ReadResult<TEntity, TNavigation, TOptions>>(requestOptions);
  }

  /**
   * Update the record with the columns `entity` sets (`null` clears one). Sends `If-Match: *`
   * (or the `etag`), so it never creates a record.
   */
  async update(entity: TUpdate, options: WriteRecordOptions = {}): Promise<void> {
    const { etag, ...requestOptions } = options;
    await this.request()
      .ifMatch(etag ?? "*")
      .patch(formatEntityForWrite(entity, this.metadata, this.writeOptions), requestOptions);
  }

  /** Delete the record; with `etag`, only if it hasn't changed. */
  async delete(options: WriteRecordOptions = {}): Promise<void> {
    const { etag, ...requestOptions } = options;
    const builder = this.request();
    if (etag !== undefined) builder.ifMatch(etag);
    await builder.delete(requestOptions);
  }

  /**
   * The records related through a navigation property (#432): for a collection
   * (`contact_customer_accounts`) a {@link RelatedCollectionClient} to list, page, associate and
   * disassociate them; for a lookup (`primarycontactid`) a {@link RelatedRecordClient} to get,
   * set or clear it. Nothing is sent until a method of the result is called.
   */
  nav<TName extends keyof TNavigation & string>(name: TName): RelatedClient<TNavigation[TName]> {
    const context: RelatedClientContext = {
      client: this.client,
      metadata: this.metadata,
      recordPath: this.path,
      name,
      options: this.writeOptions,
    };
    const info = navigationInfo(this.metadata, name);
    if (!info) {
      throw DataverseInvalidRequestError.invalidParameter(
        "navigation",
        `'${name}' is not a navigation property of ${this.metadata.logicalName}`
      );
    }
    return (
      info.collection ? new RelatedCollectionClient(context) : new RelatedRecordClient(context)
    ) as RelatedClient<TNavigation[TName]>;
  }

  /**
   * Associate records through a navigation property (#432): add them to a collection
   * (`POST <nav>/$ref`, or core's `bindMany()` for several, with an optional `$batch` executor),
   * or set a lookup (`PATCH` with `<nav>@odata.bind`). A target is an id or alternate key of the
   * related table, or an `EntityReference`.
   */
  async associate<TName extends keyof TNavigation & string>(
    navigation: TName,
    target: AssociateTargets<TNavigation[TName]>,
    options?: AssociateOptions
  ): Promise<void> {
    const related = this.nav(navigation) as unknown as
      RelatedCollectionClient<object> | RelatedRecordClient<object>;
    if (related instanceof RelatedCollectionClient) {
      await related.associate(target, options);
    } else {
      await related.set(target as AssociateTarget, options);
    }
  }

  /**
   * Disassociate a record (#432): remove it from a collection (`DELETE <nav>(<id>)/$ref`), or
   * clear a lookup (`DELETE <nav>/$ref`, no target).
   */
  async disassociate<TName extends keyof TNavigation & string>(
    navigation: TName,
    ...args: DisassociateArguments<TNavigation[TName]>
  ): Promise<void> {
    const related = this.nav(navigation) as unknown as
      RelatedCollectionClient<object> | RelatedRecordClient<object>;
    if (related instanceof RelatedCollectionClient) {
      const [target, requestOptions] = args as [AssociateTarget, RequestOptions | undefined];
      await related.disassociate(target, requestOptions);
    } else {
      await related.clear(args[0] as RequestOptions | undefined);
    }
  }

  /** The actions bound to this record (the generated `<Entity>Operations`), as methods (#432). */
  get actions(): RecordOperationMethods<OperationClasses<TOperations, "record", "actions">> {
    return operationMethods(this.client, this.writeOptions.operations?.record?.actions, () => [
      this.recordId(),
    ]) as RecordOperationMethods<OperationClasses<TOperations, "record", "actions">>;
  }

  /** The functions bound to this record, as methods (#432). */
  get functions(): RecordOperationMethods<OperationClasses<TOperations, "record", "functions">> {
    return operationMethods(this.client, this.writeOptions.operations?.record?.functions, () => [
      this.recordId(),
    ]) as RecordOperationMethods<OperationClasses<TOperations, "record", "functions">>;
  }

  /** Core's request builder for the record, for what the methods here don't cover. */
  request(): DataverseRequestBuilder {
    return this.client.api(this.path);
  }

  /** The record's id, for a bound operation's class (which binds by id, not alternate key). */
  private recordId(): string {
    if (typeof this.key !== "string") {
      throw DataverseInvalidRequestError.invalidParameter(
        "key",
        "a bound operation is called on a record by its id; byId() was given an alternate key"
      );
    }
    return odataKey(this.key);
  }
}

/**
 * The records related to one record through a collection-valued navigation property (#432):
 * `typed.accounts.byId(id).nav("contact_customer_accounts")`. `list()`, `iterate()` and
 * `listPage()` read `GET <record>/<nav>`, typed by the related table; `associate()` and
 * `disassociate()` add and remove records (`$ref`).
 */
export class RelatedCollectionClient<
  TEntity extends object,
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
> {
  /** The path of the related records, e.g. `accounts(<id>)/contact_customer_accounts`. */
  readonly path: string;

  constructor(private readonly context: RelatedClientContext) {
    this.path = `${context.recordPath}/${context.name}`;
  }

  /** The related records, following `@odata.nextLink` (or until `maxItems`). */
  async list<
    const TOptions extends ListRecordsOptions<TColumn, TNavigation> = ListRecordsOptions<
      TColumn,
      TNavigation
    >,
  >(
    options?: TOptions,
    requestOptions?: RequestOptions
  ): Promise<Array<ReadResult<TEntity, TNavigation, TOptions>>> {
    return listRecords(this.query(), options, requestOptions);
  }

  /** The related records, one at a time, following `@odata.nextLink` as they're read. */
  iterate<
    const TOptions extends IterateRecordsOptions<TColumn, TNavigation> = IterateRecordsOptions<
      TColumn,
      TNavigation
    >,
  >(
    options?: TOptions,
    requestOptions?: RequestOptions
  ): AsyncIterable<ReadResult<TEntity, TNavigation, TOptions>> {
    return iterateRecords(this.query(), options, requestOptions);
  }

  /** One page of the related records, and the link to the next. */
  async listPage<
    const TOptions extends ListPageOptions<TColumn, TNavigation> = ListPageOptions<
      TColumn,
      TNavigation
    >,
  >(
    options?: TOptions,
    requestOptions?: RequestOptions
  ): Promise<RecordPage<ReadResult<TEntity, TNavigation, TOptions>>> {
    return listRecordPage(this.context.client, this.query(), options, requestOptions);
  }

  /**
   * Add records to the collection: `POST <nav>/$ref` (core's `associate()`), or for several,
   * core's `bindMany()`, through `options.executor` when given (a `$batch`).
   */
  async associate(
    target: AssociateTarget | ReadonlyArray<string | EntityReference>,
    options: AssociateOptions = {}
  ): Promise<void> {
    const { executor, ...requestOptions } = options;
    const record = this.context.client.api(this.context.recordPath);
    if (isTargetList(target)) {
      const targets = target.map((t) => resolveTarget(this.context, t));
      const sets = new Set(targets.map((t) => t.entitySetName));
      for (const entitySetName of sets) {
        const ids = targets
          .filter((t) => t.entitySetName === entitySetName)
          .map((t) => odataKey(t.key));
        await record.bindMany(this.context.name, entitySetName, ids, executor, requestOptions);
      }
      return;
    }
    const { entitySetName, key } = resolveTarget(this.context, target);
    await record.associate(this.context.name, entitySetName, key, requestOptions);
  }

  /** Remove a record from the collection: `DELETE <nav>(<id>)/$ref` (core's `disassociate()`). */
  async disassociate(target: AssociateTarget, requestOptions?: RequestOptions): Promise<void> {
    const key = isEntityReference(target) ? target.id : target;
    await this.context.client
      .api(this.context.recordPath)
      .disassociate(this.context.name, key, requestOptions);
  }

  /** Core's request builder for the related records, for what the methods here don't cover. */
  query(): DataverseRequestBuilder {
    return this.context.client.api(this.path);
  }
}

/**
 * The record a single-valued navigation property (a lookup) points to (#432):
 * `typed.accounts.byId(id).nav("primarycontactid")`. `get()` reads it, typed by the related
 * table; `set()` and `clear()` change the lookup.
 */
export class RelatedRecordClient<
  TEntity extends object,
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
> {
  /** The path of the related record, e.g. `accounts(<id>)/primarycontactid`. */
  readonly path: string;

  constructor(private readonly context: RelatedClientContext) {
    this.path = `${context.recordPath}/${context.name}`;
  }

  /**
   * The related record (`GET <record>/<nav>`), or `null` when Dataverse answers that the lookup
   * is empty (204 No Content). A literal `select` narrows it, as in `get()` of the table.
   */
  async get<
    const TOptions extends GetRecordOptions<TColumn, TNavigation> = GetRecordOptions<
      TColumn,
      TNavigation
    >,
  >(
    options?: TOptions,
    requestOptions?: RequestOptions
  ): Promise<ReadResult<TEntity, TNavigation, TOptions> | null> {
    const builder = this.request();
    applyRead(builder, options ?? {});
    const record = await builder.get<ReadResult<TEntity, TNavigation, TOptions> | undefined>(
      requestOptions
    );
    return record ?? null;
  }

  /**
   * Point the lookup at a record: `PATCH <record>` with `<nav>@odata.bind` and `If-Match: *`
   * (core's `bind()`), so it never creates the record it starts from.
   */
  async set(target: AssociateTarget, requestOptions?: RequestOptions): Promise<void> {
    const { entitySetName, key } = resolveTarget(this.context, target);
    await this.context.client
      .api(this.context.recordPath)
      .bind(this.context.name, entitySetName, key)
      .ifMatch("*")
      .patch({}, requestOptions);
  }

  /** Clear the lookup: `DELETE <record>/<nav>/$ref`. */
  async clear(requestOptions?: RequestOptions): Promise<void> {
    await this.context.client.api(`${this.path}/$ref`).delete(requestOptions);
  }

  /** Core's request builder for the related record, for what the methods here don't cover. */
  request(): DataverseRequestBuilder {
    return this.context.client.api(this.path);
  }
}

/** `list()`: the query's records, every page. */
async function listRecords<T>(
  builder: DataverseRequestBuilder,
  options: ListRecordsOptions | undefined,
  requestOptions: RequestOptions | undefined
): Promise<T[]> {
  const read = options ?? {};
  applyQuery(builder, read);
  return builder.getAll<T>({
    ...requestOptions,
    ...(read.maxItems !== undefined ? { maxItems: read.maxItems } : {}),
  });
}

/** `iterate()`: core's `iterate()`, stopping after `maxItems`. */
function iterateRecords<T>(
  builder: DataverseRequestBuilder,
  options: IterateRecordsOptions | undefined,
  requestOptions: RequestOptions | undefined
): AsyncIterable<T> {
  const read = options ?? {};
  applyQuery(builder, read);
  if (read.pageSize !== undefined) builder.prefer((p) => p.maxPageSize(read.pageSize ?? 0));
  const records = builder.iterate<T>(requestOptions);
  const { maxItems } = read;
  if (maxItems === undefined) return records;
  return {
    async *[Symbol.asyncIterator]() {
      if (maxItems <= 0) return;
      let count = 0;
      for await (const record of records) {
        yield record;
        if (++count >= maxItems) return;
      }
    },
  };
}

/** `listPage()`: one page, the first or the one `nextLink` points to. */
async function listRecordPage<T>(
  client: DataverseClient,
  builder: DataverseRequestBuilder,
  options: ListPageOptions | undefined,
  requestOptions: RequestOptions | undefined
): Promise<RecordPage<T>> {
  const read = options ?? {};
  let page = builder;
  if (read.nextLink !== undefined) {
    page = client.api(read.nextLink);
  } else {
    applyQuery(page, read);
    if (read.count === true) page.count();
  }
  if (read.pageSize !== undefined) page.prefer((p) => p.maxPageSize(read.pageSize ?? 0));
  const response = await page.getPage<T>(requestOptions);
  const nextLink = response["@odata.nextLink"];
  const count = (response as { "@odata.count"?: number })["@odata.count"];
  return {
    records: response.value,
    ...(nextLink !== undefined ? { nextLink } : {}),
    ...(count !== undefined ? { count } : {}),
  };
}

/** `$select`, `$expand`, `$filter`, `$orderby` and `$top`. */
function applyQuery(
  builder: DataverseRequestBuilder,
  options: Pick<ListRecordsOptions, "select" | "expand" | "filter" | "orderBy" | "top">
): void {
  applyRead(builder, options);
  if (options.filter !== undefined) builder.filter(options.filter);
  if (options.orderBy?.length) builder.orderBy(...options.orderBy);
  if (options.top !== undefined) builder.top(options.top);
}

function isTargetList(
  target: AssociateTarget | ReadonlyArray<string | EntityReference>
): target is ReadonlyArray<string | EntityReference> {
  return Array.isArray(target);
}

/**
 * Whether a navigation property is a collection, and the table it points to (unknown for a
 * consolidated polymorphic lookup), from the generated metadata. A polymorphic lookup's Web API
 * properties (`parentcustomerid_account`) are found from the consolidated one.
 */
function navigationInfo(
  metadata: EntityMetadata,
  name: string
): { collection: boolean; targetType?: string } | undefined {
  const own = Object.hasOwn(metadata.navigation, name) ? metadata.navigation[name] : undefined;
  if (own) {
    return {
      collection: own.isCollection,
      ...(own.isPolymorphic ? {} : { targetType: own.targetType }),
    };
  }
  for (const [key, nav] of Object.entries(metadata.navigation)) {
    if (nav.isCollection || !nav.isPolymorphic) continue;
    // The Web API's names, which the generated metadata lists (`regardingobjectid_contact_task`
    // on an activity); metadata generated before them is matched by `<lookup>_<target>`
    const member =
      nav.members && Object.hasOwn(nav.members, name)
        ? nav.members[name]
        : nav.targets?.find((t) => `${nav.fullName ?? key}_${t}` === name);
    if (member !== undefined) return { collection: false, targetType: member };
  }
  return undefined;
}

/** The entity set and key of the record a navigation property is associated with. */
function resolveTarget(
  context: RelatedClientContext,
  target: AssociateTarget
): { entitySetName: string; key: ODataKey } {
  if (isEntityReference(target)) {
    const entitySetName = target.entitySetName ?? entitySetOf(context.options, target.logicalName);
    if (entitySetName !== undefined) return { entitySetName, key: target.id };
    throw unknownEntitySet(target.logicalName);
  }
  const targetType = navigationInfo(context.metadata, context.name)?.targetType;
  const entitySetName =
    targetType === undefined ? undefined : entitySetOf(context.options, targetType);
  if (entitySetName === undefined) {
    throw DataverseInvalidRequestError.invalidParameter(
      "target",
      `the table '${context.name}' points to isn't known` +
        (targetType === undefined ? "" : ` (${targetType})`) +
        "; pass an EntityReference with its entitySetName"
    );
  }
  return { entitySetName, key: target };
}

/** A table's entity set: from the options, then the generated metadata, then the snapshot. */
function entitySetOf(options: EntitySetClientOptions, logicalName: string): string | undefined {
  const names = options.entitySetNames;
  if (names && Object.hasOwn(names, logicalName)) return names[logicalName];
  const cache = options.metadataCache;
  if (cache && Object.hasOwn(cache, logicalName)) return cache[logicalName].collectionName;
  return entitySetNameOf(logicalName);
}

function unknownEntitySet(logicalName: string): DataverseInvalidRequestError {
  return DataverseInvalidRequestError.invalidParameter(
    "target",
    `no entity set is known for '${logicalName}'; set entitySetName on the reference`
  );
}

/**
 * Methods that construct a bound operation's generated class (with `leading()` first: the record
 * id) and run it with `client.execute()`. A class whose `parameterTypes` is empty takes no
 * parameters, so its method takes the request options first.
 */
function operationMethods(
  client: DataverseClient,
  classes: Readonly<Record<string, OperationClass>> | undefined,
  leading: unknown[] | (() => unknown[])
): Record<string, (...args: unknown[]) => Promise<unknown>> {
  const methods: Record<string, (...args: unknown[]) => Promise<unknown>> = {};
  for (const [name, operation] of Object.entries(classes ?? {})) {
    const parameterTypes = (operation as { parameterTypes?: object }).parameterTypes ?? {};
    const takesParameters = Object.keys(parameterTypes).length > 0;
    const Operation = operation as unknown as new (...args: unknown[]) => Executable<unknown>;
    // async, so a missing record id rejects rather than throws
    methods[name] = async (...args: unknown[]) => {
      const first = typeof leading === "function" ? leading() : leading;
      const [parameters, requestOptions] = takesParameters ? args : [undefined, args[0]];
      const request = new Operation(...first, ...(takesParameters ? [parameters] : []));
      return client.execute(request, requestOptions as RequestOptions | undefined);
    };
  }
  return methods;
}

/** An `expand` of any table, as the methods read it. */
type AnyExpand = readonly string[] | Readonly<Record<string, true | AnyExpandOptions>>;

/** Options of one expanded property of any table. */
interface AnyExpandOptions {
  readonly select?: readonly string[];
  readonly filter?: string;
  readonly orderBy?: readonly string[];
  readonly top?: number;
  readonly expand?: AnyExpand;
}

function applyRead(
  builder: DataverseRequestBuilder,
  options: { readonly select?: readonly string[]; readonly expand?: unknown }
): void {
  if (options.select?.length) builder.select(...options.select);
  const expand = options.expand as AnyExpand | undefined;
  if (isExpandList(expand)) {
    if (expand.length) builder.expand(...expand);
  } else if (expand) {
    // One `expand(name, options)` per property: what core's builder sends for the same options
    for (const [name, value] of Object.entries(expand)) {
      if (value === true) builder.expand(name);
      else builder.expand(name, toExpandOptions(value));
    }
  }
}

function isExpandList(expand: AnyExpand | undefined): expand is readonly string[] {
  return Array.isArray(expand);
}

/** Core's {@link ExpandOptions} for one property's options. */
function toExpandOptions(options: AnyExpandOptions): ExpandOptions {
  const { expand } = options;
  return {
    ...(options.select ? { select: [...options.select] } : {}),
    ...(options.filter !== undefined ? { filter: options.filter } : {}),
    ...(options.orderBy ? { orderBy: [...options.orderBy] } : {}),
    ...(options.top !== undefined ? { top: options.top } : {}),
    ...(isExpandList(expand)
      ? { expand: expand.join(",") }
      : expand
        ? {
            expand: Object.fromEntries(
              Object.entries(expand).map(([name, value]) => [
                name,
                value === true ? true : toExpandOptions(value),
              ])
            ),
          }
        : {}),
  };
}
