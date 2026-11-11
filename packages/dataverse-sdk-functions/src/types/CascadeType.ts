/**
 * CascadeType enum
 */
export const CascadeType = {
  NoCascade: 0,
  Cascade: 1,
  Active: 2,
  UserOwned: 3,
  RemoveLink: 4,
  Restrict: 5,
} as const;

export type CascadeType = (typeof CascadeType)[keyof typeof CascadeType];
