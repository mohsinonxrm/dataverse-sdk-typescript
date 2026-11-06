import type { CascadeType } from './CascadeType.js';

/**
 * CascadeConfiguration complex type
 */
export interface CascadeConfiguration {
  Archive?: CascadeType;
  Assign?: CascadeType;
  Delete?: CascadeType;
  Merge?: CascadeType;
  Reparent?: CascadeType;
  RollupView?: CascadeType;
  Share?: CascadeType;
  Unshare?: CascadeType;
}
