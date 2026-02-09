import type { SubscriptionData } from "./SubscriptionData.js";

/**
 * SyncSubscriptionDataResponse complex type
 */
export interface SyncSubscriptionDataResponse {
  Data: SubscriptionData;
  SyncToken: string;
  IsFinalPage: boolean;
}
