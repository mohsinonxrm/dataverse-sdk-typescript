/**
 * ResultCode
 *
 * The Web API reads and writes enum members by name (`"Successful"`), never by number,
 * so this is a string union. `ResultCode.Successful` is the name; each member's comment
 * gives its numeric value.
 */
export const ResultCode = {
  /** 0 */
  Successful: "Successful",
  /** 1 */
  Failed: "Failed",
  /** 2 */
  Skipped: "Skipped",
} as const;

export type ResultCode = (typeof ResultCode)[keyof typeof ResultCode];
