import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { QueryDvUnstructuredDataResponse as QueryDvUnstructuredDataResponseData } from "./types/index.js";

/**
 * Parameters of the QueryDvUnstructuredData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QueryDvUnstructuredDataRequestParameters {
  userQueryText?: string;
}

/**
 * QueryDvUnstructuredData request message
 *
 * Web API Action: QueryDvUnstructuredData
 */
export class QueryDvUnstructuredDataRequest
  extends OrganizationRequest
  implements Executable<QueryDvUnstructuredDataResponse>
{
  declare readonly Parameters: Readonly<QueryDvUnstructuredDataRequestParameters>;

  constructor(parameters: QueryDvUnstructuredDataRequestParameters = {}) {
    super("QueryDvUnstructuredData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueryDvUnstructuredData`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<QueryDvUnstructuredDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return QueryDvUnstructuredDataResponse.fromResponse({});
    return QueryDvUnstructuredDataResponse.fromResponse(await response.json());
  }
}

/**
 * QueryDvUnstructuredData response message
 */
export class QueryDvUnstructuredDataResponse extends OrganizationResponse {
  constructor(public result: QueryDvUnstructuredDataResponseData) {
    super("QueryDvUnstructuredData");
  }

  static fromResponse(data: unknown): QueryDvUnstructuredDataResponse {
    return new QueryDvUnstructuredDataResponse(
      responseObject<QueryDvUnstructuredDataResponseData>(data)
    );
  }
}
