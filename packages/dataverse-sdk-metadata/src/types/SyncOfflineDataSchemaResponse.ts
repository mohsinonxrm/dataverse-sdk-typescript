import type { SubscriptionEntityMetadata } from "./SubscriptionEntityMetadata.js";

/**
 * SyncOfflineDataSchemaResponse
 */
export interface SyncOfflineDataSchemaResponse {
  IsFinalPage?: boolean;
  MetadataVersion?: string;
  ProfileVersion?: string;
  Scripts?: SubscriptionEntityMetadata[];
  SyncToken?: string;
}
