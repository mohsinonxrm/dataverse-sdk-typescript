/**
 * @fileoverview Core types for OrganizationService operations
 */

/**
 * Represents a reference to an entity record
 */
export interface EntityReference {
  /**
   * The logical name of the entity (e.g., 'account', 'contact')
   */
  logicalName: string;

  /**
   * The GUID identifier of the record
   */
  id: string;

  /**
   * Optional name/display value of the referenced entity
   */
  name?: string;
}

/**
 * Options for create operations
 */
export interface CreateOptions {
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
   * Suppress duplicate detection rules
   * Sets MSCRM.SuppressDuplicateDetection header
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
export interface RetrieveOptions {
  /**
   * Specific columns/attributes to retrieve
   */
  select?: string[];

  /**
   * Related entities to expand
   */
  expand?:
    | string
    | Array<{
        /**
         * Navigation property name
         */
        navigationProperty: string;

        /**
         * Specific fields to select from the expanded entity
         */
        select?: string[];

        /**
         * Filter for the expanded entity
         */
        filter?: string;

        /**
         * OrderBy for the expanded entity
         */
        orderBy?: string;

        /**
         * Top for the expanded entity
         */
        top?: number;
      }>;

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
export interface UpdateOptions {
  /**
   * ETag value for optimistic concurrency
   * Sets If-Match header
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
   * Suppress duplicate detection rules
   * Sets MSCRM.SuppressDuplicateDetection header
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
export interface DeleteOptions {
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
export interface AssociateOptions {
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
export interface DisassociateOptions {
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
export interface RetrieveMultipleOptions {
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
   * Number of records to skip (for paging)
   */
  skip?: number;

  /**
   * Include count of total matching records
   */
  count?: boolean;

  /**
   * Related entities to expand
   */
  expand?:
    | string
    | Array<{
        navigationProperty: string;
        select?: string[];
        filter?: string;
        orderBy?: string;
        top?: number;
      }>;

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
 * Result from retrieveMultiple operation
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RetrieveMultipleResult<T = any> {
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
