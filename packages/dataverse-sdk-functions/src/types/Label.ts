import type { LocalizedLabel } from "./LocalizedLabel.js";

/**
 * Label complex type
 */
export interface Label {
  LocalizedLabels?: LocalizedLabel[];
  UserLocalizedLabel?: LocalizedLabel;
}
