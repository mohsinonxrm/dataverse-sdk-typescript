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
  type DataverseClient,
  type DataverseRequestBuilder,
  type ExpandOptions,
  odataKey,
  type ODataKey,
  type RequestOptions,
} from "@mohsinonxrm/dataverse-sdk-core";
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
 * A collection-valued navigation property (one-to-many or many-to-many, such as
 * `contact_customer_accounts`). Expanded, it is an array of the related records.
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

/** A navigation property of either kind. */
export type NavigationProperty = SingleNavigation | CollectionNavigation;

/**
 * The navigation properties of a table the compiler knows nothing about: any name, any column.
 * The default for an {@link EntitySetClient} made without a navigation type, so `expand` takes
 * any name, as before #431.
 */
export type UntypedNavigation = Readonly<Record<string, NavigationProperty>>;

/**
 * Options for one expanded navigation property: `select` takes the related table's columns and
 * `expand` its navigation properties. A collection-valued property also takes `filter`,
 * `orderBy` and `top`, which Dataverse supports only there.
 */
export type ExpandPropertyOptions<TProperty> = TProperty extends {
  readonly collection: true;
  readonly column: infer TColumn extends string;
  readonly navigation: infer TNavigation;
}
  ? {
      /** `$select` inside the expansion: the related table's columns. */
      readonly select?: readonly TColumn[];
      /** `$filter` inside the expansion, e.g. `"statecode eq 0"`. */
      readonly filter?: string;
      /** `$orderby` inside the expansion, e.g. `["fullname asc"]`. */
      readonly orderBy?: readonly string[];
      /** `$top` inside the expansion. */
      readonly top?: number;
      /** Nested expansions, of the related table's navigation properties. */
      readonly expand?: Expand<TNavigation>;
    }
  : TProperty extends {
        readonly column: infer TColumn extends string;
        readonly navigation: infer TNavigation;
      }
    ? {
        /** `$select` inside the expansion: the related table's columns. */
        readonly select?: readonly TColumn[];
        /** Nested expansions, of the related table's navigation properties. */
        readonly expand?: Expand<TNavigation>;
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
 * The object form sends what core's `expand(name, options)` sends; the array form sends the
 * strings as they are.
 */
export type Expand<TNavigation> =
  | ReadonlyArray<(keyof TNavigation & string) | `${string}(${string})`>
  | {
      readonly [K in keyof TNavigation & string]?: true | ExpandPropertyOptions<TNavigation[K]>;
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

/**
 * One table's entity set: list and create records, and reach one with {@link byId}.
 *
 * - `TEntity`: the table's interface (`Account`), what `get()` and `list()` resolve.
 * - `TCreate` / `TUpdate`: what `create()` and `update()` take (`AccountCreate`, `AccountUpdate`).
 * - `TColumn`: the names `select` takes (the generated `AccountColumn` union).
 * - `TNavigation`: the navigation properties `expand` takes (the generated `AccountNavigation`);
 *   without it, `expand` takes any name and doesn't narrow the result.
 *
 * Writes go through {@link formatEntityForWrite}, so a lookup is set with an `EntityReference`.
 */
export class EntitySetClient<
  TEntity extends object,
  TCreate extends object = Partial<TEntity>,
  TUpdate extends object = TCreate,
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
> {
  /** The entity set name, e.g. `accounts`. */
  readonly entitySetName: string;

  /**
   * @param client - The client requests are sent with.
   * @param metadata - The table's generated metadata (`AccountMetadata`).
   * @param writeOptions - For `formatEntityForWrite()`: the generated `EntityMetadataCache`, so a
   *   lookup to a custom table finds its entity set.
   */
  constructor(
    private readonly client: DataverseClient,
    /** The table's generated metadata. */
    readonly metadata: EntityMetadata,
    private readonly writeOptions: FormatEntityForWriteOptions = {}
  ) {
    this.entitySetName = metadata.collectionName;
  }

  /**
   * One record, by its id or by an alternate key (`{ accountnumber: "A-1" }`); nothing is sent
   * until a method of the result is called.
   */
  byId(key: ODataKey): EntityRecordClient<TEntity, TUpdate, TColumn, TNavigation> {
    return new EntityRecordClient(
      this.client,
      this.metadata,
      `${this.entitySetName}(${odataKey(key)})`,
      this.writeOptions
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
    const read: ListRecordsOptions = options ?? {};
    const builder = this.query();
    applyRead(builder, read);
    if (read.filter !== undefined) builder.filter(read.filter);
    if (read.orderBy?.length) builder.orderBy(...read.orderBy);
    if (read.top !== undefined) builder.top(read.top);
    return builder.getAll<ReadResult<TEntity, TNavigation, TOptions>>({
      ...requestOptions,
      ...(read.maxItems !== undefined ? { maxItems: read.maxItems } : {}),
    });
  }

  /** Create a record and return its id. */
  async create(entity: TCreate, requestOptions?: RequestOptions): Promise<string> {
    return this.query().createAndGetId(
      formatEntityForWrite(entity, this.metadata, this.writeOptions),
      { ...requestOptions, primaryIdAttribute: this.metadata.primaryIdAttribute }
    );
  }

  /** Core's request builder for the entity set, for what the methods here don't cover. */
  query(): DataverseRequestBuilder {
    return this.client.api(this.entitySetName);
  }
}

/** One record of an entity set: `get()`, `update()` and `delete()` it. */
export class EntityRecordClient<
  TEntity extends object,
  TUpdate extends object = Partial<TEntity>,
  TColumn extends string = string,
  TNavigation extends object = UntypedNavigation,
> {
  /**
   * @param client - The client requests are sent with.
   * @param metadata - The table's generated metadata.
   * @param path - The record's path, e.g. `accounts(<id>)`.
   * @param writeOptions - For `formatEntityForWrite()` in `update()`.
   */
  constructor(
    private readonly client: DataverseClient,
    /** The table's generated metadata. */
    readonly metadata: EntityMetadata,
    /** The record's path, relative to the Web API root, e.g. `accounts(<id>)`. */
    readonly path: string,
    private readonly writeOptions: FormatEntityForWriteOptions = {}
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

  /** Core's request builder for the record, for what the methods here don't cover. */
  request(): DataverseRequestBuilder {
    return this.client.api(this.path);
  }
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
