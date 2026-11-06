/**
 * @fileoverview OrganizationService class providing C#-familiar CRUD operations for Dataverse
 */

import {
  DataverseAbortError,
  odataLiteral,
  odataKey,
  Prefer,
} from "@mohsinonxrm/dataverse-sdk-core";
import type {
  DataverseClient,
  DataverseRequestBuilder,
  Executable,
  RequestOptions,
} from "@mohsinonxrm/dataverse-sdk-core";
import type {
  EntityRecord,
  EntityReference,
  ExpandOption,
  OrganizationServiceOptions,
  OperationOptions,
  CreateOptions,
  RetrieveOptions,
  RetrieveMultipleOptions,
  RetrieveMultipleResult,
  UpdateOptions,
  DeleteOptions,
  AssociateOptions,
  DisassociateOptions,
} from "./types.js";

/** Options of the operations that take impersonation and extra headers. */
interface CommonOptions extends OperationOptions {
  impersonateUserId?: string;
  headers?: Record<string, string>;
}

/** Options of the operations that write a record (create, update). */
interface WriteOptions extends CommonOptions {
  returnRepresentation?: boolean;
  select?: string[];
  suppressDuplicateDetection?: boolean;
  detectDuplicates?: boolean;
}

/** An entity set name lookup still waiting for its response. */
interface PendingLookup {
  /** Callers still waiting; `Infinity` once one without a signal joins (it can't cancel). */
  waiters: number;
  /** Aborts the request and drops it from the cache. */
  cancel: () => void;
}

/** The error an aborted operation rejects with, the same type the core client throws. */
function abortError(signal: AbortSignal): DataverseAbortError {
  return new DataverseAbortError(undefined, signal.reason);
}

/** The request options that carry a caller's signal, or `undefined` without one. */
function signalOptions(options: OperationOptions | undefined): RequestOptions | undefined {
  return options?.signal ? { signal: options.signal } : undefined;
}

/**
 * OrganizationService provides a C#-familiar interface for Dataverse operations.
 *
 * Every method goes through the client's request builder, so auth, retry, throttling and error
 * mapping apply as they do for `client.api()`. Failed requests reject with the core error types
 * (`DataverseError` and its subclasses).
 *
 * Every method takes an `AbortSignal` (`{ signal }`, in its options object or as its last
 * argument). Aborting it cancels the request and rejects with `DataverseAbortError`.
 *
 * @example
 * ```typescript
 * import { DataverseClient } from '@mohsinonxrm/dataverse-sdk-core';
 * import { OrganizationService } from '@mohsinonxrm/dataverse-sdk-xrm';
 *
 * const client = new DataverseClient({ baseUrl, tokenProvider });
 * const service = new OrganizationService(client);
 *
 * // Create
 * const accountId = await service.create('accounts', {
 *   name: 'Contoso Ltd',
 *   telephone1: '555-0100'
 * });
 *
 * // Retrieve
 * const account = await service.retrieve('accounts', accountId, {
 *   select: ['name', 'telephone1', 'revenue']
 * });
 *
 * // Update, only if nobody changed the record since it was read
 * await service.update('accounts', accountId, {
 *   telephone1: '555-0200'
 * }, { etag: account['@odata.etag'] });
 *
 * // Delete
 * await service.delete('accounts', accountId);
 * ```
 */
export class OrganizationService {
  private client: DataverseClient;
  /** Entity set names by lower-cased logical name: overrides, then metadata lookups. */
  private entitySetNames = new Map<string, Promise<string>>();
  /** Metadata lookups in flight, so they're cancelled only once every caller has aborted. */
  private pendingLookups = new Map<string, PendingLookup>();

  /**
   * Creates a new OrganizationService instance
   *
   * @param client - The DataverseClient instance to use for operations
   * @param options - Optional settings, such as entity set names to use without a metadata lookup
   */
  constructor(client: DataverseClient, options: OrganizationServiceOptions = {}) {
    this.client = client;
    for (const [logicalName, entitySetName] of Object.entries(options.entitySetNames ?? {})) {
      this.setEntitySetName(logicalName, entitySetName);
    }
  }

