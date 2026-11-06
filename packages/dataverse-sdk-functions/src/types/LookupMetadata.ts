import type { LookupEntityMetadata } from "./LookupEntityMetadata.js";
import type { LookupView } from "./LookupView.js";

/**
 * LookupMetadata complex type
 */
export interface LookupMetadata {
  Entity?: LookupEntityMetadata;
  View?: LookupView;
}
