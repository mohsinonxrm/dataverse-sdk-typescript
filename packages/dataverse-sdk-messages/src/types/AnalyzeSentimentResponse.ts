import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * AnalyzeSentimentResponse complex type
 */
export interface AnalyzeSentimentResponse {
  sentiment?: string;
  documentScores: EntityReference | AnyEntityPayload;
  sentences?: Record<string, unknown>[];
}