  /**
   * The entity set name of a table, e.g. `"opportunity"` → `"opportunities"`.
   *
   * Methods that take a logical name (`assign()`, `setState()`, and the `EntityReference`s of
   * `associate()`) use this. It reads `EntityDefinitions(LogicalName='…')?$select=EntitySetName`
   * once per logical name and caches the answer on this service. Names given with
   * `options.entitySetNames` or {@link setEntitySetName} are used without a lookup. A failed
   * lookup rejects (with the core `DataverseError`, e.g. 404 for an unknown table) and is not
   * cached.
   *
   * Concurrent callers share one lookup. Aborting a caller's `signal` rejects that caller's
   * promise; the lookup request itself is aborted once every caller waiting on it has aborted.
   *
   * @param logicalName - The table's logical name, e.g. 'account'
   * @param options - Optional settings, such as a `signal` to cancel the lookup
   * @returns The entity set name, e.g. 'accounts'
   *
   * @example
   * ```typescript
   * await service.getEntitySetName('opportunity'); // 'opportunities'
   * ```
   */
  getEntitySetName(logicalName: string, options?: OperationOptions): Promise<string> {
    const signal = options?.signal;
    if (signal?.aborted) return Promise.reject(abortError(signal));

    const key = logicalName.toLowerCase();
    const lookup = this.entitySetNames.get(key) ?? this.lookUpEntitySetName(key, logicalName);
    const pending = this.pendingLookups.get(key);
    // A known answer (or an override) has no request left to cancel.
    if (!pending) return lookup;
    if (!signal) {
      pending.waiters = Number.POSITIVE_INFINITY;
      return lookup;
    }

    pending.waiters++;
    return new Promise<string>((resolve, reject) => {
      const onAbort = (): void => {
        reject(abortError(signal));
        // The last waiter to give up cancels the request.
        if (--pending.waiters === 0) pending.cancel();
      };
      signal.addEventListener("abort", onAbort, { once: true });
      lookup.then(resolve, reject).finally(() => {
        signal.removeEventListener("abort", onAbort);
      });
    });
  }

  /** Sends the metadata lookup for `key`, caching it while it is pending and once it succeeds. */
  private lookUpEntitySetName(key: string, logicalName: string): Promise<string> {
    const controller = new AbortController();
    const lookup = this.client
      .api(`/EntityDefinitions(${odataKey({ LogicalName: key })})`)
      .select("EntitySetName")
      .get<{ EntitySetName?: string } | undefined>({ signal: controller.signal })
      .then((definition) => {
        if (!definition?.EntitySetName) {
          throw new Error(`EntityDefinitions returned no EntitySetName for '${logicalName}'.`);
        }
        return definition.EntitySetName;
      });
    const settled = (): void => {
      if (this.pendingLookups.get(key) === pending) this.pendingLookups.delete(key);
    };
    const forget = (): void => {
      if (this.entitySetNames.get(key) === lookup) this.entitySetNames.delete(key);
      settled();
    };
    const pending: PendingLookup = {
      waiters: 0,
      cancel: () => {
        // Forget it at once, so a caller arriving before the rejection lands starts a new lookup.
        forget();
        controller.abort();
      },
    };
    // Concurrent callers share one lookup; a failure is forgotten so the next call retries.
    this.entitySetNames.set(key, lookup);
    this.pendingLookups.set(key, pending);
    void lookup.then(settled, forget);
    return lookup;
  }

  /**
   * Sets the entity set name to use for a logical name, so no metadata lookup is made for it.
   *
   * @param logicalName - The table's logical name, e.g. 'new_widget'
   * @param entitySetName - Its entity set name, e.g. 'new_widgets'
   */
  setEntitySetName(logicalName: string, entitySetName: string): void {
    const key = logicalName.toLowerCase();
    this.entitySetNames.set(key, Promise.resolve(entitySetName));
    this.pendingLookups.delete(key);
  }

