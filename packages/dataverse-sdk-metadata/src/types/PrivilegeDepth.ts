/**
 * PrivilegeDepth
 *
 * The Web API reads and writes enum members by name (`"Basic"`), never by number,
 * so this is a string union. `PrivilegeDepth.Basic` is the name; each member's comment
 * gives its numeric value.
 */
export const PrivilegeDepth = {
  /** 0 */
  Basic: "Basic",
  /** 1 */
  Local: "Local",
  /** 2 */
  Deep: "Deep",
  /** 3 */
  Global: "Global",
  /** 4 */
  RecordFilter: "RecordFilter",
} as const;

export type PrivilegeDepth = (typeof PrivilegeDepth)[keyof typeof PrivilegeDepth];
