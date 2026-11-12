/**
 * LookupFormat enum
 */
export const LookupFormat = {
  None: 0,
  Connection: 1,
  Regarding: 2,
  Text: 3,
} as const;

export type LookupFormat = (typeof LookupFormat)[keyof typeof LookupFormat];
