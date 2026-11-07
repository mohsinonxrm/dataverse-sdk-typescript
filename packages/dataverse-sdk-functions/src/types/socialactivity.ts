import type { activitypointer } from "./activitypointer.js";

/**
 * socialactivity entity type
 */
export interface socialactivity extends activitypointer {
  _postauthor_value?: string;
  _postauthoraccount_value?: string;
  _postfromprofileid_value?: string;
  directioncode?: boolean;
  importsequencenumber?: number;
  inresponseto?: string;
  overriddencreatedon?: string;
  postedon?: string;
  postid?: string;
  postmessagetype?: number;
  posttoprofileid?: string;
  posturl?: string;
  sentimentvalue?: number;
  socialadditionalparams?: string;
  threadid?: string;
}
