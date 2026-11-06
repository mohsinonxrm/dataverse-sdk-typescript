import type { SubscriptionData } from "./SubscriptionData.js";

/**
 * SyncSubscriptionDataResponse complex type
 */
export interface SyncSubscriptionDataResponse {
  Data?: SubscriptionData;
  IsFinalPage?: boolean;
  SyncToken?: string;
}
