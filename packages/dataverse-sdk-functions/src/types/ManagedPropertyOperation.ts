/**
 * ManagedPropertyOperation enum
 */
export const ManagedPropertyOperation = {
  None: 0,
  Create: 1,
  Update: 2,
  CreateUpdate: 3,
  Delete: 4,
  UpdateDelete: 6,
  All: 7,
} as const;

export type ManagedPropertyOperation =
  (typeof ManagedPropertyOperation)[keyof typeof ManagedPropertyOperation];