  /**
   * Creates a new entity record.
   *
   * Without `returnRepresentation` this resolves the new record's id, read from the
   * `OData-EntityId` response header. With it, the request sends
   * `Prefer: return=representation` and resolves the created record.
   *
   * @typeParam T - The created record's type when `returnRepresentation` is true; without one,
   *   {@link EntityRecord}
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param entity - The columns to set: an object literal, or an object of your own record type
   * @param options - Optional creation settings
   * @returns The ID of the created record, or the record when `returnRepresentation` is true
   *
   * @example
   * ```typescript
   * const accountId = await service.create('accounts', {
   *   name: 'Adventure Works',
   *   telephone1: '555-1234'
   * });
   *
   * // With options: resolves the created record (an EntityRecord, or pass a type)
   * const account = await service.create('accounts', {
   *   name: 'Contoso Ltd'
   * }, {
   *   returnRepresentation: true,
   *   select: ['accountid', 'name', 'createdon']
   * });
   * ```
   */
  create(
    entitySetName: string,
    entity: object,
    options?: CreateOptions & { returnRepresentation?: false }
  ): Promise<string>;
  create<T = EntityRecord>(
    entitySetName: string,
    entity: object,
    options: CreateOptions & { returnRepresentation: true }
  ): Promise<T>;
  create<T = EntityRecord>(
    entitySetName: string,
    entity: object,
    options?: CreateOptions
  ): Promise<string | T>;
  async create<T = EntityRecord>(
    entitySetName: string,
    entity: object,
    options?: CreateOptions
  ): Promise<string | T> {
    const builder = this.client.api(`/${entitySetName}`);
    const requestOptions = this.applyWriteOptions(builder, options);

    if (options?.returnRepresentation) {
      const created = await builder.post<T | undefined>(entity, requestOptions);
      return created ?? ({} as T);
    }

    return builder.createAndGetId(entity, requestOptions);
  }

  /**
   * Retrieves an entity record by ID
   *
   * @typeParam T - The record's type; without one, {@link EntityRecord} (each column `unknown`)
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param id - The GUID of the record to retrieve
   * @param options - Optional retrieval settings
   * @returns The entity record
   *
   * @example
   * ```typescript
   * // Basic retrieve: an EntityRecord, whose columns are `unknown`
   * const account = await service.retrieve('accounts', accountId);
   *
   * // With select, typed
   * interface Account { name: string; telephone1: string | null; revenue: number | null }
   * const account = await service.retrieve<Account>('accounts', accountId, {
   *   select: ['name', 'telephone1', 'revenue']
   * });
   *
   * // With expand
   * const account = await service.retrieve('accounts', accountId, {
   *   expand: [{
   *     navigationProperty: 'primarycontactid',
   *     select: ['fullname', 'emailaddress1']
   *   }]
   * });
   * ```
   */
  async retrieve<T = EntityRecord>(
    entitySetName: string,
    id: string,
    options?: RetrieveOptions
  ): Promise<T> {
    const normalizedId = this.normalizeGuid(id);
    const builder = this.client.api(`/${entitySetName}(${normalizedId})`);

    if (options?.select && options.select.length > 0) {
      builder.select(...options.select);
    }
    this.applyExpand(builder, options?.expand);

    return builder.get<T>(this.applyCommonOptions(builder, options));
  }

