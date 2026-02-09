import type { ConditionExpression } from "./ConditionExpression.js";
import type { LinkEntity } from "./LinkEntity.js";
import type { LogicalOperator } from "./LogicalOperator.js";

/**
 * FilterExpression complex type
 */
export interface FilterExpression {
  FilterOperator: LogicalOperator;
  FilterHint: string;
  AnyAllFilterLinkEntity: LinkEntity;
  Conditions: ConditionExpression[];
  Filters: FilterExpression[];
  IsQuickFindFilter: boolean;
}
