import type { SolutionComponentOption } from "./SolutionComponentOption.js";

/**
 * SolutionParameters complex type
 */
export interface SolutionParameters {
  StageSolutionUploadId?: string;
  SolutionComponentOptions?: SolutionComponentOption[];
  DeployMissingPackagesBeforeSolutionImport?: boolean;
}
