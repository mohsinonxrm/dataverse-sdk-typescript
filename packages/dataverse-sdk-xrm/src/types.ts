/**
 * @fileoverview Core types for OrganizationService operations
 */

/**
 * A record as the Web API returns it: its columns, and annotations such as
 * `_parentaccountid_value@OData.Community.Display.V1.FormattedValue`, by name.
 *
 * `retrieve()`, `retrieveMultiple()`, and `create()`/`update()` with `returnRepresentation`
 * resolve this type unless you pass your own, e.g. `service.retrieve<Account>(…)`. Each column
 * is `unknown`, so narrow it (or pass a type) before using it.
 *
 * @example
 * ```typescript
 * const account = await service.retrieve('accounts', id, { select: ['name'] });
 * const name = typeof account.name === 'string' ? account.name : '';
 * await service.update('accounts', id, { name: 'New name' }, { etag: account['@odata.etag'] });
 * ```
 */
export interface EntityRecord {
  /** The record's version, for optimistic concurrency (`UpdateOptions.etag`, `DeleteOptions.etag`). */
  "@odata.etag"?: string;
  /** The metadata URL of the response. */
  "@odata.context"?: string;
  /** A column or an annotation. */
  [property: string]: unknown;
}

/**
 * Options every OrganizationService method takes.
 */
export interface OperationOptions {
  /**
   * Cancels the operation: the request in flight (and any request the operation has not sent
   * yet) is aborted, and the call rejects with the core `DataverseAbortError`, whose `name` is
   * `"AbortError"`. A signal that is already aborted rejects without sending anything.
   */
  signal?: AbortSignal;
}

/**
 * Options for the OrganizationService constructor
 */
export interface OrganizationServiceOptions {
  /**
   * Entity set names by logical name, e.g. `{ new_widget: "new_widgets" }`. These are used
   * without a metadata lookup; other logical names are looked up once and cached.
   */
  entitySetNames?: Record<string, string>;
}

/**
 * One navigation property to expand, with its nested query options. Becomes
 * `navigationProperty($select=…;$filter=…;$orderby=…;$top=…)` in `$expand`.
 */
export interface ExpandOption {
  /**
   * Navigation property name (e.g. 'primarycontactid', 'contact_customer_accounts')
   */
  navigationProperty: string;

  /**
   * Specific fields to select from the expanded entity
   */
  select?: string[];

  /**
   * Filter for the expanded entity (collection-valued navigation properties only)
   */
  filter?: string;

  /**
   * OrderBy for the expanded entity (collection-valued navigation properties only)
   */
  orderBy?: string;

  /**
   * Top for the expanded entity (collection-valued navigation properties only)
   */
  top?: number;
}

/**
 * Options for create operations
 */
export interface CreateOptions extends OperationOptions {
  /**
   * Return the created entity in the response
   * Sets Prefer: return=representation header
   */
  returnRepresentation?: boolean;

  /**
   * Specific fields to return when returnRepresentation is true
   */
  select?: string[];

  /**
   * Run duplicate detection rules for this request: sends `MSCRM.SuppressDuplicateDetection: false`,
   * and a duplicate rejects with `DataverseDuplicateError` (412). The Web API skips duplicate
   * detection by default, so leave this off to skip it.
   */
  detectDuplicates?: boolean;

  /**
   * The Web API skips duplicate detection by default, so `true` (or leaving it out) changes
   * nothing. `false` runs duplicate detection, the same as `detectDuplicates: true`.
   */
  suppressDuplicateDetection?: boolean;

  /**
   * User ID to impersonate for this operation
   * Sets MSCRMCallerID header
   */
  impersonateUserId?: string;

  /**
   * Additional custom headers
   */
  headers?: Record<string, string>;
}

/**
 * Options for retrieve operations
 */
export interface RetrieveOptions extends OperationOptions {
  /**
   * Specific columns/attributes to retrieve
   */
  select?: string[];

  /**
   * Related entities to expand: a raw `$expand` value, or a list of {@link ExpandOption}s that
   * are combined into one `$expand`
   */
  expand?: string | ExpandOption[];

