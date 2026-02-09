import type { CascadeType } from "./CascadeType.js";

/**
 * CascadeConfiguration
 */
export interface CascadeConfiguration {
  Assign?: CascadeType;
  Delete?: CascadeType;
  Archive?: CascadeType;
  Merge?: CascadeType;
  Reparent?: CascadeType;
  Share?: CascadeType;
  Unshare?: CascadeType;
  RollupView?: CascadeType;
}
