import type { StringCollection } from "./StringCollection.js";

/**
 * SubscriptionDeletedEntityData
 */
export interface SubscriptionDeletedEntityData {
  Count?: number;
  IsReadOnly?: boolean;
  Keys: string[];
  Values?: StringCollection[];
}
