import type { Collection_String_String } from "./Collection_String_String.js";
import type { PresentInOrg } from "./PresentInOrg.js";

/**
 * SolutionComponentDetails complex type
 */
export interface SolutionComponentDetails {
  ComponentName?: string;
  Attributes?: Collection_String_String;
  ComponentTypeName?: string;
  IsPresentInOrg?: PresentInOrg;
}
