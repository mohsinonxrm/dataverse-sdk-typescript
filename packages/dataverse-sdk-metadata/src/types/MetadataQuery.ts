import type { DependencyDepth } from "./DependencyDepth.js";
import type { GCMMetadataOptions } from "./GCMMetadataOptions.js";

/**
 * MetadataQuery
 */
export interface MetadataQuery {
  MetadataType?: string;
  MetadataOptions?: GCMMetadataOptions;
  MetadataSubtype?: string;
  EntityLogicalName?: string;
  MetadataId?: string;
  MetadataName?: string;
  MetadataNames?: string[];
  GetDefault?: boolean;
  DependencyDepth?: DependencyDepth;
  ChangedAfter?: string;
  Exclude?: string[];
  AppId?: string;
  UserMetadataDelta?: string;
  SystemMetadataDelta?: string;
}
