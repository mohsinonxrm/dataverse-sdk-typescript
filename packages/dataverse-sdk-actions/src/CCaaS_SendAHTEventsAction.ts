import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_SendAHTEvents action
 */
export interface CCaaS_SendAHTEventsResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_SendAHTEventsResponse;
    return (await response.json()) as CCaaS_SendAHTEventsResponse;
  }
}
