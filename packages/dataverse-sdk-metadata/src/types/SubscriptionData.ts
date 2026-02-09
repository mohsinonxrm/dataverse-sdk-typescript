import type { SubscriptionDeletedEntityData } from "./SubscriptionDeletedEntityData.js";
import type { SubscriptionUpdatedEntityData } from "./SubscriptionUpdatedEntityData.js";

/**
 * SubscriptionData
 */
export interface SubscriptionData {
  UpdatedEntityData?: SubscriptionUpdatedEntityData[];
  DeletedEntityData?: SubscriptionDeletedEntityData[];
}
