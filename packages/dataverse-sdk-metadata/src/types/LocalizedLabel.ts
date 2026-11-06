/**
 * LocalizedLabel
 */
export interface LocalizedLabel {
  /** Optional in payloads; the Web API samples send it. */
  "@odata.type"?: "Microsoft.Dynamics.CRM.LocalizedLabel";
  /** The label text. */
  Label: string;
  /** The language, as an LCID such as `1033`. */
  LanguageCode: number;
  IsManaged?: boolean;
  MetadataId?: string;
  HasChanged?: boolean;
}
