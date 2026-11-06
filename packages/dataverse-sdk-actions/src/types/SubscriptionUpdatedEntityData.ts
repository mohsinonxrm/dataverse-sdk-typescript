import type { EntityCollection } from "./EntityCollection.js";

/**
 * SubscriptionUpdatedEntityData complex type
 */
export interface SubscriptionUpdatedEntityData {
  Count?: number;
  IsReadOnly?: boolean;
  Keys: string[];
  Values?: EntityCollection[];
}
