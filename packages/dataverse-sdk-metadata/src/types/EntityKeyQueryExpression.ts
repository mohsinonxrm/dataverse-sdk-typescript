import type { MetadataFilterExpression } from "./MetadataFilterExpression.js";
import type { MetadataPropertiesExpression } from "./MetadataPropertiesExpression.js";

/**
 * EntityKeyQueryExpression
 */
export interface EntityKeyQueryExpression {
  Criteria?: MetadataFilterExpression;
  Properties?: MetadataPropertiesExpression;
}
