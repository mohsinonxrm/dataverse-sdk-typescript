/**
 * IntegerFormat enum
 */
export const IntegerFormat = {
  None: 0,
  Duration: 1,
  TimeZone: 2,
  Language: 3,
  Locale: 4,
} as const;

export type IntegerFormat = (typeof IntegerFormat)[keyof typeof IntegerFormat];
