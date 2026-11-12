/**
 * RollupType enum
 */
export const RollupType = {
  None: 0,
  Related: 1,
  Extended: 2,
} as const;

export type RollupType = (typeof RollupType)[keyof typeof RollupType];
