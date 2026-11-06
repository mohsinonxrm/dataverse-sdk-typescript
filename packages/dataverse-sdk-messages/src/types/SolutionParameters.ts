import type { SolutionComponentOption } from "./SolutionComponentOption.js";
import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * SolutionParameters complex type
 */
export interface SolutionParameters {
  DeployMissingPackagesBeforeSolutionImport?: boolean;
  SolutionComponentOptions?: SolutionComponentOption[];
  StageSolutionUploadId?: string;
  PackageHistoryReference: EntityReference | AnyEntityPayload;
}
