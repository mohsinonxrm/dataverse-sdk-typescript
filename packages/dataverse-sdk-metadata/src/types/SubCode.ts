/**
 * SubCode
 *
 * The Web API reads and writes enum members by name (`"Unspecified"`), never by number,
 * so this is a string union. `SubCode.Unspecified` is the name; each member's comment
 * gives its numeric value.
 */
export const SubCode = {
  /** 0 */
  Unspecified: "Unspecified",
  /** 1 */
  Schedulable: "Schedulable",
  /** 2 */
  Committed: "Committed",
  /** 3 */
  Uncommitted: "Uncommitted",
  /** 4 */
  Break: "Break",
  /** 5 */
  Holiday: "Holiday",
  /** 6 */
  Vacation: "Vacation",
  /** 7 */
  Appointment: "Appointment",
  /** 8 */
  ResourceStartTime: "ResourceStartTime",
  /** 9 */
  ResourceServiceRestriction: "ResourceServiceRestriction",
  /** 10 */
  ResourceCapacity: "ResourceCapacity",
  /** 11 */
  ServiceRestriction: "ServiceRestriction",
  /** 12 */
  ServiceCost: "ServiceCost",
} as const;

export type SubCode = (typeof SubCode)[keyof typeof SubCode];
