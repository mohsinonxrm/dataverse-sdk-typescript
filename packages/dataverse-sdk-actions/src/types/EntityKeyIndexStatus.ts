/**
 * EntityKeyIndexStatus enum
 */
export const EntityKeyIndexStatus = {
  Pending: 0,
  InProgress: 1,
  Active: 2,
  Failed: 3,
} as const;

export type EntityKeyIndexStatus = (typeof EntityKeyIndexStatus)[keyof typeof EntityKeyIndexStatus];
