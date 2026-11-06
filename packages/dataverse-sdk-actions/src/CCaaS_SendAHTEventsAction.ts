import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_SendAHTEvents action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_SendAHTEventsResponse {
  "@odata.context"?: string;
  Message: string;
  Status: string;
}

/**
 * Parameters of the CCaaS_SendAHTEvents action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SendAHTEventsActionParameters {
  ApiVersion: string;
  Payload: string;
}

/**
 * CCaaS_SendAHTEvents action
 *
 * Unbound action
 */
export class CCaaS_SendAHTEventsAction implements Executable<CCaaS_SendAHTEventsResponse> {
  constructor(public readonly parameters: CCaaS_SendAHTEventsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SendAHTEvents`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      Payload: this.parameters.Payload,
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
    return (await response.json()) as CCaaS_SendAHTEventsResponse;
  }
}
