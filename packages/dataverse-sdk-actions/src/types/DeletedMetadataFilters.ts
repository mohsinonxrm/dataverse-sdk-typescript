/**
 * DeletedMetadataFilters enum
 *
 * A flags enum: combine members with `|`, so the type is `number`.
 */
export const DeletedMetadataFilters = {
  Default: 1,
  Attribute: 2,
  Relationship: 4,
  Label: 8,
  OptionSet: 16,
  All: 31,
} as const;

export type DeletedMetadataFilters = number;
