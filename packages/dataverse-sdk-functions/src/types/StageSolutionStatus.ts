/**
 * StageSolutionStatus enum
 */
export const StageSolutionStatus = {
  Failed: 0,
  Passed: 1,
} as const;

export type StageSolutionStatus = (typeof StageSolutionStatus)[keyof typeof StageSolutionStatus];
