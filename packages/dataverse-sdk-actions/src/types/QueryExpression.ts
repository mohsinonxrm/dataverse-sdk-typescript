import type { ColumnSet } from "./ColumnSet.js";
import type { FilterExpression } from "./FilterExpression.js";
import type { LinkEntity } from "./LinkEntity.js";
import type { OrderExpression } from "./OrderExpression.js";
import type { PagingInfo } from "./PagingInfo.js";
import type { QueryBase } from "./QueryBase.js";

/**
 * QueryExpression complex type
 */
export interface QueryExpression extends QueryBase {
  ColumnSet?: ColumnSet;
  Criteria?: FilterExpression;
  DataSource?: string;
  Distinct?: boolean;
  EntityName?: string;
  ForceSeek?: string;
  LinkEntities?: LinkEntity[];
  NoLock?: boolean;
  Orders?: OrderExpression[];
  PageInfo?: PagingInfo;
  QueryHints?: string;
  SubQueryExpression?: QueryExpression;
  TopCount?: number;
}
