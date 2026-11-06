import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CCaaS_SendAHTEventsResponse as CCaaS_SendAHTEventsResponseData } from "./types/index.js";

/**
 * CCaaS_SendAHTEvents request message
 *
 * Web API Action: CCaaS_SendAHTEvents
 */
export class CCaaS_SendAHTEventsRequest
  extends OrganizationRequest
  implements Executable<CCaaS_SendAHTEventsResponse>
{
  constructor(
    public apiVersion: string,
    public payload: string
  ) {
    super("CCaaS_SendAHTEvents");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SendAHTEvents`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      Payload: this.payload,
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

  async parseResponse(response: Response): Promise<CCaaS_SendAHTEventsResponse> {
    const data = await response.json();
    return CCaaS_SendAHTEventsResponse.fromResponse(data);
  }
}

/**
 * CCaaS_SendAHTEvents response message
 */
export class CCaaS_SendAHTEventsResponse extends OrganizationResponse {
  constructor(public result: CCaaS_SendAHTEventsResponseData) {
    super("CCaaS_SendAHTEvents");
  }

  static fromResponse(data: unknown): CCaaS_SendAHTEventsResponse {
    return new CCaaS_SendAHTEventsResponse(responseObject<CCaaS_SendAHTEventsResponseData>(data));
  }
}
