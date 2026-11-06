/**
 * RecentlyViewedRecordType
 *
 * The Web API reads and writes enum members by name (`"Entity"`), never by number,
 * so this is a string union. `RecentlyViewedRecordType.Entity` is the name; each member's comment
 * gives its numeric value.
 */
export const RecentlyViewedRecordType = {
  /** 0 */
  Entity: "Entity",
  /** 1 */
  Grid: "Grid",
  /** 2 */
  Isv: "Isv",
  /** -1 */
  Invalid: "Invalid",
} as const;

export type RecentlyViewedRecordType =
  (typeof RecentlyViewedRecordType)[keyof typeof RecentlyViewedRecordType];
