import type { ColumnSet } from "./ColumnSet.js";
import type { Object } from "./Object.js";
import type { OrderExpression } from "./OrderExpression.js";
import type { PagingInfo } from "./PagingInfo.js";
import type { QueryBase } from "./QueryBase.js";

/**
 * QueryByAttribute
 * Extends: QueryBase
 */
export interface QueryByAttribute extends QueryBase {
  Attributes?: string[];
  ColumnSet?: ColumnSet;
  EntityName?: string;
  Orders?: OrderExpression[];
  PageInfo?: PagingInfo;
  TopCount?: number;
  Values?: Object[];
}
