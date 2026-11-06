import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { enumBody } from "./internal/enumBody.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Response from FullTextSearchKnowledgeArticle action
 */
export interface FullTextSearchKnowledgeArticleResponse {
  value: EntityReference[];
}

/**
 * FullTextSearchKnowledgeArticle action
 *
 * Unbound action
 */
export class FullTextSearchKnowledgeArticleAction implements Executable<FullTextSearchKnowledgeArticleResponse> {
  constructor(
    public readonly searchText: string,
    public readonly useInflection: boolean,
    public readonly removeDuplicates: boolean,
    public readonly stateCode: number,
    public readonly queryExpression?: TypedQueryBase
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/FullTextSearchKnowledgeArticle`;

    const body: Record<string, unknown> = {
      SearchText: this.searchText,
      UseInflection: this.useInflection,
      RemoveDuplicates: this.removeDuplicates,
      StateCode: this.stateCode,
      QueryExpression: enumBody(this.queryExpression, "QueryBase"),
    };

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
    const data = await response.json();
    return data as FullTextSearchKnowledgeArticleResponse;
  }
}
