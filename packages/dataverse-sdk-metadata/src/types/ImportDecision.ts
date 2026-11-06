/**
 * ImportDecision
 *
 * The Web API reads and writes enum members by name (`"Import"`), never by number,
 * so this is a string union. `ImportDecision.Import` is the name; each member's comment
 * gives its numeric value.
 */
export const ImportDecision = {
  /** 0 */
  Import: "Import",
  /** 1 */
  Skip: "Skip",
} as const;

export type ImportDecision = (typeof ImportDecision)[keyof typeof ImportDecision];
