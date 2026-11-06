import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { QuerySalesforceUnstructuredDataResponse as QuerySalesforceUnstructuredDataResponseData } from "./types/index.js";

/**
 * QuerySalesforceUnstructuredData request message
 *
 * Web API Action: QuerySalesforceUnstructuredData
 */
export class QuerySalesforceUnstructuredDataRequest
  extends OrganizationRequest
  implements Executable<QuerySalesforceUnstructuredDataResponse>
{
  constructor(
    public filterCriteria: string,
    public connectionId: string,
    public searchResultCount: number,
    public userQueryText: string
  ) {
    super("QuerySalesforceUnstructuredData");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<QuerySalesforceUnstructuredDataResponse> {
    const data = await response.json();
    return QuerySalesforceUnstructuredDataResponse.fromResponse(data);
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
