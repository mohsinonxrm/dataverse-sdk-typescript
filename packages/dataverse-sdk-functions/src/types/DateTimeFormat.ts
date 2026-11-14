/**
 * DateTimeFormat enum
 */
export const DateTimeFormat = {
  DateOnly: 0,
  DateAndTime: 1,
} as const;

export type DateTimeFormat = (typeof DateTimeFormat)[keyof typeof DateTimeFormat];
