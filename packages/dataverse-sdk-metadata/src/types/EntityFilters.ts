/**
 * EntityFilters
 *
 * The Web API reads and writes enum members by name (`"Entity"`), never by number,
 * so this is a string union. `EntityFilters.Entity` is the name; each member's comment
 * gives its numeric value.
 */
export const EntityFilters = {
  /** 1 */
  Entity: "Entity",
  /** 2 */
  Attributes: "Attributes",
  /** 4 */
  Privileges: "Privileges",
  /** 8 */
  Relationships: "Relationships",
  /** 15 */
  All: "All",
} as const;

export type EntityFilters = (typeof EntityFilters)[keyof typeof EntityFilters];
