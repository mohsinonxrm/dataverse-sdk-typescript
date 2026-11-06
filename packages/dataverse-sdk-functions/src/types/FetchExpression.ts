import type { QueryBase } from './QueryBase.js';

/**
 * FetchExpression complex type
 */
export interface FetchExpression extends QueryBase {
  Query?: string;
}
