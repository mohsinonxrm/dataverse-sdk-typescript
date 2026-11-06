/**
 * URL segments for bound operations.
 *
 * An operation bound to an entity collection is called on the entity set:
 * `POST /{entityset}/Microsoft.Dynamics.CRM.{Name}` (#69). When the collection is of a concrete
 * entity type the set comes from the CSDL `EntityContainer`. The bulk messages (`CreateMultiple`,
 * `UpdateMultiple`, …) are bound to `Collection(mscrm.crmbaseentity)` and work on any table, so the
 * caller passes the entity set name.
 */
import type { CsdlSchema } from "../parsers/csdl-types.js";
import { SYSTEM_ENTITIES } from "./polymorphism.js";
import { extractEntityTypeName, getEntitySetName } from "./typescript-writer.js";

/** Constructor parameter that carries the entity set of a `Collection(mscrm.crmbaseentity)` binding. */
export const ENTITY_SET_PARAM = "entitySetName";

export interface CollectionBinding {
  /** True when the caller supplies the entity set (`Collection(mscrm.crmbaseentity)`). */
  needsEntitySetName: boolean;
  /** Code for the URL path segment, for use inside a template literal after `${baseUrl}/`. */
  segment: string;
  /** Set when the entity set isn't in the CSDL and a guessed `<type>s` is used. */
  warning?: string;
}

/** How to address the entity set an operation bound to `bindingType` (a `Collection(...)`) runs on. */
export function collectionBinding(csdl: CsdlSchema, bindingType: string): CollectionBinding {
  const typeName = extractEntityTypeName(bindingType);
  if (SYSTEM_ENTITIES.includes(typeName.toLowerCase())) {
    return { needsEntitySetName: true, segment: `\${this.${ENTITY_SET_PARAM}}` };
  }
  const entitySet = getEntitySetName(bindingType, csdl.entitySetMap);
  if (entitySet) return { needsEntitySetName: false, segment: entitySet };
  return {
    needsEntitySetName: false,
    segment: `${typeName}s`,
    warning: "WARNING: Entity set not found in metadata, using entity type name as fallback",
  };
}
