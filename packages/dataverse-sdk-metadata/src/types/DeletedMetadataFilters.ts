/**
 * DeletedMetadataFilters
 *
 * The Web API reads and writes enum members by name (`"Default"`), never by number,
 * so this is a string union. `DeletedMetadataFilters.Default` is the name; each member's comment
 * gives its numeric value.
 */
export const DeletedMetadataFilters = {
  /** 1 */
  Default: "Default",
  /** 2 */
  Attribute: "Attribute",
  /** 4 */
  Relationship: "Relationship",
  /** 8 */
  Label: "Label",
  /** 16 */
  OptionSet: "OptionSet",
  /** 31 */
  All: "All",
} as const;

export type DeletedMetadataFilters =
  (typeof DeletedMetadataFilters)[keyof typeof DeletedMetadataFilters];
