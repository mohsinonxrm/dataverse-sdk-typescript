/**
 * RibbonLocationFilters enum
 *
 * A flags enum: combine members with `|`, so the type is `number`.
 */
export const RibbonLocationFilters = {
  Form: 1,
  HomepageGrid: 2,
  SubGrid: 4,
  All: 7,
} as const;

export type RibbonLocationFilters = number;
