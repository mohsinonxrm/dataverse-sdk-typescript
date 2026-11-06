/**
 * RibbonLocationFilters
 *
 * The Web API reads and writes enum members by name (`"Form"`), never by number,
 * so this is a string union. `RibbonLocationFilters.Form` is the name; each member's comment
 * gives its numeric value.
 */
export const RibbonLocationFilters = {
  /** 1 */
  Form: "Form",
  /** 2 */
  HomepageGrid: "HomepageGrid",
  /** 4 */
  SubGrid: "SubGrid",
  /** 7 */
  All: "All",
} as const;

export type RibbonLocationFilters =
  (typeof RibbonLocationFilters)[keyof typeof RibbonLocationFilters];
