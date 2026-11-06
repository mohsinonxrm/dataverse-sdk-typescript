import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from QuerySalesforceUnstructuredData action
 */
export interface QuerySalesforceUnstructuredDataResponse {
  KnowledgePluginResponse: string;
}

/**
 * Parameters of the QuerySalesforceUnstructuredData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QuerySalesforceUnstructuredDataActionParameters {
  filterCriteria: string;
  connectionId: string;
  searchResultCount: number;
  userQueryText: string;
}

/**
 * QuerySalesforceUnstructuredData action
 *
 * Unbound action
 */
export class QuerySalesforceUnstructuredDataAction implements Executable<QuerySalesforceUnstructuredDataResponse> {
  constructor(public readonly parameters: QuerySalesforceUnstructuredDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QuerySalesforceUnstructuredData`;

    const body = requestBody({
      filterCriteria: this.parameters.filterCriteria,
      connectionId: this.parameters.connectionId,
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

  async parseResponse(response: Response): Promise<QuerySalesforceUnstructuredDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as QuerySalesforceUnstructuredDataResponse;
    return (await response.json()) as QuerySalesforceUnstructuredDataResponse;
  }
}
