/**
 * XrmDateTimeGrouping
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `XrmDateTimeGrouping.None` is the name; each member's comment
 * gives its numeric value.
 */
export const XrmDateTimeGrouping = {
  /** 0 */
  None: "None",
  /** 1 */
  Day: "Day",
  /** 2 */
  Week: "Week",
  /** 3 */
  Month: "Month",
  /** 4 */
  Quarter: "Quarter",
  /** 5 */
  Year: "Year",
  /** 6 */
  FiscalPeriod: "FiscalPeriod",
  /** 7 */
  FiscalYear: "FiscalYear",
} as const;

export type XrmDateTimeGrouping = (typeof XrmDateTimeGrouping)[keyof typeof XrmDateTimeGrouping];
