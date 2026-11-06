import type { ConditionExpression } from './ConditionExpression.js';
import type { LinkEntity } from './LinkEntity.js';
import type { LogicalOperator } from './LogicalOperator.js';

/**
 * FilterExpression complex type
 */
export interface FilterExpression {
  AnyAllFilterLinkEntity?: LinkEntity;
  Conditions?: ConditionExpression[];
  FilterHint?: string;
  FilterOperator?: LogicalOperator;
  Filters?: FilterExpression[];
  IsQuickFindFilter?: boolean;
}
