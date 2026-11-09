import type { Label } from "./Label.js";

/**
 * OptionMetadata
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
