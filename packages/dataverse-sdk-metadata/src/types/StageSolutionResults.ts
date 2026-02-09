import type { MissingDependency } from "./MissingDependency.js";
import type { SolutionComponentDetails } from "./SolutionComponentDetails.js";
import type { SolutionDetails } from "./SolutionDetails.js";
import type { SolutionValidationResult } from "./SolutionValidationResult.js";
import type { StageSolutionStatus } from "./StageSolutionStatus.js";

/**
 * StageSolutionResults
 */
export interface StageSolutionResults {
  StageSolutionUploadId?: string;
  SolutionComponentsDetails?: SolutionComponentDetails[];
  SolutionDetails?: SolutionDetails;
  MissingDependencies?: MissingDependency[];
  StageSolutionStatus?: StageSolutionStatus;
  SolutionValidationResults?: SolutionValidationResult[];
}
