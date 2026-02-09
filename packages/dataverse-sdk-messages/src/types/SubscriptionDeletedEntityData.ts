import type { StringCollection } from "./StringCollection.js";

/**
 * SubscriptionDeletedEntityData complex type
 */
export interface SubscriptionDeletedEntityData {
  Count: number;
  IsReadOnly: boolean;
  Keys: string[];
  Values: StringCollection[];
}
