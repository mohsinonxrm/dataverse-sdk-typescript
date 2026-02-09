import type { ComponentDetail } from "./ComponentDetail.js";

/**
 * MissingComponent
 */
export interface MissingComponent {
  RequiredComponent?: ComponentDetail;
  DependentComponent?: ComponentDetail;
}
