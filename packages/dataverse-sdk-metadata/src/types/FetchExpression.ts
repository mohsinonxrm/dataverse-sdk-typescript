import type { QueryBase } from "./QueryBase.js";

/**
 * FetchExpression
 * Extends: QueryBase
 */
export interface FetchExpression extends QueryBase {
  Query?: string;
}
