import type { ColumnSet } from "./ColumnSet.js";
import type { FilterExpression } from "./FilterExpression.js";
import type { LinkEntity } from "./LinkEntity.js";
import type { OrderExpression } from "./OrderExpression.js";
import type { PagingInfo } from "./PagingInfo.js";
import type { QueryBase } from "./QueryBase.js";

/**
 * QueryExpression
 * Extends: QueryBase
 */
export interface QueryExpression extends QueryBase {
  Distinct?: boolean;
  NoLock?: boolean;
  SubQueryExpression?: QueryExpression;
  PageInfo?: PagingInfo;
  QueryHints?: string;
  ForceSeek?: string;
  DataSource?: string;
  LinkEntities?: LinkEntity[];
  Criteria?: FilterExpression;
  Orders?: OrderExpression[];
  EntityName?: string;
  ColumnSet?: ColumnSet;
  TopCount?: number;
}
