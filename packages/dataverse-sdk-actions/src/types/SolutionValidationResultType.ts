/**
 * SolutionValidationResultType enum
 */
export const SolutionValidationResultType = {
  Info: 0,
  Warning: 1,
  Error: 2,
} as const;

export type SolutionValidationResultType =
  (typeof SolutionValidationResultType)[keyof typeof SolutionValidationResultType];
