import type { SubscriptionEntityMetadata } from "./SubscriptionEntityMetadata.js";

/**
 * SyncOfflineDataSchemaResponse complex type
 */
export interface SyncOfflineDataSchemaResponse {
  IsFinalPage?: boolean;
  MetadataVersion?: string;
  ProfileVersion?: string;
  Scripts?: SubscriptionEntityMetadata[];
  SyncToken?: string;
}
