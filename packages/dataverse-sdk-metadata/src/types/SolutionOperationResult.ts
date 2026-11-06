import type { ActionLink } from "./ActionLink.js";
import type { SolutionOperationStatus } from "./SolutionOperationStatus.js";
import type { SolutionOperationType } from "./SolutionOperationType.js";

/**
 * SolutionOperationResult
 */
export interface SolutionOperationResult {
  ActionLink?: ActionLink;
  ErrorMessages?: string[];
  FormattedResults?: string;
  Status?: SolutionOperationStatus;
  Type?: SolutionOperationType;
  WarningMessages?: string[];
}
