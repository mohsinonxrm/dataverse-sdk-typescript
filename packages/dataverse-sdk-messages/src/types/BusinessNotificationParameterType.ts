/**
 * BusinessNotificationParameterType enum
 */
export const BusinessNotificationParameterType = {
  None: 0,
  String: 1,
  Attribute: 2,
} as const;

export type BusinessNotificationParameterType =
  (typeof BusinessNotificationParameterType)[keyof typeof BusinessNotificationParameterType];
