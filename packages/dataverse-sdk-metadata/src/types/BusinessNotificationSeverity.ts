/**
 * BusinessNotificationSeverity
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `BusinessNotificationSeverity.None` is the name; each member's comment
 * gives its numeric value.
 */
export const BusinessNotificationSeverity = {
  /** 0 */
  None: "None",
  /** 1 */
  Error: "Error",
  /** 2 */
  Warning: "Warning",
  /** 3 */
  Information: "Information",
  /** 4 */
  UserDefined: "UserDefined",
} as const;

export type BusinessNotificationSeverity =
  (typeof BusinessNotificationSeverity)[keyof typeof BusinessNotificationSeverity];
