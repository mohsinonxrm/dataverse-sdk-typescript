/**
 * ImportDecision enum
 */
export const ImportDecision = {
  Import: 0,
  Skip: 1,
} as const;

export type ImportDecision = (typeof ImportDecision)[keyof typeof ImportDecision];
