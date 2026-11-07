import type { SubscriptionData } from "./SubscriptionData.js";

/**
 * SyncSubscriptionDataResponse
 */
export interface SyncSubscriptionDataResponse {
  Data?: SubscriptionData;
  IsFinalPage?: boolean;
  SyncToken?: string;
}
