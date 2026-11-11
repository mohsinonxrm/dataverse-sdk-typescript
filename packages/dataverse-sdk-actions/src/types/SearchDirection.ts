/**
 * SearchDirection enum
 */
export const SearchDirection = {
  Forward: 0,
  Backward: 1,
} as const;

export type SearchDirection = (typeof SearchDirection)[keyof typeof SearchDirection];
