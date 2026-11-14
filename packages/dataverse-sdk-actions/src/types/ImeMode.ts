/**
 * ImeMode enum
 */
export const ImeMode = {
  Auto: 0,
  Inactive: 1,
  Active: 2,
  Disabled: 3,
} as const;

export type ImeMode = (typeof ImeMode)[keyof typeof ImeMode];
