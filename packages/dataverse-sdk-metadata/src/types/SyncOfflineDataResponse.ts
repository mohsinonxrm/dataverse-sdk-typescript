import type { SubscriptionDeletedEntityData } from "./SubscriptionDeletedEntityData.js";
import type { SubscriptionUpdatedEntityData } from "./SubscriptionUpdatedEntityData.js";

/**
 * SyncOfflineDataResponse
 */
export interface SyncOfflineDataResponse {
  CompletedEntities?: string[];
  Deletes?: SubscriptionDeletedEntityData[];
  IsFinalPage?: boolean;
  SyncToken?: string;
  Updates?: SubscriptionUpdatedEntityData[];
}
