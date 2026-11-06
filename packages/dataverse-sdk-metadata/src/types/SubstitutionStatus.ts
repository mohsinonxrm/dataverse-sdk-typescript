/**
 * SubstitutionStatus
 *
 * The Web API reads and writes enum members by name (`"Success"`), never by number,
 * so this is a string union. `SubstitutionStatus.Success` is the name; each member's comment
 * gives its numeric value.
 */
export const SubstitutionStatus = {
  /** 0 */
  Success: "Success",
  /** 1 */
  Error: "Error",
  /** 2 */
  Warning: "Warning",
} as const;

export type SubstitutionStatus = (typeof SubstitutionStatus)[keyof typeof SubstitutionStatus];
