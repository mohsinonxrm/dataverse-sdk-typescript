/**
 * ExtractTextEntitiesResponse complex type
 */
export interface ExtractTextEntitiesResponse {
  originalText?: string;
  textScore?: number;
  entities?: Record<string, unknown>[];
}
