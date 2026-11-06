import type { activitypointer } from "./activitypointer.js";

/**
 * socialactivity entity type
 */
export interface socialactivity extends activitypointer {
  postid?: string;
  _postfromprofileid_value?: string;
  posturl?: string;
  sentimentvalue?: number;
  postedon?: string;
  posttoprofileid?: string;
  _postauthoraccount_value?: string;
  _postauthor_value?: string;
  socialadditionalparams?: string;
  postmessagetype?: number;
  threadid?: string;
  directioncode?: boolean;
  inresponseto?: string;
  overriddencreatedon?: string;
  importsequencenumber?: number;
}
