/**
 * XrmDateTimeGrouping enum
 */
export const XrmDateTimeGrouping = {
  None: 0,
  Day: 1,
  Week: 2,
  Month: 3,
  Quarter: 4,
  Year: 5,
  FiscalPeriod: 6,
  FiscalYear: 7,
} as const;

export type XrmDateTimeGrouping = (typeof XrmDateTimeGrouping)[keyof typeof XrmDateTimeGrouping];
