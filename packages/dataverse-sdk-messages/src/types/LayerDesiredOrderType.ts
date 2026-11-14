/**
 * LayerDesiredOrderType enum
 */
export const LayerDesiredOrderType = {
  Below: 0,
  Above: 1,
  Base: 2,
} as const;

export type LayerDesiredOrderType =
  (typeof LayerDesiredOrderType)[keyof typeof LayerDesiredOrderType];