  /**
   * Updates an existing entity record.
   *
   * Like the C# `IOrganizationService.Update`, this never creates a record: the PATCH carries
   * `If-Match: *` (or `If-Match: <etag>` when `etag` is given), so a missing record rejects with
   * a 404 instead of being created. Use `client.api(...).patch()` for an upsert.
   *
   * @typeParam T - The updated record's type when `returnRepresentation` is true; without one,
   *   {@link EntityRecord}
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param id - The GUID of the record to update
   * @param entity - The columns to change: an object literal, or an object of your own record type
   * @param options - Optional update settings
   * @returns The updated record if returnRepresentation is true, otherwise nothing
   *
   * @example
   * ```typescript
   * // Basic update
   * await service.update('accounts', accountId, {
   *   telephone1: '555-9999'
   * });
   *
   * // With optimistic concurrency
   * await service.update('accounts', accountId, {
   *   revenue: 1000000
   * }, {
   *   etag: account['@odata.etag']
   * });
   *
   * // With return representation
   * const updated = await service.update('accounts', accountId, {
   *   name: 'Updated Name'
   * }, {
   *   returnRepresentation: true,
   *   select: ['name', 'modifiedon']
   * });
   * ```
   */
  update(
    entitySetName: string,
    id: string,
    entity: object,
    options?: UpdateOptions & { returnRepresentation?: false }
  ): Promise<void>;
  update<T = EntityRecord>(
    entitySetName: string,
    id: string,
    entity: object,
    options: UpdateOptions & { returnRepresentation: true }
  ): Promise<T>;
  update<T = EntityRecord>(
    entitySetName: string,
    id: string,
    entity: object,
    options?: UpdateOptions
  ): Promise<T | undefined>;
  async update<T = EntityRecord>(
    entitySetName: string,
    id: string,
    entity: object,
    options?: UpdateOptions
  ): Promise<T | undefined> {
    const normalizedId = this.normalizeGuid(id);
    const builder = this.client.api(`/${entitySetName}(${normalizedId})`);

    // `If-Match: *` makes Dataverse reject the PATCH with 404 when the record doesn't exist,
    // instead of creating it (PATCH is an upsert without it).
    builder.ifMatch(options?.etag ?? "*");
    const requestOptions = this.applyWriteOptions(builder, options);

    const updated = await builder.patch<T | undefined>(entity, requestOptions);
    if (options?.returnRepresentation) {
      return updated ?? ({} as T);
    }
    return undefined;
  }

  /**
   * Deletes an entity record
   *
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param id - The GUID of the record to delete
   * @param options - Optional delete settings
   *
   * @example
   * ```typescript
   * // Basic delete
   * await service.delete('accounts', accountId);
   *
   * // With optimistic concurrency
   * await service.delete('accounts', accountId, {
   *   etag: account['@odata.etag']
   * });
   *
   * // With impersonation
   * await service.delete('accounts', accountId, {
   *   impersonateUserId: userId
   * });
   * ```
   */
  async delete(entitySetName: string, id: string, options?: DeleteOptions): Promise<void> {
    const normalizedId = this.normalizeGuid(id);
    const builder = this.client.api(`/${entitySetName}(${normalizedId})`);

    if (options?.etag) {
      builder.ifMatch(options.etag);
    }

    await builder.delete(this.applyCommonOptions(builder, options));
  }

  /**
   * Retrieves multiple entity records matching a query.
   *
   * This returns one page. When `@odata.nextLink` is set, pass it to
   * `client.api(nextLink).get()` for the next page, or use `client.api(...).iterate()`.
   *
   * @typeParam T - The type of each record; without one, {@link EntityRecord}
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param options - Optional query settings
   * @returns Result containing array of entities and optional pagination info
   *
   * @example
   * ```typescript
   * // Basic query
   * const result = await service.retrieveMultiple('accounts');
   * console.log(result.value); // Array of account records
   *
   * // With filter
   * const result = await service.retrieveMultiple('accounts', {
   *   filter: "revenue gt 1000000",
   *   select: ['name', 'revenue']
   * });
   *
   * // With ordering and paging
   * const result = await service.retrieveMultiple('contacts', {
   *   select: ['fullname', 'emailaddress1'],
   *   orderBy: 'createdon desc',
   *   top: 50,
   *   count: true
   * });
   * console.log(`Total: ${result['@odata.count']}`);
   *
   * // With expand
   * const result = await service.retrieveMultiple('opportunities', {
   *   select: ['name', 'estimatedvalue'],
   *   expand: [{
   *     navigationProperty: 'parentaccountid',
   *     select: ['name', 'accountnumber']
   *   }]
   * });
   * ```
   */
  async retrieveMultiple<T = EntityRecord>(
    entitySetName: string,
    options?: RetrieveMultipleOptions
  ): Promise<RetrieveMultipleResult<T>> {
    const builder = this.client.api(`/${entitySetName}`);

    if (options?.select && options.select.length > 0) {
      builder.select(...options.select);
    }

    if (options?.filter) {
      builder.filter(options.filter);
    }

    if (options?.orderBy) {
      if (Array.isArray(options.orderBy)) {
        builder.orderBy(...options.orderBy);
      } else {
        builder.orderBy(options.orderBy);
      }
    }

    if (options?.top !== undefined) {
      builder.top(options.top);
    }

    if (options?.skip !== undefined) {
      builder.skip(options.skip);
    }

    if (options?.count) {
      builder.count(true);
    }

    this.applyExpand(builder, options?.expand);

    return builder.get<RetrieveMultipleResult<T>>(this.applyCommonOptions(builder, options));
  }

