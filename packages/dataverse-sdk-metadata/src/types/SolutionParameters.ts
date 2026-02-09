import type { SolutionComponentOption } from "./SolutionComponentOption.js";

/**
 * SolutionParameters
 */
export interface SolutionParameters {
  StageSolutionUploadId?: string;
  SolutionComponentOptions?: SolutionComponentOption[];
  DeployMissingPackagesBeforeSolutionImport?: boolean;
}
