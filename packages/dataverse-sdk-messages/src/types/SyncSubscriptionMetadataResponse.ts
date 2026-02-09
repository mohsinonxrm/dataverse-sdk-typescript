import type { SubscriptionEntityMetadata } from "./SubscriptionEntityMetadata.js";

/**
 * SyncSubscriptionMetadataResponse complex type
 */
export interface SyncSubscriptionMetadataResponse {
  Metadata: SubscriptionEntityMetadata[];
  SyncToken: string;
  IsFinalPage: boolean;
  MetadataVersion: string;
  ProfileVersion: string;
}
