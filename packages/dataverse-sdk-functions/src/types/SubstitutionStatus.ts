/**
 * SubstitutionStatus enum
 */
export const SubstitutionStatus = {
  Success: 0,
  Error: 1,
  Warning: 2,
} as const;

export type SubstitutionStatus = (typeof SubstitutionStatus)[keyof typeof SubstitutionStatus];
