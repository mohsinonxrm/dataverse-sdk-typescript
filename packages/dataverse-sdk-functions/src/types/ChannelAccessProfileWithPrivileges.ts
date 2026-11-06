import type { ChannelAccessProfilePrivilege } from "./ChannelAccessProfilePrivilege.js";

/**
 * ChannelAccessProfileWithPrivileges complex type
 */
export interface ChannelAccessProfileWithPrivileges {
  EmailAccess?: boolean;
  FacebookAccess?: boolean;
  PhoneAccess?: boolean;
  TwitterAccess?: boolean;
  WebAccess?: boolean;
  ViewKnowledgeArticles?: boolean;
  ViewArticleRating?: boolean;
  RateKnowledgeArticles?: boolean;
  SubmitFeedback?: boolean;
  ChannelAccessProfilePrivilegeList?: ChannelAccessProfilePrivilege[];
}
