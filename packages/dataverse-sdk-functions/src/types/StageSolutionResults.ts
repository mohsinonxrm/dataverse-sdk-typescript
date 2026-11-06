import type { MissingDependency } from './MissingDependency.js';
import type { SolutionComponentDetails } from './SolutionComponentDetails.js';
import type { SolutionDetails } from './SolutionDetails.js';
import type { SolutionValidationResult } from './SolutionValidationResult.js';
import type { StageSolutionStatus } from './StageSolutionStatus.js';

/**
 * StageSolutionResults complex type
 */
export interface StageSolutionResults {
  MissingDependencies?: MissingDependency[];
  SolutionComponentsDetails?: SolutionComponentDetails[];
  SolutionDetails?: SolutionDetails;
  SolutionValidationResults?: SolutionValidationResult[];
  StageSolutionStatus?: StageSolutionStatus;
  StageSolutionUploadId?: string;
}
