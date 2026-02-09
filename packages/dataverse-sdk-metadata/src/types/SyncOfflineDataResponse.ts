import type { SubscriptionDeletedEntityData } from "./SubscriptionDeletedEntityData.js";
import type { SubscriptionUpdatedEntityData } from "./SubscriptionUpdatedEntityData.js";

/**
 * SyncOfflineDataResponse
 */
export interface SyncOfflineDataResponse {
  Updates?: SubscriptionUpdatedEntityData[];
  Deletes?: SubscriptionDeletedEntityData[];
  CompletedEntities?: string[];
  SyncToken?: string;
  IsFinalPage?: boolean;
}
