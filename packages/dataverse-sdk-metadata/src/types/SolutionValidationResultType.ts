/**
 * SolutionValidationResultType
 *
 * The Web API reads and writes enum members by name (`"Info"`), never by number,
 * so this is a string union. `SolutionValidationResultType.Info` is the name; each member's comment
 * gives its numeric value.
 */
export const SolutionValidationResultType = {
  /** 0 */
  Info: "Info",
  /** 1 */
  Warning: "Warning",
  /** 2 */
  Error: "Error",
} as const;

export type SolutionValidationResultType =
  (typeof SolutionValidationResultType)[keyof typeof SolutionValidationResultType];
