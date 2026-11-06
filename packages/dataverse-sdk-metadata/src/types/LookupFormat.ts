/**
 * LookupFormat
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `LookupFormat.None` is the name; each member's comment
 * gives its numeric value.
 */
export const LookupFormat = {
  /** 0 */
  None: "None",
  /** 1 */
  Connection: "Connection",
  /** 2 */
  Regarding: "Regarding",
  /** 3 */
  Text: "Text",
} as const;

export type LookupFormat = (typeof LookupFormat)[keyof typeof LookupFormat];
