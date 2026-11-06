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
  SolutionComponentsDetails?: SolutionComponentDetails[];
  SolutionDetails?: SolutionDetails;
  MissingDependencies?: MissingDependency[];
  ValidationStatus?: ValidateSolutionStatus;
  SolutionValidationResults?: SolutionValidationResult[];
  OrgSolutionComponentsDetails?: SolutionComponentDetails[];
  ComponentPrivileges?: Collection_String_String[];
}
