import type { SolutionComponentReference } from "./SolutionComponentReference.js";

/**
 * BulkRemoveActiveCustomizationsParameters
 */
export interface BulkRemoveActiveCustomizationsParameters {
  ContinueOnError?: boolean;
  SolutionComponentReferences?: SolutionComponentReference[];
}
