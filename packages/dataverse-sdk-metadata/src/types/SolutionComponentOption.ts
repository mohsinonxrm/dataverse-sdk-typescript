import type { ComponentPrincipalAccess } from "./ComponentPrincipalAccess.js";
import type { ImportDecision } from "./ImportDecision.js";

/**
 * SolutionComponentOption
 */
export interface SolutionComponentOption {
  ImportDecision?: ImportDecision;
  ComponentPrincipalAccessItems?: ComponentPrincipalAccess[];
}
