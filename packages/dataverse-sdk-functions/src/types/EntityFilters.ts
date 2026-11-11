/**
 * EntityFilters enum
 *
 * A flags enum: combine members with `|`, so the type is `number`.
 */
export const EntityFilters = {
  Entity: 1,
  Attributes: 2,
  Privileges: 4,
  Relationships: 8,
  All: 15,
} as const;

export type EntityFilters = number;
