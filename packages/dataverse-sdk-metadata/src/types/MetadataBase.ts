import type { crmmodelbaseentity } from "./crmmodelbaseentity.js";

/**
 * MetadataBase
 * Extends: crmmodelbaseentity
 */
export interface MetadataBase extends crmmodelbaseentity {
  /**
   * The derived metadata type. Responses carry it as `"#Microsoft.Dynamics.CRM.<Type>"` when the
   * value's type differs from the declared one (attributes in a collection, for example).
   * Create payloads use the create types, which require it as `"Microsoft.Dynamics.CRM.<Type>"`.
   */
  "@odata.type"?: string;
  HasChanged?: boolean;
  MetadataId?: string;
}
