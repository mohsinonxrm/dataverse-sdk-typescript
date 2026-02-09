/**
 * EntityReference type for referencing Dataverse entities.
 *
 * Compatible with:
 * - Web API actions/functions (as binding parameters or request body)
 * - OrganizationService.Execute messages
 * - Raw API calls via client.api()
 *
 * @example
 * // Simple reference
 * const ref: EntityReference = {
 *   "@odata.type": "Microsoft.Dynamics.CRM.account",
 *   id: "00000000-0000-0000-0000-000000000000"
 * };
 *
 * @example
 * // With optional name
 * const ref: EntityReference = {
 *   "@odata.type": "Microsoft.Dynamics.CRM.contact",
 *   id: "123",
 *   name: "John Doe"
 * };
 */
export interface EntityReference {
  /**
   * The OData type annotation specifying the entity type.
   * Format: "Microsoft.Dynamics.CRM.{entityname}"
   */
  "@odata.type": string;

  /**
   * The unique identifier (GUID) of the referenced entity.
   */
  id: string;

  /**
   * Optional logical name of the entity (for backwards compatibility with SDK messages).
   */
  logicalName?: string;

  /**
   * Optional name or primary field value (for display purposes).
   */
  name?: string;
}

/**
 * Utility to create an EntityReference.
 *
 * @param entityType - Logical name of the entity (e.g., "account", "contact")
 * @param id - GUID of the entity
 * @param name - Optional display name
 * @returns EntityReference object
 *
 * @example
 * const accountRef = createEntityReference("account", "abc-123");
 * const contactRef = createEntityReference("contact", "def-456", "John Doe");
 */
export function createEntityReference(
  entityType: string,
  id: string,
  name?: string
): EntityReference {
  return {
    "@odata.type": `Microsoft.Dynamics.CRM.${entityType}`,
    id,
    logicalName: entityType,
    ...(name && { name }),
  };
}
