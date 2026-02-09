import type { crmmodelbaseentity } from "./crmmodelbaseentity.js";

/**
 * MetadataBase
 * Extends: crmmodelbaseentity
 */
export interface MetadataBase extends crmmodelbaseentity {
  MetadataId?: string;
  HasChanged?: boolean;
}
