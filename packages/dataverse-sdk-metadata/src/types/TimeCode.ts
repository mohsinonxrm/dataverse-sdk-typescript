/**
 * TimeCode
 *
 * The Web API reads and writes enum members by name (`"Available"`), never by number,
 * so this is a string union. `TimeCode.Available` is the name; each member's comment
 * gives its numeric value.
 */
export const TimeCode = {
  /** 0 */
  Available: "Available",
  /** 1 */
  Busy: "Busy",
  /** 2 */
  Unavailable: "Unavailable",
  /** 3 */
  Filter: "Filter",
} as const;

export type TimeCode = (typeof TimeCode)[keyof typeof TimeCode];
