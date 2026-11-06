import type { SolutionComponentOption } from "./SolutionComponentOption.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * SolutionParameters complex type
 */
export interface SolutionParameters {
  StageSolutionUploadId?: string;
  SolutionComponentOptions?: SolutionComponentOption[];
  DeployMissingPackagesBeforeSolutionImport?: boolean;
  PackageHistoryReference: EntityReference | AnyEntityPayload;
}
