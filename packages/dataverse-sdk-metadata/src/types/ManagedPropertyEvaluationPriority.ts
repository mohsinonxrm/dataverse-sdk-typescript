/**
 * ManagedPropertyEvaluationPriority
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `ManagedPropertyEvaluationPriority.None` is the name; each member's comment
 * gives its numeric value.
 */
export const ManagedPropertyEvaluationPriority = {
  /** 0 */
  None: "None",
  /** 1 */
  Low: "Low",
  /** 2 */
  Normal: "Normal",
  /** 3 */
  High: "High",
  /** 4 */
  Essential: "Essential",
} as const;

export type ManagedPropertyEvaluationPriority =
  (typeof ManagedPropertyEvaluationPriority)[keyof typeof ManagedPropertyEvaluationPriority];
