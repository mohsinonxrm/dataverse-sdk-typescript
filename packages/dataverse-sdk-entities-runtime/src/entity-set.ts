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
  odataKey,
  type ODataKey,
  type RequestOptions,
} from "@mohsinonxrm/dataverse-sdk-core";
import {
  type EntityMetadata,
  type FormatEntityForWriteOptions,
  formatEntityForWrite,
} from "./index.js";

/** Options for {@link EntityRecordClient.get}. */
export interface GetRecordOptions<TColumn extends string = string> {
  /** The columns to return (`$select`). Without it, every column comes back. */
  select?: readonly TColumn[];
  /**
   * Navigation properties to expand (`$expand`), with inline options if needed:
   * `"primarycontactid($select=fullname)"`.
   */
  expand?: readonly string[];
}

/** Options for {@link EntitySetClient.list}. */
export interface ListRecordsOptions<
  TColumn extends string = string,
> extends GetRecordOptions<TColumn> {
  /** `$filter`, e.g. `"statecode eq 0"`. */
  filter?: string;
  /** `$orderby` clauses, e.g. `["name asc"]`. */
  orderBy?: readonly string[];
  /** `$top`: at most this many records, in one page. */
  top?: number;
  /**
   * Stop after this many records. `list()` otherwise follows `@odata.nextLink` to the last page.
   */
  maxItems?: number;
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
 *
 * Writes go through {@link formatEntityForWrite}, so a lookup is set with an `EntityReference`.
 */
export class EntitySetClient<
  TEntity extends object,
  TCreate extends object = Partial<TEntity>,
  TUpdate extends object = TCreate,
  TColumn extends string = string,
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
  byId(key: ODataKey): EntityRecordClient<TEntity, TUpdate, TColumn> {
    return new EntityRecordClient(
      this.client,
      this.metadata,
      `${this.entitySetName}(${odataKey(key)})`,
      this.writeOptions
    );
  }

  /**
   * The records that match, following `@odata.nextLink` to the last page (or until `maxItems`).
   */
  async list(
    options: ListRecordsOptions<TColumn> = {},
    requestOptions?: RequestOptions
  ): Promise<TEntity[]> {
    const builder = this.query();
    applyRead(builder, options);
    if (options.filter !== undefined) builder.filter(options.filter);
    if (options.orderBy?.length) builder.orderBy(...options.orderBy);
    if (options.top !== undefined) builder.top(options.top);
    return builder.getAll<TEntity>({
      ...requestOptions,
      ...(options.maxItems !== undefined ? { maxItems: options.maxItems } : {}),
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

  /** Retrieve the record. Rejects with a 404 `DataverseODataError` when it doesn't exist. */
  async get(
    options: GetRecordOptions<TColumn> = {},
    requestOptions?: RequestOptions
  ): Promise<TEntity> {
    const builder = this.request();
    applyRead(builder, options);
    return builder.get<TEntity>(requestOptions);
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

function applyRead(builder: DataverseRequestBuilder, options: GetRecordOptions): void {
  if (options.select?.length) builder.select(...options.select);
  if (options.expand?.length) builder.expand(...options.expand);
}
