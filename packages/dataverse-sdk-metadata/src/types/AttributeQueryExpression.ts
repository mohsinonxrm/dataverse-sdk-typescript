import type { MetadataFilterExpression } from "./MetadataFilterExpression.js";
import type { MetadataPropertiesExpression } from "./MetadataPropertiesExpression.js";

/**
 * AttributeQueryExpression
 */
export interface AttributeQueryExpression {
  Criteria?: MetadataFilterExpression;
  Properties?: MetadataPropertiesExpression;
}
