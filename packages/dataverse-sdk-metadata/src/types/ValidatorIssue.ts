import type { Collection_String_String } from "./Collection_String_String.js";

/**
 * ValidatorIssue
 */
export interface ValidatorIssue {
  LocalizedMessageText?: string;
  OptionalPropertyBag?: Collection_String_String;
  Severity?: number;
  TypeCode?: number;
}
