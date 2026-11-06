/**
 * StageSolutionStatus
 *
 * The Web API reads and writes enum members by name (`"Failed"`), never by number,
 * so this is a string union. `StageSolutionStatus.Failed` is the name; each member's comment
 * gives its numeric value.
 */
export const StageSolutionStatus = {
  /** 0 */
  Failed: "Failed",
  /** 1 */
  Passed: "Passed",
} as const;

export type StageSolutionStatus = (typeof StageSolutionStatus)[keyof typeof StageSolutionStatus];
