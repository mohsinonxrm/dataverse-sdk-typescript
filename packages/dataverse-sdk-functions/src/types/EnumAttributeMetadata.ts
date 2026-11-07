import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { EntityNameAttributeMetadata } from "./EntityNameAttributeMetadata.js";
import type { MultiSelectPicklistAttributeMetadata } from "./MultiSelectPicklistAttributeMetadata.js";
import type { PicklistAttributeMetadata } from "./PicklistAttributeMetadata.js";
import type { StateAttributeMetadata } from "./StateAttributeMetadata.js";
import type { StatusAttributeMetadata } from "./StatusAttributeMetadata.js";

/**
 * EnumAttributeMetadata entity type
 */
export interface EnumAttributeMetadata extends AttributeMetadata {
  DefaultFormValue?: number;
}

/**
 * A EnumAttributeMetadata value: one of the concrete types below, with the `@odata.type` that tells
 * Dataverse which one it is.
 */
export type TypedEnumAttributeMetadata =
  | (EntityNameAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.EntityNameAttributeMetadata";
    })
  | (EnumAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.EnumAttributeMetadata" })
  | (MultiSelectPicklistAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata";
    })
  | (PicklistAttributeMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata";
    })
  | (StateAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.StateAttributeMetadata" })
  | (StatusAttributeMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.StatusAttributeMetadata" });
