import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { QueryBase } from "./types/index.js";

/**
 * FullTextSearchKnowledgeArticle request message
 *
 * Web API Action: FullTextSearchKnowledgeArticle
 */
export class FullTextSearchKnowledgeArticleRequest
  extends OrganizationRequest
  implements Executable<FullTextSearchKnowledgeArticleResponse>
{
  constructor(
    public searchText: string,
    public useInflection: boolean,
    public removeDuplicates: boolean,
    public stateCode: number,
    public queryExpression: QueryBase
  ) {
    super("FullTextSearchKnowledgeArticle");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/FullTextSearchKnowledgeArticle`;

    const body: Record<string, unknown> = {
      SearchText: this.searchText,
      UseInflection: this.useInflection,
      RemoveDuplicates: this.removeDuplicates,
      StateCode: this.stateCode,
      QueryExpression: this.queryExpression,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<FullTextSearchKnowledgeArticleResponse> {
    const data = await response.json();
    return FullTextSearchKnowledgeArticleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SearchText: this.searchText,
      UseInflection: this.useInflection,
      RemoveDuplicates: this.removeDuplicates,
      StateCode: this.stateCode,
      QueryExpression: this.queryExpression,
    };
  }
}

/**
 * FullTextSearchKnowledgeArticle response message
 */
export class FullTextSearchKnowledgeArticleResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("FullTextSearchKnowledgeArticle");
  }

  static fromResponse(data: unknown): FullTextSearchKnowledgeArticleResponse {
    return new FullTextSearchKnowledgeArticleResponse((data as any).value);
  }
}
