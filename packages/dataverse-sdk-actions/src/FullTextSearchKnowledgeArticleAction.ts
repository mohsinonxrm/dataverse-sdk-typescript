import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Response from FullTextSearchKnowledgeArticle action
 */
export interface FullTextSearchKnowledgeArticleResponse {
  value: EntityReference[];
}

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as FullTextSearchKnowledgeArticleResponse;
    return (await response.json()) as FullTextSearchKnowledgeArticleResponse;
  }
}
