/**
 * URL segments for bound operations.
 *
 * An operation bound to an entity collection is called on the entity set:
 * `POST /{entityset}/Microsoft.Dynamics.CRM.{Name}` (#69). When the collection is of a concrete
 * entity type the set comes from the CSDL `EntityContainer`. The bulk messages (`CreateMultiple`,
 * `UpdateMultiple`, …) are bound to `Collection(mscrm.crmbaseentity)` and work on any table, so the
 * caller passes the entity set name.
 *
 * An operation bound to one record is called on that record: `/{entityset}({id})/...`. The id
 * goes through core's `odataLiteral.guid()`, as dataverse-gen's `formatParameterAlias(id,
 * "Edm.Guid")` does (#386): `{GUID}` (as Xrm returns ids) loses its braces, and anything that isn't
 * a GUID throws instead of putting other text into the URL.
 */
import type { CsdlSchema } from "../parsers/csdl-types.js";
import { SYSTEM_ENTITIES } from "./polymorphism.js";
import { extractEntityTypeName, getEntitySetName, isCollectionType } from "./typescript-writer.js";

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

/** Whether an operation is bound to one record (not to an entity collection). */
export function isRecordBound(op: {
  isBound: boolean;
  bindingParameter?: { type: string } | undefined;
}): boolean {
  return (
    op.isBound && op.bindingParameter !== undefined && !isCollectionType(op.bindingParameter.type)
  );
}

/**
 * The core import of a generated operation file: `odataLiteral` too when the operation is bound to
 * one record, for `recordSegment`.
 */
export function coreImport(recordBound: boolean): string {
  return recordBound
    ? `import { odataLiteral, type Executable, type RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';\n`
    : `import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';\n`;
}

/**
 * Code for the URL path segment of the record an operation is bound to, for use inside a template
 * literal after `${baseUrl}/`: `<entitySet>(${odataLiteral.guid(this.<idParam>)})`.
 */
export function recordSegment(entitySet: string, idParam: string): string {
  return `${entitySet}(\${odataLiteral.guid(this.${idParam})})`;
}
