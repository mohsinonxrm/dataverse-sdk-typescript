import type { ColumnSet } from './ColumnSet.js';
import type { FilterExpression } from './FilterExpression.js';
import type { JoinOperator } from './JoinOperator.js';
import type { OrderExpression } from './OrderExpression.js';

/**
 * LinkEntity complex type
 */
export interface LinkEntity {
  Columns?: ColumnSet;
  EntityAlias?: string;
  ForceSeek?: string;
  JoinOperator?: JoinOperator;
  LinkCriteria?: FilterExpression;
  LinkEntities?: LinkEntity[];
  LinkFromAttributeName?: string;
  LinkFromEntityName?: string;
  LinkToAttributeName?: string;
  LinkToEntityName?: string;
  Orders?: OrderExpression[];
}
