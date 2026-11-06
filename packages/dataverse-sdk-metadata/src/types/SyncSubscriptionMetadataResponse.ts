import type { SubscriptionEntityMetadata } from "./SubscriptionEntityMetadata.js";

/**
 * SyncSubscriptionMetadataResponse
 */
export interface SyncSubscriptionMetadataResponse {
  IsFinalPage?: boolean;
  Metadata?: SubscriptionEntityMetadata[];
  MetadataVersion?: string;
  ProfileVersion?: string;
  SyncToken?: string;
}
