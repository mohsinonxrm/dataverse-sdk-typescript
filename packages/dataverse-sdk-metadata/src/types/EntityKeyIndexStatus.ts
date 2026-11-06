/**
 * EntityKeyIndexStatus
 *
 * The Web API reads and writes enum members by name (`"Pending"`), never by number,
 * so this is a string union. `EntityKeyIndexStatus.Pending` is the name; each member's comment
 * gives its numeric value.
 */
export const EntityKeyIndexStatus = {
  /** 0 */
  Pending: "Pending",
  /** 1 */
  InProgress: "InProgress",
  /** 2 */
  Active: "Active",
  /** 3 */
  Failed: "Failed",
} as const;

export type EntityKeyIndexStatus = (typeof EntityKeyIndexStatus)[keyof typeof EntityKeyIndexStatus];
