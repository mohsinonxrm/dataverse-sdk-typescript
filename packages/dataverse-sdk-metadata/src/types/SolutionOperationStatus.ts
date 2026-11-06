/**
 * SolutionOperationStatus
 *
 * The Web API reads and writes enum members by name (`"Failed"`), never by number,
 * so this is a string union. `SolutionOperationStatus.Failed` is the name; each member's comment
 * gives its numeric value.
 */
export const SolutionOperationStatus = {
  /** 0 */
  Failed: "Failed",
  /** 1 */
  Passed: "Passed",
} as const;

export type SolutionOperationStatus =
  (typeof SolutionOperationStatus)[keyof typeof SolutionOperationStatus];