  /**
   * Associates entity records using a collection-valued navigation property
   *
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param id - The GUID of the primary record
   * @param relationship - The collection-valued navigation property name
   * @param relatedEntities - Array of entity references to associate
   * @param options - Optional association settings
   *
   * @example
   * ```typescript
   * // Associate contacts to an account
   * await service.associate('accounts', accountId, 'contact_customer_accounts', [
   *   { logicalName: 'contact', id: contactId1 },
   *   { logicalName: 'contact', id: contactId2 }
   * ]);
   * ```
   */
  async associate(
    entitySetName: string,
    id: string,
    relationship: string,
    relatedEntities: EntityReference[],
    options?: AssociateOptions
  ): Promise<void> {
    const normalizedId = this.normalizeGuid(id);

    // For collection-valued navigation properties (many-to-many or one-to-many)
    // POST to /{entitySetName}({id})/{relationship}/$ref
    for (const related of relatedEntities) {
      const relatedId = this.normalizeGuid(related.id);

      const relatedSetName =
        related.entitySetName ??
        (await this.getEntitySetName(related.logicalName, { signal: options?.signal }));

      const builder = this.client.api(`/${entitySetName}(${normalizedId})/${relationship}/$ref`);

      // Dataverse rejects a relative @odata.id here, so the reference is the absolute URL.
      const body = {
        "@odata.id": `${this.client.getBaseUrl()}/${relatedSetName}(${relatedId})`,
      };

      await builder.post(body, this.applyCommonOptions(builder, options));
    }
  }

  /**
   * Disassociates entity records from a relationship
   *
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param id - The GUID of the primary record
   * @param relationship - The relationship navigation property name
   * @param relatedId - Optional GUID of specific record to disassociate (for collection-valued navigation)
   * @param options - Optional disassociation settings
   *
   * @example
   * ```typescript
   * // Disassociate specific contact from account
   * await service.disassociate('accounts', accountId, 'contact_customer_accounts', contactId);
   *
   * // Clear single-valued navigation (lookup)
   * await service.disassociate('accounts', accountId, 'primarycontactid');
   * ```
   */
  async disassociate(
    entitySetName: string,
    id: string,
    relationship: string,
    relatedId?: string,
    options?: DisassociateOptions
  ): Promise<void> {
    const normalizedId = this.normalizeGuid(id);

    // For collection-valued navigation: DELETE /{entitySetName}({id})/{relationship}({relatedId})/$ref
    // For single-valued navigation: DELETE /{entitySetName}({id})/{relationship}/$ref
    let url: string;

    if (relatedId !== undefined) {
      const normalizedRelatedId = this.normalizeGuid(relatedId);
      url = `/${entitySetName}(${normalizedId})/${relationship}(${normalizedRelatedId})/$ref`;
    } else {
      url = `/${entitySetName}(${normalizedId})/${relationship}/$ref`;
    }

    const builder = this.client.api(url);
    await builder.delete(this.applyCommonOptions(builder, options));
  }

  /**
   * Gets the current user information
   *
   * @param options - Optional settings, such as a `signal` to cancel the request
   * @returns WhoAmI response with user, business unit, and organization IDs
   *
   * @example
   * ```typescript
   * const whoAmI = await service.whoAmI();
   * console.log('User ID:', whoAmI.UserId);
   * console.log('Business Unit:', whoAmI.BusinessUnitId);
   * console.log('Organization:', whoAmI.OrganizationId);
   * ```
   */
  async whoAmI(options?: OperationOptions): Promise<{
    UserId: string;
    BusinessUnitId: string;
    OrganizationId: string;
  }> {
    const builder = this.client.api("/WhoAmI");
    const response = await builder.get<{
      UserId: string;
      BusinessUnitId: string;
      OrganizationId: string;
    }>(signalOptions(options));
    return {
      UserId: response.UserId,
      BusinessUnitId: response.BusinessUnitId,
      OrganizationId: response.OrganizationId,
    };
  }

