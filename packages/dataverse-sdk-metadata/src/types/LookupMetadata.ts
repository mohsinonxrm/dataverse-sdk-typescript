import type { LookupEntityMetadata } from "./LookupEntityMetadata.js";
import type { LookupView } from "./LookupView.js";

/**
 * LookupMetadata
 */
export interface LookupMetadata {
  Entity?: LookupEntityMetadata;
  View?: LookupView;
}
