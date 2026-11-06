import type { ColumnSet } from "./ColumnSet.js";
import type { Object } from "./Object.js";
import type { OrderExpression } from "./OrderExpression.js";
import type { PagingInfo } from "./PagingInfo.js";
import type { QueryBase } from "./QueryBase.js";

/**
 * QueryByAttribute complex type
 */
export interface QueryByAttribute extends QueryBase {
  EntityName?: string;
  Attributes?: string[];
  Values?: Object[];
  PageInfo?: PagingInfo;
  ColumnSet?: ColumnSet;
  Orders?: OrderExpression[];
  TopCount?: number;
}
