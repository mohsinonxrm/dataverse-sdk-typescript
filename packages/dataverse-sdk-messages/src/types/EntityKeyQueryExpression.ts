import type { MetadataFilterExpression } from "./MetadataFilterExpression.js";
import type { MetadataPropertiesExpression } from "./MetadataPropertiesExpression.js";

/**
 * EntityKeyQueryExpression complex type
 */
export interface EntityKeyQueryExpression {
  Criteria: MetadataFilterExpression;
  Properties: MetadataPropertiesExpression;
}
