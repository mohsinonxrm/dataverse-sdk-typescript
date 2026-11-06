import type { ComponentPrincipalAccess } from "./ComponentPrincipalAccess.js";
import type { ImportDecision } from "./ImportDecision.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * SolutionComponentOption complex type
 */
export interface SolutionComponentOption {
  ImportDecision?: ImportDecision;
  ComponentPrincipalAccessItems?: ComponentPrincipalAccess[];
  Component: EntityReference | AnyEntityPayload;
}
