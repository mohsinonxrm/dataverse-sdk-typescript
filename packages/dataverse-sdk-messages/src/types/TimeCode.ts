/**
 * TimeCode enum
 */
export const TimeCode = {
  Available: 0,
  Busy: 1,
  Unavailable: 2,
  Filter: 3,
} as const;

export type TimeCode = (typeof TimeCode)[keyof typeof TimeCode];
