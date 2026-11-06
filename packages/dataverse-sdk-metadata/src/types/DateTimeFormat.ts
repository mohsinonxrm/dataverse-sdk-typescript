/**
 * DateTimeFormat
 *
 * The Web API reads and writes enum members by name (`"DateOnly"`), never by number,
 * so this is a string union. `DateTimeFormat.DateOnly` is the name; each member's comment
 * gives its numeric value.
 */
export const DateTimeFormat = {
  /** 0 */
  DateOnly: "DateOnly",
  /** 1 */
  DateAndTime: "DateAndTime",
} as const;

export type DateTimeFormat = (typeof DateTimeFormat)[keyof typeof DateTimeFormat];
