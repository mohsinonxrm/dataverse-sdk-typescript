import type { LayerDesiredOrderType } from "./LayerDesiredOrderType.js";
import type { SolutionInfo } from "./SolutionInfo.js";

/**
 * LayerDesiredOrder
 */
export interface LayerDesiredOrder {
  Solutions?: SolutionInfo[];
  Type?: LayerDesiredOrderType;
}
