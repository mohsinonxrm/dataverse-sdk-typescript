import type { DependencyDepth } from "./DependencyDepth.js";
import type { GCMMetadataOptions } from "./GCMMetadataOptions.js";

/**
 * MetadataQuery
 */
export interface MetadataQuery {
  AppId?: string;
  ChangedAfter?: string;
  DependencyDepth?: DependencyDepth;
  EntityLogicalName?: string;
  Exclude?: string[];
  GetDefault?: boolean;
  MetadataId?: string;
  MetadataName?: string;
  MetadataNames?: string[];
  MetadataOptions?: GCMMetadataOptions;
  MetadataSubtype?: string;
  MetadataType?: string;
  SystemMetadataDelta?: string;
  UserMetadataDelta?: string;
}
