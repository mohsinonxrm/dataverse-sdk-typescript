import type { ComponentDetail } from "./ComponentDetail.js";

/**
 * MissingComponent
 */
export interface MissingComponent {
  DependentComponent?: ComponentDetail;
  RequiredComponent?: ComponentDetail;
}
