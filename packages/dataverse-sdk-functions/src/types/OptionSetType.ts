/**
 * OptionSetType enum
 */
export const OptionSetType = {
  Picklist: 0,
  State: 1,
  Status: 2,
  Boolean: 3,
} as const;

export type OptionSetType = (typeof OptionSetType)[keyof typeof OptionSetType];
