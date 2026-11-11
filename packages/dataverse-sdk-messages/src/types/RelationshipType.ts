/**
 * RelationshipType enum
 */
export const RelationshipType = {
  OneToManyRelationship: 0,
  ManyToManyRelationship: 1,
} as const;

export type RelationshipType = (typeof RelationshipType)[keyof typeof RelationshipType];
