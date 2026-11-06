import type { SubscriptionDeletedEntityData } from "./SubscriptionDeletedEntityData.js";
import type { SubscriptionUpdatedEntityData } from "./SubscriptionUpdatedEntityData.js";

/**
 * SubscriptionData
 */
export interface SubscriptionData {
  DeletedEntityData?: SubscriptionDeletedEntityData[];
  UpdatedEntityData?: SubscriptionUpdatedEntityData[];
}
