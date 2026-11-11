/**
 * PresentInOrg enum
 */
export const PresentInOrg = {
  False: 0,
  True: 1,
  Unknown: 2,
} as const;

export type PresentInOrg = (typeof PresentInOrg)[keyof typeof PresentInOrg];
