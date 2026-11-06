import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { QueryDvUnstructuredDataResponse as QueryDvUnstructuredDataResponseData } from "./types/index.js";

/**
 * QueryDvUnstructuredData request message
 *
 * Web API Action: QueryDvUnstructuredData
 */
export class QueryDvUnstructuredDataRequest
  extends OrganizationRequest
  implements Executable<QueryDvUnstructuredDataResponse>
{
  constructor(public userQueryText: string) {
    super("QueryDvUnstructuredData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueryDvUnstructuredData`;

    const body: Record<string, unknown> = {
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

  async parseResponse(response: Response): Promise<QueryDvUnstructuredDataResponse> {
    const data = await response.json();
    return QueryDvUnstructuredDataResponse.fromResponse(data);
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
