/**
 * BusinessNotificationSeverity enum
 */
export const BusinessNotificationSeverity = {
  None: 0,
  Error: 1,
  Warning: 2,
  Information: 3,
  UserDefined: 4,
} as const;

export type BusinessNotificationSeverity =
  (typeof BusinessNotificationSeverity)[keyof typeof BusinessNotificationSeverity];
