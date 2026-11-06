import type { Collection_String_String } from "./Collection_String_String.js";
import type { MissingDependency } from "./MissingDependency.js";
import type { SolutionComponentDetails } from "./SolutionComponentDetails.js";
import type { SolutionDetails } from "./SolutionDetails.js";
import type { SolutionValidationResult } from "./SolutionValidationResult.js";
import type { ValidateSolutionStatus } from "./ValidateSolutionStatus.js";

/**
 * ValidateSolutionPrerequisitesResult complex type
 */
export interface ValidateSolutionPrerequisitesResult {
  ComponentPrivileges?: Collection_String_String[];
  MissingDependencies?: MissingDependency[];
  OrgSolutionComponentsDetails?: SolutionComponentDetails[];
  SolutionComponentsDetails?: SolutionComponentDetails[];
  SolutionDetails?: SolutionDetails;
  SolutionValidationResults?: SolutionValidationResult[];
  ValidationStatus?: ValidateSolutionStatus;
}
