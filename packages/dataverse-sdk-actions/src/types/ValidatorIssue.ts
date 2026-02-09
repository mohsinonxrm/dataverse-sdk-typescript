import type { Collection_String_String } from "./Collection_String_String.js";

/**
 * ValidatorIssue complex type
 */
export interface ValidatorIssue {
  TypeCode: number;
  Severity: number;
  LocalizedMessageText: string;
  OptionalPropertyBag: Collection_String_String;
}
