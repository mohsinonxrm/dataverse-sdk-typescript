/**
 * LocalizedLabel
 */
export interface LocalizedLabel {
  /** Optional in payloads; the Web API samples send it. */
  "@odata.type"?: "Microsoft.Dynamics.CRM.LocalizedLabel";
  HasChanged?: boolean;
  IsManaged?: boolean;
  /** The label text. */
  Label: string;
  /** The language, as an LCID such as `1033`. */
  LanguageCode: number;
  MetadataId?: string;
}
