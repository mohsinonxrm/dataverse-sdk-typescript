import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return QueryDvUnstructuredDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the QueryDvUnstructuredData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface QueryDvUnstructuredDataResult {
  "@odata.context"?: string;
  knowledgePluginResponse: string;
}

/**
 * QueryDvUnstructuredData response message
 *
 * `result` is the value the QueryDvUnstructuredData action returns (see {@link QueryDvUnstructuredDataResult}).
 */
export class QueryDvUnstructuredDataResponse extends OrganizationResponse {
  constructor(public result: QueryDvUnstructuredDataResult) {
    super("QueryDvUnstructuredData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): QueryDvUnstructuredDataResponse {
    return new QueryDvUnstructuredDataResponse(data as QueryDvUnstructuredDataResult);
  }
}
