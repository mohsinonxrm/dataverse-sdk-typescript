import type { Label } from "./Label.js";
import type { StateOptionMetadata } from "./StateOptionMetadata.js";
import type { StatusOptionMetadata } from "./StatusOptionMetadata.js";

/**
 * OptionMetadata complex type
 */
export interface OptionMetadata {
  Color?: string;
  Description?: Label;
  ExternalValue?: string;
  HasChanged?: boolean;
  IsHidden?: boolean;
  IsManaged?: boolean;
  Label?: Label;
  MetadataId?: string;
  ParentValues?: number[];
  Tag?: string;
  Value?: number;
}

/**
 * A OptionMetadata value: one of the concrete types below, with the `@odata.type` that tells
 * Dataverse which one it is.
 */
export type TypedOptionMetadata =
  | (OptionMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.OptionMetadata" })
  | (StateOptionMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.StateOptionMetadata" })
  | (StatusOptionMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.StatusOptionMetadata" });
