import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * AnalyzeSentimentResponse complex type
 */
export interface AnalyzeSentimentResponse {
  sentiment?: string;
  documentScores: EntityReference | AnyEntityPayload;
  sentences?: Record<string, unknown>[];
}
