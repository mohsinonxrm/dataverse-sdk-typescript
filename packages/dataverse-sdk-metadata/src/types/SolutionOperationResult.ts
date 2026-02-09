import type { ActionLink } from "./ActionLink.js";
import type { SolutionOperationStatus } from "./SolutionOperationStatus.js";
import type { SolutionOperationType } from "./SolutionOperationType.js";

/**
 * SolutionOperationResult
 */
export interface SolutionOperationResult {
  FormattedResults?: string;
  Type?: SolutionOperationType;
  Status?: SolutionOperationStatus;
  WarningMessages?: string[];
  ErrorMessages?: string[];
  ActionLink?: ActionLink;
}