  /**
   * User ID to impersonate for this operation
   * Sets MSCRMCallerID header
   */
  impersonateUserId?: string;

  /**
   * Additional custom headers
   */
  headers?: Record<string, string>;
}

/**
 * Options for update operations
 */
export interface UpdateOptions extends OperationOptions {
  /**
   * ETag value for optimistic concurrency, sent as `If-Match`. Without it, `If-Match: *` is sent,
   * so the update fails with 404 instead of creating a missing record.
   */
  etag?: string;

  /**
   * Return the updated entity in the response
   * Sets Prefer: return=representation header
   */
  returnRepresentation?: boolean;

  /**
   * Specific fields to return when returnRepresentation is true
   */
  select?: string[];

  /**
   * Run duplicate detection rules for this request: sends `MSCRM.SuppressDuplicateDetection: false`,
   * and a duplicate rejects with `DataverseDuplicateError` (412). The Web API skips duplicate
   * detection by default, so leave this off to skip it.
   */
  detectDuplicates?: boolean;

  /**
   * The Web API skips duplicate detection by default, so `true` (or leaving it out) changes
   * nothing. `false` runs duplicate detection, the same as `detectDuplicates: true`.
   */
  suppressDuplicateDetection?: boolean;

  /**
   * User ID to impersonate for this operation
   * Sets MSCRMCallerID header
   */
  impersonateUserId?: string;

  /**
   * Additional custom headers
   */
  headers?: Record<string, string>;
}

/**
 * Options for delete operations
 */
export interface DeleteOptions extends OperationOptions {
  /**
   * ETag value for optimistic concurrency
   * Sets If-Match header
   */
  etag?: string;

  /**
   * User ID to impersonate for this operation
   * Sets MSCRMCallerID header
   */
  impersonateUserId?: string;

  /**
   * Additional custom headers
   */
  headers?: Record<string, string>;
}

/**
 * Options for associate operations
 */
export interface AssociateOptions extends OperationOptions {
  /**
   * User ID to impersonate for this operation
   * Sets MSCRMCallerID header
   */
  impersonateUserId?: string;

  /**
   * Additional custom headers
   */
  headers?: Record<string, string>;
}

/**
 * Options for disassociate operations
 */
export interface DisassociateOptions extends OperationOptions {
  /**
   * User ID to impersonate for this operation
   * Sets MSCRMCallerID header
   */
  impersonateUserId?: string;

  /**
   * Additional custom headers
   */
  headers?: Record<string, string>;
}

/**
 * Options for retrieveMultiple operations
 */
export interface RetrieveMultipleOptions extends OperationOptions {
  /**
   * Specific columns/attributes to retrieve
   */
  select?: string[];

  /**
   * Filter expression (OData format)
   */
  filter?: string;

  /**
   * OrderBy expression
   */
  orderBy?: string | string[];

  /**
   * Maximum number of records to retrieve
   */
  top?: number;

  /**
   * Records per page (`Prefer: odata.maxpagesize`, at most 5,000). Dataverse has no `$skip`:
   * page with the result's `@odata.nextLink` instead, passing the same `maxPageSize`.
   */
  maxPageSize?: number;

  /**
   * Include count of total matching records
   */
  count?: boolean;

  /**
   * Related entities to expand: a raw `$expand` value, or a list of {@link ExpandOption}s that
   * are combined into one `$expand`
   */
  expand?: string | ExpandOption[];

  /**
   * User ID to impersonate for this operation
   * Sets MSCRMCallerID header
   */
  impersonateUserId?: string;

  /**
   * Additional custom headers
   */
  headers?: Record<string, string>;
}

/**
 * Result from retrieveMultiple operation. `T` is the record type: {@link EntityRecord} unless
 * you pass your own.
 */
export interface RetrieveMultipleResult<T = EntityRecord> {
  /**
   * Array of retrieved entities
   */
  value: T[];

  /**
   * Total count of matching records (if count option was true)
   */
  "@odata.count"?: number;

  /**
   * Link to next page of results (if more results available)
   */
  "@odata.nextLink"?: string;
}
