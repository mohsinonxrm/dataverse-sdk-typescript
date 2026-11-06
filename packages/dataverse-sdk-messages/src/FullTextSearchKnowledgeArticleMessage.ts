import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { enumBody } from "./internal/enumBody.js";
import type { TypedQueryBase } from "./types/index.js";

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
    public queryExpression?: TypedQueryBase
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
    return FullTextSearchKnowledgeArticleResponse.fromResponse(data);
  }
}

/**
 * FullTextSearchKnowledgeArticle response message
 */
export class FullTextSearchKnowledgeArticleResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("FullTextSearchKnowledgeArticle");
  }

  static fromResponse(data: unknown): FullTextSearchKnowledgeArticleResponse {
    return new FullTextSearchKnowledgeArticleResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
