import type { SolutionComponentOption } from './SolutionComponentOption.js';
import type { EntityReference } from '@mohsinonxrm/dataverse-sdk-entities-runtime';
import type { AnyEntityPayload } from './EntityPayload.js';

/**
 * SolutionParameters complex type
 */
export interface SolutionParameters {
  DeployMissingPackagesBeforeSolutionImport?: boolean;
  SolutionComponentOptions?: SolutionComponentOption[];
  StageSolutionUploadId?: string;
  PackageHistoryReference: EntityReference | AnyEntityPayload;
}
