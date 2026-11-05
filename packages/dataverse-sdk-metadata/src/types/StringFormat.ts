/**
 * StringFormat
 *
 * The Web API reads and writes enum members by name (`"Email"`), never by number,
 * so this is a string union. `StringFormat.Email` is the name; each member's comment
 * gives its numeric value.
 */
export const StringFormat = {
  /** 0 */
  Email: "Email",
  /** 1 */
  Text: "Text",
  /** 2 */
  TextArea: "TextArea",
  /** 3 */
  Url: "Url",
  /** 4 */
  TickerSymbol: "TickerSymbol",
  /** 5 */
  PhoneticGuide: "PhoneticGuide",
  /** 6 */
  VersionNumber: "VersionNumber",
  /** 7 */
  Phone: "Phone",
  /** 8 */
  Json: "Json",
  /** 9 */
  RichText: "RichText",
} as const;

export type StringFormat = (typeof StringFormat)[keyof typeof StringFormat];
