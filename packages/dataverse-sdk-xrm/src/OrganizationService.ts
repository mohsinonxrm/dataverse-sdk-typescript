/**
 * @fileoverview OrganizationService class providing C#-familiar CRUD operations for Dataverse
 */

import { Prefer } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  DataverseClient,
  DataverseRequestBuilder,
  Executable,
  RequestOptions,
} from "@mohsinonxrm/dataverse-sdk-core";
import type {
  EntityReference,
  ExpandOption,
  CreateOptions,
  RetrieveOptions,
  RetrieveMultipleOptions,
  RetrieveMultipleResult,
  UpdateOptions,
  DeleteOptions,
  AssociateOptions,
  DisassociateOptions,
} from "./types.js";

/** Options every OrganizationService operation shares. */
interface CommonOptions {
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

/**
 * OrganizationService provides a C#-familiar interface for Dataverse operations.
 *
 * Every method goes through the client's request builder, so auth, retry, throttling and error
 * mapping apply as they do for `client.api()`. Failed requests reject with the core error types
 * (`DataverseError` and its subclasses).
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

  /**
   * Creates a new OrganizationService instance
   *
   * @param client - The DataverseClient instance to use for operations
   */
  constructor(client: DataverseClient) {
    this.client = client;
  }

  /**
   * Creates a new entity record.
   *
   * Without `returnRepresentation` this resolves the new record's id, read from the
   * `OData-EntityId` response header. With it, the request sends
   * `Prefer: return=representation` and resolves the created record.
   *
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param entity - The entity data to create
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
   * // With options
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entity: Record<string, any>,
    options?: CreateOptions & { returnRepresentation?: false }
  ): Promise<string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create<T = any>(
    entitySetName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entity: Record<string, any>,
    options: CreateOptions & { returnRepresentation: true }
  ): Promise<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create<T = any>(
    entitySetName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entity: Record<string, any>,
    options?: CreateOptions
  ): Promise<string | T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create<T = any>(
    entitySetName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entity: Record<string, any>,
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
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param id - The GUID of the record to retrieve
   * @param options - Optional retrieval settings
   * @returns The entity record
   *
   * @example
   * ```typescript
   * // Basic retrieve
   * const account = await service.retrieve('accounts', accountId);
   *
   * // With select
   * const account = await service.retrieve('accounts', accountId, {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async retrieve<T = any>(
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
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param id - The GUID of the record to update
   * @param entity - The entity data to update
   * @param options - Optional update settings
   * @returns The updated entity if returnRepresentation is true, otherwise void
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update<T = any>(
    entitySetName: string,
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entity: Record<string, any>,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async retrieveMultiple<T = any>(
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

      // Determine the related entity set name from logicalName
      const relatedSetName = this.getEntitySetName(related.logicalName);

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

    if (relatedId) {
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
  async whoAmI(): Promise<{
    UserId: string;
    BusinessUnitId: string;
    OrganizationId: string;
  }> {
    const builder = this.client.api("/WhoAmI");
    const response = await builder.get<{
      UserId: string;
      BusinessUnitId: string;
      OrganizationId: string;
    }>();
    return {
      UserId: response.UserId,
      BusinessUnitId: response.BusinessUnitId,
      OrganizationId: response.OrganizationId,
    };
  }

  /**
   * Assigns a record to a user or team
   *
   * @param entityName - The logical name of the entity
   * @param recordId - The ID of the record to assign
   * @param assigneeId - The ID of the user or team to assign to
   * @param assigneeType - The type of assignee ('systemuser' or 'team')
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
    assigneeType: "systemuser" | "team" = "systemuser"
  ): Promise<void> {
    const entitySetName = this.getEntitySetName(entityName);
    const normalizedId = this.normalizeGuid(recordId);
    const normalizedAssigneeId = this.normalizeGuid(assigneeId);

    const builder = this.client.api(`/${entitySetName}(${normalizedId})`);
    await builder.patch({
      [`ownerid@odata.bind`]: `/${this.getEntitySetName(assigneeType)}(${normalizedAssigneeId})`,
    });
  }

  /**
   * Sets the state and status of a record
   *
   * @param entityName - The logical name of the entity
   * @param recordId - The ID of the record
   * @param stateCode - The state code (0 = Active, 1 = Inactive, etc.)
   * @param statusCode - The status code (specific to entity)
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
    statusCode: number
  ): Promise<void> {
    const entitySetName = this.getEntitySetName(entityName);
    const normalizedId = this.normalizeGuid(recordId);

    const builder = this.client.api(`/${entitySetName}(${normalizedId})`);
    await builder.patch({
      statecode: stateCode,
      statuscode: statusCode,
    });
  }

  /**
   * Executes a message request
   *
   * @param request - The message request to execute (must implement Executable<T> interface)
   * @returns The message response
   *
   * @example
   * ```typescript
   * // Using Messages (C# SDK pattern)
   * import { WhoAmIRequest } from '@mohsinonxrm/dataverse-sdk-messages';
   *
   * const response = await service.execute(new WhoAmIRequest());
   *
   * // Also works with Actions/Functions directly
   * import { WhoAmIFunction } from '@mohsinonxrm/dataverse-sdk-functions';
   *
   * const whoAmI = await service.execute(new WhoAmIFunction());
   * ```
   */
  async execute<TResponse>(request: unknown): Promise<TResponse> {
    // Check if request implements Executable<T> interface (has toRequestInformation and parseResponse)
    if (this.isExecutable<TResponse>(request)) {
      return await this.client.execute(request);
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
   * extra headers. Headers must go in `RequestOptions.headers`: the builder's terminals take
   * `RequestOptions`, not a header map.
   */
  private applyCommonOptions(
    builder: DataverseRequestBuilder,
    options: CommonOptions | undefined
  ): RequestOptions | undefined {
    if (options?.impersonateUserId) {
      builder.impersonate(options.impersonateUserId);
    }
    return options?.headers ? { headers: { ...options.headers } } : undefined;
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
   * Sets `$expand` from a raw string or a list of expand options. All entries go into one
   * `$expand` (the builder's `expand()` replaces the previous value, so it is called once).
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
   * Normalizes a GUID string (removes braces/hyphens if needed)
   *
   * @param guid - The GUID string to normalize
   * @returns Normalized GUID without braces
   */
  private normalizeGuid(guid: string): string {
    // Remove braces if present
    let normalized = guid.replace(/[{}]/g, "");

    // GUIDs should be lowercase for consistency
    normalized = normalized.toLowerCase();

    return normalized;
  }

  /**
   * Gets the entity set name from a logical name
   * Simple pluralization - this should be enhanced or use metadata in the future
   *
   * @param logicalName - The entity logical name
   * @returns The entity set name
   */
  private getEntitySetName(logicalName: string): string {
    // Very basic pluralization - in real implementation this should use metadata
    // For now, just append 's' if it doesn't end with 's'
    // Common cases handled explicitly
    const pluralMap: Record<string, string> = {
      account: "accounts",
      contact: "contacts",
      opportunity: "opportunities",
      lead: "leads",
      systemuser: "systemusers",
      team: "teams",
      businessunit: "businessunits",
      organization: "organizations",
      incident: "incidents",
      task: "tasks",
      appointment: "appointments",
      email: "emails",
      phonecall: "phonecalls",
      letter: "letters",
      fax: "faxes",
      activityparty: "activityparties",
      annotation: "annotations",
      attachment: "attachments",
    };

    return pluralMap[logicalName.toLowerCase()] || `${logicalName}s`;
  }
}
