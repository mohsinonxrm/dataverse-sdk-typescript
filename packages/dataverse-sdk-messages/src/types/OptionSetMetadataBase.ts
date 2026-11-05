import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { BooleanOptionSetMetadata } from "./BooleanOptionSetMetadata.js";
import type { Label } from "./Label.js";
import type { MetadataBase } from "./MetadataBase.js";
import type { OptionSetMetadata } from "./OptionSetMetadata.js";
import type { OptionSetType } from "./OptionSetType.js";

/**
 * OptionSetMetadataBase entity type
 */
export interface OptionSetMetadataBase extends MetadataBase {
  Description?: Label;
  DisplayName?: Label;
  IsCustomOptionSet?: boolean;
  IsGlobal?: boolean;
  IsManaged?: boolean;
  IsCustomizable?: BooleanManagedProperty;
  Name?: string;
  ExternalTypeName?: string;
  OptionSetType?: OptionSetType;
  IntroducedVersion?: string;
}

/**
 * A OptionSetMetadataBase value: one of the concrete types below, with the `@odata.type` that tells
 * Dataverse which one it is.
 */
export type TypedOptionSetMetadataBase =
  | (BooleanOptionSetMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.BooleanOptionSetMetadata";
    })
  | (OptionSetMetadata & { "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata" })
  | (OptionSetMetadataBase & { "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadataBase" });
