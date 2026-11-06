import type { StringCollection } from "./StringCollection.js";

/**
 * SubscriptionEntityMetadata complex type
 */
export interface SubscriptionEntityMetadata {
  Count?: number;
  IsReadOnly?: boolean;
  Keys: string[];
  Values?: StringCollection[];
}
