import type { ColumnSet } from "./ColumnSet.js";
import type { FilterExpression } from "./FilterExpression.js";
import type { JoinOperator } from "./JoinOperator.js";
import type { OrderExpression } from "./OrderExpression.js";

/**
 * LinkEntity
 */
export interface LinkEntity {
  LinkFromAttributeName?: string;
  LinkFromEntityName?: string;
  LinkToEntityName?: string;
  LinkToAttributeName?: string;
  JoinOperator?: JoinOperator;
  LinkCriteria?: FilterExpression;
  LinkEntities?: LinkEntity[];
  Columns?: ColumnSet;
  EntityAlias?: string;
  ForceSeek?: string;
  Orders?: OrderExpression[];
}
