/**
 * BusinessNotificationParameterType
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `BusinessNotificationParameterType.None` is the name; each member's comment
 * gives its numeric value.
 */
export const BusinessNotificationParameterType = {
  /** 0 */
  None: "None",
  /** 1 */
  String: "String",
  /** 2 */
  Attribute: "Attribute",
} as const;

export type BusinessNotificationParameterType =
  (typeof BusinessNotificationParameterType)[keyof typeof BusinessNotificationParameterType];
