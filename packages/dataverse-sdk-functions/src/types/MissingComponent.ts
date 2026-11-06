import type { ComponentDetail } from "./ComponentDetail.js";

/**
 * MissingComponent complex type
 */
export interface MissingComponent {
  RequiredComponent?: ComponentDetail;
  DependentComponent?: ComponentDetail;
}
