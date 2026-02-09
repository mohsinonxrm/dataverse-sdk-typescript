import type { MetadataFilterExpression } from "./MetadataFilterExpression.js";
import type { MetadataPropertiesExpression } from "./MetadataPropertiesExpression.js";

/**
 * RelationshipQueryExpression complex type
 */
export interface RelationshipQueryExpression {
  Criteria: MetadataFilterExpression;
  Properties: MetadataPropertiesExpression;
}
