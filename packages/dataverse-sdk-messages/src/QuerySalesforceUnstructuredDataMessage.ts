import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { QuerySalesforceUnstructuredDataResponse as QuerySalesforceUnstructuredDataResponseData } from "./types/index.js";

/**
 * Parameters of the QuerySalesforceUnstructuredData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QuerySalesforceUnstructuredDataRequestParameters {
  filterCriteria: string;
  connectionId: string;
  searchResultCount: number;
  userQueryText: string;
}

/**
 * QuerySalesforceUnstructuredData request message
 *
 * Web API Action: QuerySalesforceUnstructuredData
 */
export class QuerySalesforceUnstructuredDataRequest
  extends OrganizationRequest
  implements Executable<QuerySalesforceUnstructuredDataResponse>
{
  declare readonly Parameters: Readonly<QuerySalesforceUnstructuredDataRequestParameters>;

  constructor(parameters: QuerySalesforceUnstructuredDataRequestParameters) {
    super("QuerySalesforceUnstructuredData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QuerySalesforceUnstructuredData`;

    const body = requestBody({
      filterCriteria: this.Parameters.filterCriteria,
      connectionId: this.Parameters.connectionId,
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

  async parseResponse(response: Response): Promise<QuerySalesforceUnstructuredDataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return QuerySalesforceUnstructuredDataResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * QuerySalesforceUnstructuredData response message
 */
export class QuerySalesforceUnstructuredDataResponse extends OrganizationResponse {
  constructor(public result: QuerySalesforceUnstructuredDataResponseData) {
    super("QuerySalesforceUnstructuredData");
  }

  static fromResponse(data: unknown): QuerySalesforceUnstructuredDataResponse {
    return new QuerySalesforceUnstructuredDataResponse(
      responseObject<QuerySalesforceUnstructuredDataResponseData>(data)
    );
  }
}
