/**
 * RecentlyViewedRecordType
 *
 * The Web API reads and writes enum members by name (`"Invalid"`), never by number,
 * so this is a string union. `RecentlyViewedRecordType.Invalid` is the name; each member's comment
 * gives its numeric value.
 */
export const RecentlyViewedRecordType = {
  /** -1 */
  Invalid: "Invalid",
  /** 0 */
  Entity: "Entity",
  /** 1 */
  Grid: "Grid",
  /** 2 */
  Isv: "Isv",
} as const;

export type RecentlyViewedRecordType =
  (typeof RecentlyViewedRecordType)[keyof typeof RecentlyViewedRecordType];
