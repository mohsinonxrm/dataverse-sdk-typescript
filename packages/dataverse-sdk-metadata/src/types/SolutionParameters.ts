import type { SolutionComponentOption } from "./SolutionComponentOption.js";

/**
 * SolutionParameters
 */
export interface SolutionParameters {
  DeployMissingPackagesBeforeSolutionImport?: boolean;
  SolutionComponentOptions?: SolutionComponentOption[];
  StageSolutionUploadId?: string;
}
