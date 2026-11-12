/**
 * ManagedPropertyEvaluationPriority enum
 */
export const ManagedPropertyEvaluationPriority = {
  None: 0,
  Low: 1,
  Normal: 2,
  High: 3,
  Essential: 4,
} as const;

export type ManagedPropertyEvaluationPriority =
  (typeof ManagedPropertyEvaluationPriority)[keyof typeof ManagedPropertyEvaluationPriority];
