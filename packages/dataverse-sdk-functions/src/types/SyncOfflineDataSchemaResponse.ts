import type { SubscriptionEntityMetadata } from "./SubscriptionEntityMetadata.js";

/**
 * SyncOfflineDataSchemaResponse complex type
 */
export interface SyncOfflineDataSchemaResponse {
  Scripts: SubscriptionEntityMetadata[];
  SyncToken: string;
  IsFinalPage: boolean;
  MetadataVersion: string;
  ProfileVersion: string;
}
