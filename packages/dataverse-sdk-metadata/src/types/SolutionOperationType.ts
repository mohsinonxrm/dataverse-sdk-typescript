/**
 * SolutionOperationType
 *
 * The Web API reads and writes enum members by name (`"Import"`), never by number,
 * so this is a string union. `SolutionOperationType.Import` is the name; each member's comment
 * gives its numeric value.
 */
export const SolutionOperationType = {
  /** 0 */
  Import: "Import",
} as const;

export type SolutionOperationType =
  (typeof SolutionOperationType)[keyof typeof SolutionOperationType];
