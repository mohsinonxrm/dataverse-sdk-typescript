import type { LocalizedLabelInfo } from "./LocalizedLabelInfo.js";

/**
 * LocalizedLabelDetails complex type
 */
export interface LocalizedLabelDetails {
  LocalizedLabels: LocalizedLabelInfo[];
  DefaultLabel: string;
}
