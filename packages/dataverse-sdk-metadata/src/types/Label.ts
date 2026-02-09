import type { LocalizedLabel } from "./LocalizedLabel.js";

/**
 * Label
 */
export interface Label {
  LocalizedLabels?: LocalizedLabel[];
  UserLocalizedLabel?: LocalizedLabel;
}
