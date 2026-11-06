import type { ComponentPrincipalAccess } from "./ComponentPrincipalAccess.js";
import type { ImportDecision } from "./ImportDecision.js";

/**
 * SolutionComponentOption complex type
 */
export interface SolutionComponentOption {
  ImportDecision?: ImportDecision;
  ComponentPrincipalAccessItems?: ComponentPrincipalAccess[];
}
