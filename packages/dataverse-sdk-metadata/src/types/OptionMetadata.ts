import type { Label } from "./Label.js";

/**
 * OptionMetadata
 */
export interface OptionMetadata {
  Value?: number;
  Label?: Label;
  Description?: Label;
  Color?: string;
  IsManaged?: boolean;
  ExternalValue?: string;
  ParentValues?: number[];
  Tag?: string;
  IsHidden?: boolean;
  MetadataId?: string;
  HasChanged?: boolean;
}