  /**
   * Assigns a record to a user or team
   *
   * @param entityName - The logical name of the entity (its entity set name is resolved with
   *   {@link getEntitySetName})
   * @param recordId - The ID of the record to assign
   * @param assigneeId - The ID of the user or team to assign to
   * @param assigneeType - The type of assignee ('systemuser' or 'team')
   * @param options - Optional settings, such as a `signal` to cancel the request (and the entity
   *   set name lookups it needs)
   *
   * @example
   * ```typescript
   * await service.assign('account', accountId, userId, 'systemuser');
   * ```
   */
  async assign(
    entityName: string,
    recordId: string,
    assigneeId: string,
    assigneeType: "systemuser" | "team" = "systemuser",
    options?: OperationOptions
  ): Promise<void> {
    const lookupOptions = { signal: options?.signal };
    const entitySetName = await this.getEntitySetName(entityName, lookupOptions);
    const assigneeSetName = await this.getEntitySetName(assigneeType, lookupOptions);
    const normalizedId = this.normalizeGuid(recordId);
    const normalizedAssigneeId = this.normalizeGuid(assigneeId);

    const builder = this.client.api(`/${entitySetName}(${normalizedId})`);
    // `If-Match: *`: a missing record rejects with 404 instead of being created (#272).
    builder.ifMatch("*");
    await builder.patch(
      { [`ownerid@odata.bind`]: `/${assigneeSetName}(${normalizedAssigneeId})` },
      signalOptions(options)
    );
  }

  /**
   * Sets the state and status of a record
   *
   * @param entityName - The logical name of the entity (its entity set name is resolved with
   *   {@link getEntitySetName})
   * @param recordId - The ID of the record
   * @param stateCode - The state code (0 = Active, 1 = Inactive, etc.)
   * @param statusCode - The status code (specific to entity)
   * @param options - Optional settings, such as a `signal` to cancel the request (and the entity
   *   set name lookup it needs)
   *
   * @example
   * ```typescript
   * // Deactivate an account
   * await service.setState('account', accountId, 1, 2);
   * ```
   */
  async setState(
    entityName: string,
    recordId: string,
    stateCode: number,
    statusCode: number,
    options?: OperationOptions
  ): Promise<void> {
    const entitySetName = await this.getEntitySetName(entityName, { signal: options?.signal });
    const normalizedId = this.normalizeGuid(recordId);

    const builder = this.client.api(`/${entitySetName}(${normalizedId})`);
    // `If-Match: *`: a missing record rejects with 404 instead of being created (#272).
    builder.ifMatch("*");
    await builder.patch({ statecode: stateCode, statuscode: statusCode }, signalOptions(options));
  }

  /**
   * Executes a message request
   *
   * The response type comes from the request, as with `client.execute()`: a request that
   * implements `Executable<T>` resolves `T`.
   *
   * @typeParam T - The response type, inferred from the request
   * @param request - The message request to execute (must implement Executable<T> interface)
   * @param options - Optional settings, such as a `signal` to cancel the request
   * @returns The message response
   * @throws Error when `request` has no `toRequestInformation()` and `parseResponse()` methods
   *   (possible only from JavaScript or through a cast)
   *
   * @example
   * ```typescript
   * // A message (C# SDK pattern): the workflow it's bound to, then its parameters
   * import { ExecuteWorkflowRequest } from '@mohsinonxrm/dataverse-sdk-messages';
   *
   * const response = await service.execute(
   *   new ExecuteWorkflowRequest(workflowId, { EntityId: accountId })
   * );
   * // response: ExecuteWorkflowResponse; result is the asyncoperation, or null for a 204
   * console.log(response.result?.asyncoperationid);
   *
   * // Also works with Actions/Functions directly
   * import { WhoAmIFunction } from '@mohsinonxrm/dataverse-sdk-functions';
   *
   * const whoAmI = await service.execute(new WhoAmIFunction()); // WhoAmIResponse
   * console.log(whoAmI.UserId);
   *
   * // Cancellable: aborting the controller rejects with DataverseAbortError
   * await service.execute(new WhoAmIFunction(), { signal: controller.signal });
   * ```
   */
  async execute<T>(request: Executable<T>, options?: OperationOptions): Promise<T> {
    // The type rules out anything else, but a JavaScript caller (or a cast) can still pass an
    // object without the Executable<T> methods: fail with a clear message instead of a TypeError.
    if (this.isExecutable<T>(request)) {
      return await this.client.execute(request, signalOptions(options));
    }

    throw new Error(
      "Request must implement Executable<T> interface with toRequestInformation() and parseResponse() methods. " +
        "Use generated classes from @mohsinonxrm/dataverse-sdk-messages, @mohsinonxrm/dataverse-sdk-actions, or @mohsinonxrm/dataverse-sdk-functions."
    );
  }

