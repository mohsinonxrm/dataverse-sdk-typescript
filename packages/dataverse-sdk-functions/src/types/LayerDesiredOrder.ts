import type { LayerDesiredOrderType } from "./LayerDesiredOrderType.js";
import type { SolutionInfo } from "./SolutionInfo.js";

/**
 * LayerDesiredOrder complex type
 */
export interface LayerDesiredOrder {
  Type?: LayerDesiredOrderType;
  Solutions?: SolutionInfo[];
}
