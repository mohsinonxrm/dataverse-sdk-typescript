/**
 * RollupType
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `RollupType.None` is the name; each member's comment
 * gives its numeric value.
 */
export const RollupType = {
  /** 0 */
  None: "None",
  /** 1 */
  Related: "Related",
  /** 2 */
  Extended: "Extended",
} as const;

export type RollupType = (typeof RollupType)[keyof typeof RollupType];
