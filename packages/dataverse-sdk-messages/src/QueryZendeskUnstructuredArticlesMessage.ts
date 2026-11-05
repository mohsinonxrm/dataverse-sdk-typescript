import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { QueryZendeskUnstructuredArticlesResponse as QueryZendeskUnstructuredArticlesResponseData } from "./types/index.js";

/**
 * QueryZendeskUnstructuredArticles request message
 *
 * Web API Action: QueryZendeskUnstructuredArticles
 */
export class QueryZendeskUnstructuredArticlesRequest
  extends OrganizationRequest
  implements Executable<QueryZendeskUnstructuredArticlesResponse>
{
  constructor(
    public connectionId: string,
    public filterCriteria: string,
    public searchResultCount: number,
    public userQueryText: string
  ) {
    super("QueryZendeskUnstructuredArticles");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueryZendeskUnstructuredArticles`;

    const body: Record<string, unknown> = {
      connectionId: this.connectionId,
      filterCriteria: this.filterCriteria,
      searchResultCount: this.searchResultCount,
      userQueryText: this.userQueryText,
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

  async parseResponse(response: Response): Promise<QueryZendeskUnstructuredArticlesResponse> {
    const data = await response.json();
    return QueryZendeskUnstructuredArticlesResponse.fromResponse(data);
  }
}

/**
 * QueryZendeskUnstructuredArticles response message
 */
export class QueryZendeskUnstructuredArticlesResponse extends OrganizationResponse {
  constructor(public result: QueryZendeskUnstructuredArticlesResponseData) {
    super("QueryZendeskUnstructuredArticles");
  }

  static fromResponse(data: unknown): QueryZendeskUnstructuredArticlesResponse {
    return new QueryZendeskUnstructuredArticlesResponse(
      responseObject<QueryZendeskUnstructuredArticlesResponseData>(data)
    );
  }
}
