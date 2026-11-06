import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_SendAHTEventsResponse as CCaaS_SendAHTEventsResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_SendAHTEvents message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SendAHTEventsRequestParameters {
  ApiVersion: string;
  Payload: string;
}

/**
 * CCaaS_SendAHTEvents request message
 *
 * Web API Action: CCaaS_SendAHTEvents
 */
export class CCaaS_SendAHTEventsRequest
  extends OrganizationRequest
  implements Executable<CCaaS_SendAHTEventsResponse>
{
  declare readonly Parameters: Readonly<CCaaS_SendAHTEventsRequestParameters>;

  constructor(parameters: CCaaS_SendAHTEventsRequestParameters) {
    super("CCaaS_SendAHTEvents", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SendAHTEvents`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      Payload: this.Parameters.Payload,
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

  async parseResponse(response: Response): Promise<CCaaS_SendAHTEventsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_SendAHTEventsResponse.fromResponse({});
    return CCaaS_SendAHTEventsResponse.fromResponse(await response.json());
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