  /**
   * Type guard to check if an object implements Executable<T> interface
   */
  private isExecutable<T>(obj: unknown): obj is Executable<T> {
    if (typeof obj !== "object" || obj === null) return false;
    const candidate = obj as { toRequestInformation?: unknown; parseResponse?: unknown };
    return (
      typeof candidate.toRequestInformation === "function" &&
      typeof candidate.parseResponse === "function"
    );
  }

  /**
   * Applies impersonation to the builder and returns the request options carrying the caller's
   * extra headers and signal. Headers must go in `RequestOptions.headers`: the builder's
   * terminals take `RequestOptions`, not a header map.
   */
  private applyCommonOptions(
    builder: DataverseRequestBuilder,
    options: CommonOptions | undefined
  ): RequestOptions | undefined {
    if (options?.impersonateUserId) {
      builder.impersonate(options.impersonateUserId);
    }
    const requestOptions: RequestOptions = {};
    if (options?.headers) requestOptions.headers = { ...options.headers };
    if (options?.signal) requestOptions.signal = options.signal;
    return requestOptions.headers || requestOptions.signal ? requestOptions : undefined;
  }

  /** {@link applyCommonOptions} plus `Prefer: return=representation` and duplicate detection. */
  private applyWriteOptions(
    builder: DataverseRequestBuilder,
    options: WriteOptions | undefined
  ): RequestOptions | undefined {
    if (options?.returnRepresentation) {
      builder.prefer(Prefer.returnRepresentation());
      if (options.select && options.select.length > 0) {
        builder.select(...options.select);
      }
    }

    // Dataverse's Web API skips duplicate detection unless the request asks for it, so
    // suppression is the default and only "detect" needs a header.
    if (options?.detectDuplicates || options?.suppressDuplicateDetection === false) {
      builder.detectDuplicates();
    }

    return this.applyCommonOptions(builder, options);
  }

  /**
   * Adds `$expand` from a raw string or a list of expand options. The builder's `expand()`
   * joins its arguments, and the entries of earlier calls, into one `$expand`.
   */
  private applyExpand(
    builder: DataverseRequestBuilder,
    expand: string | ExpandOption[] | undefined
  ): void {
    if (!expand) return;
    if (typeof expand === "string") {
      builder.expand(expand);
      return;
    }
    const parts = expand.map((exp) => {
      const nested: string[] = [];
      if (exp.select && exp.select.length > 0) nested.push(`$select=${exp.select.join(",")}`);
      if (exp.filter) nested.push(`$filter=${exp.filter}`);
      if (exp.orderBy) nested.push(`$orderby=${exp.orderBy}`);
      if (exp.top !== undefined) nested.push(`$top=${String(exp.top)}`);
      return nested.length > 0
        ? `${exp.navigationProperty}(${nested.join(";")})`
        : exp.navigationProperty;
    });
    if (parts.length > 0) {
      builder.expand(...parts);
    }
  }

  /**
   * Validates a GUID (braces optional) and returns it lowercase without braces. A malformed id
   * throws `DataverseInvalidRequestError` instead of building a broken URL.
   *
   * @param guid - The GUID string to normalize
   * @returns Normalized GUID without braces
   */
  private normalizeGuid(guid: string): string {
    return odataLiteral.guid(guid).toLowerCase();
  }
}
