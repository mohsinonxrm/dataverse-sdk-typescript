import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from QueryZendeskUnstructuredArticles action
 */
export interface QueryZendeskUnstructuredArticlesResponse {
  knowledgePluginResponse: string;
}

/**
 * QueryZendeskUnstructuredArticles action
 *
 * Unbound action
 */
export class QueryZendeskUnstructuredArticlesAction implements Executable<QueryZendeskUnstructuredArticlesResponse> {
  constructor(
    public readonly connectionId: string,
    public readonly filterCriteria: string,
    public readonly searchResultCount: number,
    public readonly userQueryText: string
  ) {}

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
    return data as QueryZendeskUnstructuredArticlesResponse;
  }
}
