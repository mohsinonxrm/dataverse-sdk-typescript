import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CCaaS_SendAHTEventsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_SendAHTEvents action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_SendAHTEventsResult {
  "@odata.context"?: string;
  Message: string;
  Status: string;
}

/**
 * CCaaS_SendAHTEvents response message
 *
 * `result` is the value the CCaaS_SendAHTEvents action returns (see {@link CCaaS_SendAHTEventsResult}).
 */
export class CCaaS_SendAHTEventsResponse extends OrganizationResponse {
  constructor(public result: CCaaS_SendAHTEventsResult) {
    super("CCaaS_SendAHTEvents");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_SendAHTEventsResponse {
    return new CCaaS_SendAHTEventsResponse(data as CCaaS_SendAHTEventsResult);
  }
}
