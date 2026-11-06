/**
 * RelationshipType
 *
 * The Web API reads and writes enum members by name (`"OneToManyRelationship"`), never by number,
 * so this is a string union. `RelationshipType.OneToManyRelationship` is the name; each member's comment
 * gives its numeric value.
 */
export const RelationshipType = {
  /** 0 */
  OneToManyRelationship: "OneToManyRelationship",
  /** 1 */
  ManyToManyRelationship: "ManyToManyRelationship",
} as const;

export type RelationshipType = (typeof RelationshipType)[keyof typeof RelationshipType];
