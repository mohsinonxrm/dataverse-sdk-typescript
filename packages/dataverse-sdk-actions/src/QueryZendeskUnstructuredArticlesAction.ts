import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from QueryZendeskUnstructuredArticles action
 */
export interface QueryZendeskUnstructuredArticlesResponse {
  knowledgePluginResponse: string;
}

/**
 * Parameters of the QueryZendeskUnstructuredArticles action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QueryZendeskUnstructuredArticlesActionParameters {
  connectionId: string;
  filterCriteria: string;
  searchResultCount: number;
  userQueryText: string;
}

/**
 * QueryZendeskUnstructuredArticles action
 *
 * Unbound action
 */
export class QueryZendeskUnstructuredArticlesAction implements Executable<QueryZendeskUnstructuredArticlesResponse> {
  constructor(public readonly parameters: QueryZendeskUnstructuredArticlesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueryZendeskUnstructuredArticles`;

    const body = requestBody({
      connectionId: this.parameters.connectionId,
      filterCriteria: this.parameters.filterCriteria,
      searchResultCount: this.parameters.searchResultCount,
      userQueryText: this.parameters.userQueryText,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as QueryZendeskUnstructuredArticlesResponse;
  }
}
