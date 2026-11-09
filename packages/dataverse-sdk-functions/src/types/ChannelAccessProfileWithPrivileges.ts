import type { ChannelAccessProfilePrivilege } from "./ChannelAccessProfilePrivilege.js";

/**
 * ChannelAccessProfileWithPrivileges complex type
 */
export interface ChannelAccessProfileWithPrivileges {
  ChannelAccessProfilePrivilegeList?: ChannelAccessProfilePrivilege[];
  EmailAccess?: boolean;
  FacebookAccess?: boolean;
  PhoneAccess?: boolean;
  RateKnowledgeArticles?: boolean;
  SubmitFeedback?: boolean;
  TwitterAccess?: boolean;
  ViewArticleRating?: boolean;
  ViewKnowledgeArticles?: boolean;
  WebAccess?: boolean;
}
