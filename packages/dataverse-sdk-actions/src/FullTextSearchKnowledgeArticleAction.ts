import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Response from the FullTextSearchKnowledgeArticle action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type FullTextSearchKnowledgeArticleResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the FullTextSearchKnowledgeArticle action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FullTextSearchKnowledgeArticleActionParameters {
  SearchText: string;
  UseInflection: boolean;
  RemoveDuplicates: boolean;
  StateCode: number;
  QueryExpression?: TypedQueryBase;
}

/**
 * FullTextSearchKnowledgeArticle action
 *
 * Unbound action
 */
export class FullTextSearchKnowledgeArticleAction implements Executable<FullTextSearchKnowledgeArticleResponse> {
  constructor(public readonly parameters: FullTextSearchKnowledgeArticleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/FullTextSearchKnowledgeArticle`;

    const body = requestBody({
      SearchText: this.parameters.SearchText,
      UseInflection: this.parameters.UseInflection,
      RemoveDuplicates: this.parameters.RemoveDuplicates,
      StateCode: this.parameters.StateCode,
      QueryExpression: enumBody(this.parameters.QueryExpression, "QueryBase"),
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<FullTextSearchKnowledgeArticleResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: FullTextSearchKnowledgeArticleResponse }).value;
  }
}
