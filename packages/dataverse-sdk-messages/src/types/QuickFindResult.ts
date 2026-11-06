/**
 * QuickFindResult complex type
 */
export interface QuickFindResult {
  ErrorCode?: number;
  QueryColumnSet?: string[];
  Data?: Record<string, unknown>[];
}
