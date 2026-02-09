/**
 * Entity reference type for Dataverse Web API.
 * Used in bound functions and entity lookups.
 */
export interface EntityReference {
  "@odata.type": string;
  id: string;
  logicalName?: string;
  name?: string;
}

/**
 * Convert entity logical name to entity set name (pluralization).
 * Handles common Dataverse entity pluralization rules.
 */
function getEntitySetName(entityLogicalName: string): string {
  // Common irregular plurals in Dataverse
  const irregularPlurals: Record<string, string> = {
    opportunity: "opportunities",
    territory: "territories",
    currency: "currencies",
    activity: "activities",
    businessunit: "businessunits",
    systemuser: "systemusers",
    usersettingscollection: "usersettingscollection",
    principalobjectaccess: "principalobjectaccessset",
  };

  const lowerName = entityLogicalName.toLowerCase();

  // Check for irregular plurals
  if (irregularPlurals[lowerName]) {
    return irregularPlurals[lowerName];
  }

  // Handle entities ending in 'y' (e.g., opportunity -> opportunities)
  if (
    lowerName.endsWith("y") &&
    lowerName.length > 1 &&
    !"aeiou".includes(lowerName[lowerName.length - 2])
  ) {
    return lowerName.slice(0, -1) + "ies";
  }

  // Handle entities ending in 's', 'x', 'z', 'ch', 'sh' (add 'es')
  if (
    lowerName.endsWith("s") ||
    lowerName.endsWith("x") ||
    lowerName.endsWith("z") ||
    lowerName.endsWith("ch") ||
    lowerName.endsWith("sh")
  ) {
    return lowerName + "es";
  }

  // Default: add 's'
  return lowerName + "s";
}

/**
 * Create an EntityReference object.
 *
 * @param entityType - Logical entity name (e.g., "account", "contact")
 * @param id - Entity GUID
 * @param name - Optional entity name
 * @returns EntityReference object
 *
 * @example
 * const ref = createEntityReference("account", "abc-123", "Contoso");
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

/**
 * Get the entity set name for an EntityReference.
 * Uses smart pluralization logic.
 *
 * @param entityRef - The EntityReference object
 * @returns The entity set name (e.g., "accounts", "opportunities")
 *
 * @example
 * const ref = createEntityReference("account", "abc-123");
 * const entitySet = getEntitySetNameFromReference(ref); // "accounts"
 */
export function getEntitySetNameFromReference(entityRef: EntityReference): string {
  return getEntitySetName(entityRef.logicalName || "");
}
