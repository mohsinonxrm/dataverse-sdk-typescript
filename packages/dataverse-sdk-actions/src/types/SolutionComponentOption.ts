import type { ComponentPrincipalAccess } from "./ComponentPrincipalAccess.js";
import type { ImportDecision } from "./ImportDecision.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * SolutionComponentOption complex type
 */
export interface SolutionComponentOption {
  ComponentPrincipalAccessItems?: ComponentPrincipalAccess[];
  ImportDecision?: ImportDecision;
  Component: EntityReference | AnyEntityPayload;
}
