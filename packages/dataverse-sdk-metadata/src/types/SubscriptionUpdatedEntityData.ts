import type { EntityCollection } from "./EntityCollection.js";

/**
 * SubscriptionUpdatedEntityData
 */
export interface SubscriptionUpdatedEntityData {
  Count?: number;
  IsReadOnly?: boolean;
  Keys: string[];
  Values?: EntityCollection[];
}
