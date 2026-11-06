import type { ComponentPrincipalAccess } from "./ComponentPrincipalAccess.js";
import type { ImportDecision } from "./ImportDecision.js";

/**
 * SolutionComponentOption
 */
export interface SolutionComponentOption {
  ComponentPrincipalAccessItems?: ComponentPrincipalAccess[];
  ImportDecision?: ImportDecision;
}
