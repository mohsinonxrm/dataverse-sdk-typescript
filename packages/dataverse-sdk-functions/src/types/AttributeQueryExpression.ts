import type { MetadataFilterExpression } from "./MetadataFilterExpression.js";
import type { MetadataPropertiesExpression } from "./MetadataPropertiesExpression.js";

/**
 * AttributeQueryExpression complex type
 */
export interface AttributeQueryExpression {
  Criteria?: MetadataFilterExpression;
  Properties?: MetadataPropertiesExpression;
}
