import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { QueryZendeskUnstructuredArticlesResponse as QueryZendeskUnstructuredArticlesResponseData } from "./types/index.js";

/**
 * Parameters of the QueryZendeskUnstructuredArticles message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QueryZendeskUnstructuredArticlesRequestParameters {
  connectionId: string;
  filterCriteria: string;
  searchResultCount: number;
  userQueryText: string;
}

/**
 * QueryZendeskUnstructuredArticles request message
 *
 * Web API Action: QueryZendeskUnstructuredArticles
 */
export class QueryZendeskUnstructuredArticlesRequest
  extends OrganizationRequest
  implements Executable<QueryZendeskUnstructuredArticlesResponse>
{
  declare readonly Parameters: Readonly<QueryZendeskUnstructuredArticlesRequestParameters>;

  constructor(parameters: QueryZendeskUnstructuredArticlesRequestParameters) {
    super("QueryZendeskUnstructuredArticles", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueryZendeskUnstructuredArticles`;

    const body = requestBody({
      connectionId: this.Parameters.connectionId,
      filterCriteria: this.Parameters.filterCriteria,
      searchResultCount: this.Parameters.searchResultCount,
      userQueryText: this.Parameters.userQueryText,
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

  async parseResponse(response: Response): Promise<QueryZendeskUnstructuredArticlesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return QueryZendeskUnstructuredArticlesResponse.fromResponse({});
    return QueryZendeskUnstructuredArticlesResponse.fromResponse(await response.json());
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
