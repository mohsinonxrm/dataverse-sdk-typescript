/**
 * IntegerFormat
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `IntegerFormat.None` is the name; each member's comment
 * gives its numeric value.
 */
export const IntegerFormat = {
  /** 0 */
  None: "None",
  /** 1 */
  Duration: "Duration",
  /** 2 */
  TimeZone: "TimeZone",
  /** 3 */
  Language: "Language",
  /** 4 */
  Locale: "Locale",
} as const;

export type IntegerFormat = (typeof IntegerFormat)[keyof typeof IntegerFormat];
