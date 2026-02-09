import type { SubscriptionData } from "./SubscriptionData.js";

/**
 * SyncSubscriptionDataResponse
 */
export interface SyncSubscriptionDataResponse {
  Data?: SubscriptionData;
  SyncToken?: string;
  IsFinalPage?: boolean;
}
