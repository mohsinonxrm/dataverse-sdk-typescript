/**
 * XrmAggregateType
 *
 * The Web API reads and writes enum members by name (`"None"`), never by number,
 * so this is a string union. `XrmAggregateType.None` is the name; each member's comment
 * gives its numeric value.
 */
export const XrmAggregateType = {
  /** 0 */
  None: "None",
  /** 1 */
  Count: "Count",
  /** 2 */
  CountColumn: "CountColumn",
  /** 3 */
  Sum: "Sum",
  /** 4 */
  Avg: "Avg",
  /** 5 */
  Min: "Min",
  /** 6 */
  Max: "Max",
} as const;

export type XrmAggregateType = (typeof XrmAggregateType)[keyof typeof XrmAggregateType];
