import type { StringCollection } from "./StringCollection.js";

/**
 * SubscriptionEntityMetadata
 */
export interface SubscriptionEntityMetadata {
  Count?: number;
  IsReadOnly?: boolean;
  Keys: string[];
  Values?: StringCollection[];
}
