/**
 * LayerDesiredOrderType
 *
 * The Web API reads and writes enum members by name (`"Below"`), never by number,
 * so this is a string union. `LayerDesiredOrderType.Below` is the name; each member's comment
 * gives its numeric value.
 */
export const LayerDesiredOrderType = {
  /** 0 */
  Below: "Below",
  /** 1 */
  Above: "Above",
  /** 2 */
  Base: "Base",
} as const;

export type LayerDesiredOrderType =
  (typeof LayerDesiredOrderType)[keyof typeof LayerDesiredOrderType];
