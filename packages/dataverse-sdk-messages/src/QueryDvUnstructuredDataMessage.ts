import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      userQueryText: this.userQueryText,
    };
  }
}

/**
 * QueryDvUnstructuredData response message
 */
export class QueryDvUnstructuredDataResponse extends OrganizationResponse {
  constructor(public result: QueryDvUnstructuredDataResponse) {
    super("QueryDvUnstructuredData");
  }

  static fromResponse(data: unknown): QueryDvUnstructuredDataResponse {
    return new QueryDvUnstructuredDataResponse((data as any).value);
  }
}
