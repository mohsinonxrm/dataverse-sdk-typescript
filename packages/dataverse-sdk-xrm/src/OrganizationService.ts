/**
 * @fileoverview OrganizationService class providing C#-familiar CRUD operations for Dataverse
 */

import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  EntityReference,
  CreateOptions,
  RetrieveOptions,
  RetrieveMultipleOptions,
  RetrieveMultipleResult,
  UpdateOptions,
  DeleteOptions,
  AssociateOptions,
  DisassociateOptions,
} from "./types.js";

/**
 * OrganizationService provides a C#-familiar interface for Dataverse operations
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
 * // Update
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
   * Creates a new entity record
   *
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param entity - The entity data to create
   * @param options - Optional creation settings
   * @returns The ID of the created record
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create<T = any>(
    entitySetName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entity: Record<string, any>,
    options?: CreateOptions
  ): Promise<string | T> {
    const builder = this.client.api(`/${entitySetName}`);

    // Build headers
    const headers: Record<string, string> = { ...options?.headers };

    if (options?.returnRepresentation) {
      headers.Prefer = "return=representation";

      if (options.select && options.select.length > 0) {
        builder.select(...options.select);
      }
    }

    if (options?.suppressDuplicateDetection) {
      headers["MSCRM.SuppressDuplicateDetection"] = "true";
    }

    if (options?.impersonateUserId) {
      headers.MSCRMCallerID = options.impersonateUserId;
    }

    const response: Response = await builder.post(entity, headers);

    // If returnRepresentation, parse and return the entity
    if (options?.returnRepresentation) {
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    }

    // Extract ID from OData-EntityId header
    const entityIdHeader = response.headers.get("OData-EntityId");
    if (!entityIdHeader) {
      throw new Error("No OData-EntityId header in create response");
    }

    // Extract GUID from URL: https://org.crm.dynamics.com/api/data/v9.2/accounts(guid)
    const regex = /\(([0-9a-f-]{36})\)/i;
    const match = regex.exec(entityIdHeader);
    if (!match) {
      throw new Error(`Could not extract ID from OData-EntityId: ${entityIdHeader}`);
    }

    return match[1];
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

    // Apply select
    if (options?.select && options.select.length > 0) {
      builder.select(...options.select);
    }

    // Apply expand
    if (options?.expand) {
      if (typeof options.expand === "string") {
        builder.expand(options.expand);
      } else {
        for (const exp of options.expand) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const expandOptions: any = {};

          if (exp.select && exp.select.length > 0) {
            expandOptions.select = exp.select;
          }

          if (exp.filter) {
            expandOptions.filter = exp.filter;
          }

          if (exp.orderBy) {
            expandOptions.orderBy = exp.orderBy;
          }

          if (exp.top !== undefined) {
            expandOptions.top = exp.top;
          }

          builder.expand(exp.navigationProperty, expandOptions);
        }
      }
    }

    // Build headers
    const headers: Record<string, string> = { ...options?.headers };

    if (options?.impersonateUserId) {
      headers.MSCRMCallerID = options.impersonateUserId;
    }

    const response: Response = await builder.get(headers);
    const text = await response.text();
    return JSON.parse(text);
  }

  /**
   * Updates an entity record
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

    // Build headers
    const headers: Record<string, string> = { ...options?.headers };

    if (options?.etag) {
      headers["If-Match"] = options.etag;
    }

    if (options?.returnRepresentation) {
      headers.Prefer = "return=representation";

      if (options.select && options.select.length > 0) {
        builder.select(...options.select);
      }
    }

    if (options?.suppressDuplicateDetection) {
      headers["MSCRM.SuppressDuplicateDetection"] = "true";
    }

    if (options?.impersonateUserId) {
      headers.MSCRMCallerID = options.impersonateUserId;
    }

    const response: Response = await builder.patch(entity, headers);

    // If returnRepresentation, parse and return the entity
    if (options?.returnRepresentation) {
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    }
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

    // Build headers
    const headers: Record<string, string> = { ...options?.headers };

    if (options?.etag) {
      headers["If-Match"] = options.etag;
    }

    if (options?.impersonateUserId) {
      headers.MSCRMCallerID = options.impersonateUserId;
    }

    await builder.delete(headers);
  }

  /**
   * Retrieves multiple entity records matching a query
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

    // Apply select
    if (options?.select && options.select.length > 0) {
      builder.select(...options.select);
    }

    // Apply filter
    if (options?.filter) {
      builder.filter(options.filter);
    }

    // Apply orderBy
    if (options?.orderBy) {
      if (Array.isArray(options.orderBy)) {
        builder.orderBy(...options.orderBy);
      } else {
        builder.orderBy(options.orderBy);
      }
    }

    // Apply top
    if (options?.top !== undefined) {
      builder.top(options.top);
    }

    // Apply skip
    if (options?.skip !== undefined) {
      builder.skip(options.skip);
    }

    // Apply count
    if (options?.count) {
      builder.count(true);
    }

    // Apply expand
    if (options?.expand) {
      if (typeof options.expand === "string") {
        builder.expand(options.expand);
      } else {
        for (const exp of options.expand) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const expandOptions: any = {};

          if (exp.select && exp.select.length > 0) {
            expandOptions.select = exp.select;
          }

          if (exp.filter) {
            expandOptions.filter = exp.filter;
          }

          if (exp.orderBy) {
            expandOptions.orderBy = exp.orderBy;
          }

          if (exp.top !== undefined) {
            expandOptions.top = exp.top;
          }

          builder.expand(exp.navigationProperty, expandOptions);
        }
      }
    }

    // Build headers
    const headers: Record<string, string> = { ...options?.headers };

    if (options?.impersonateUserId) {
      headers.MSCRMCallerID = options.impersonateUserId;
    }

    const response: Response = await builder.get(headers);
    const text = await response.text();
    return JSON.parse(text);
  }

  /**
   * Associates entity records using a relationship
   *
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param id - The GUID of the primary record
   * @param relationship - The relationship navigation property name
   * @param relatedEntities - Array of entity references to associate
   * @param options - Optional association settings
   *
   * @example
   * ```typescript
   * // Associate contacts to an account
   * await service.associate('accounts', accountId, 'contact_customer_accounts', [
   *   { logicalName: 'contacts', id: contactId1 },
   *   { logicalName: 'contacts', id: contactId2 }
   * ]);
   *
   * // Associate single record
   * await service.associate('opportunities', opportunityId, 'parentaccountid', [
   *   { logicalName: 'accounts', id: accountId }
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

    // Build headers
    const headers: Record<string, string> = { ...options?.headers };

    if (options?.impersonateUserId) {
      headers.MSCRMCallerID = options.impersonateUserId;
    }

    // For collection-valued navigation properties (many-to-many or one-to-many)
    // POST to /{entitySetName}({id})/{relationship}/$ref
    for (const related of relatedEntities) {
      const relatedId = this.normalizeGuid(related.id);

      // Determine the related entity set name from logicalName
      const relatedSetName = this.getEntitySetName(related.logicalName);

      const builder = this.client.api(`/${entitySetName}(${normalizedId})/${relationship}/$ref`);

      const body = {
        "@odata.id": `${relatedSetName}(${relatedId})`,
      };

      await builder.post(body, headers);
    }
  }

  /**
   * Disassociates entity records from a relationship
   *
   * @param entitySetName - The entity set name (plural, e.g., 'accounts', 'contacts')
   * @param id - The GUID of the primary record
   * @param relationship - The relationship navigation property name
   * @param relatedId - Optional GUID of specific record to disassociate (for single-valued navigation)
   * @param options - Optional disassociation settings
   *
   * @example
   * ```typescript
   * // Disassociate specific contact from account
   * await service.disassociate('accounts', accountId, 'contact_customer_accounts', contactId);
   *
   * // Clear single-valued navigation (lookup)
   * await service.disassociate('opportunities', opportunityId, 'parentaccountid');
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

    // Build headers
    const headers: Record<string, string> = { ...options?.headers };

    if (options?.impersonateUserId) {
      headers.MSCRMCallerID = options.impersonateUserId;
    }

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
    await builder.delete(headers);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = (await builder.get()) as any;
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
   * import { ExecuteWorkflowRequest } from '@mohsinonxrm/dataverse-sdk-messages';
   *
   * const request = new ExecuteWorkflowRequest(workflowId, entityId);
   * const response = await service.execute(request);
   *
   * // Also works with Actions/Functions directly
   * import { WhoAmIFunction } from '@mohsinonxrm/dataverse-sdk-functions';
   *
   * const whoAmI = await service.execute(new WhoAmIFunction());
   * ```
   */
  async execute<TResponse>(request: unknown): Promise<TResponse> {
    // Check if request implements Executable<T> interface (has toRequestInformation and parseResponse)

    if (this.isExecutable(request)) {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isExecutable(obj: any): obj is {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toRequestInformation: (baseUrl: string) => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseResponse: (response: Response) => Promise<any>;
  } {
    return (
      obj &&
      typeof obj.toRequestInformation === "function" &&
      typeof obj.parseResponse === "function"
    );
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
