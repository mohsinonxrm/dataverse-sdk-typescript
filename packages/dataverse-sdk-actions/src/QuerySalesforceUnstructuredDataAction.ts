import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from QuerySalesforceUnstructuredData action
 */
export interface QuerySalesforceUnstructuredDataResponse {
  KnowledgePluginResponse: string;
}

/**
 * QuerySalesforceUnstructuredData action
 *
 * Unbound action
 */
export class QuerySalesforceUnstructuredDataAction implements Executable<QuerySalesforceUnstructuredDataResponse> {
  constructor(
    public readonly filterCriteria: string,
    public readonly connectionId: string,
    public readonly searchResultCount: number,
    public readonly userQueryText: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QuerySalesforceUnstructuredData`;

    const body: Record<string, unknown> = {
      filterCriteria: this.filterCriteria,
      connectionId: this.connectionId,
      searchResultCount: this.searchResultCount,
      userQueryText: this.userQueryText,
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

  async parseResponse(response: Response): Promise<QuerySalesforceUnstructuredDataResponse> {
    const data = await response.json();
    return data as QuerySalesforceUnstructuredDataResponse;
  }
}
