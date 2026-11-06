import type { LocalizedLabel } from "./LocalizedLabel.js";

/**
 * Label
 */
export interface Label {
  /** Optional in payloads; the Web API samples send it. */
  "@odata.type"?: "Microsoft.Dynamics.CRM.Label";
  LocalizedLabels?: LocalizedLabel[];
  UserLocalizedLabel?: LocalizedLabel | null;
}
