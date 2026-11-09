import type { ComponentDetail } from "./ComponentDetail.js";

/**
 * MissingComponent complex type
 */
export interface MissingComponent {
  DependentComponent?: ComponentDetail;
  RequiredComponent?: ComponentDetail;
}
