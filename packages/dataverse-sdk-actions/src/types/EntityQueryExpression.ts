import type { AttributeQueryExpression } from "./AttributeQueryExpression.js";
import type { EntityKeyQueryExpression } from "./EntityKeyQueryExpression.js";
import type { LabelQueryExpression } from "./LabelQueryExpression.js";
import type { MetadataFilterExpression } from "./MetadataFilterExpression.js";
import type { MetadataPropertiesExpression } from "./MetadataPropertiesExpression.js";
import type { RelationshipQueryExpression } from "./RelationshipQueryExpression.js";

/**
 * EntityQueryExpression complex type
 */
export interface EntityQueryExpression {
  AttributeQuery?: AttributeQueryExpression;
  Criteria?: MetadataFilterExpression;
  KeyQuery?: EntityKeyQueryExpression;
  LabelQuery?: LabelQueryExpression;
  Properties?: MetadataPropertiesExpression;
  RelationshipQuery?: RelationshipQueryExpression;
}
