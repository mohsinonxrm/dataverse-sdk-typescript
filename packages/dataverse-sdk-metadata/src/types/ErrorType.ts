/**
 * ErrorType
 *
 * The Web API reads and writes enum members by name (`"Error"`), never by number,
 * so this is a string union. `ErrorType.Error` is the name; each member's comment
 * gives its numeric value.
 */
export const ErrorType = {
  /** 1 */
  Error: "Error",
  /** 2 */
  Warning: "Warning",
} as const;

export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];
