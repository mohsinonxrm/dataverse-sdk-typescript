import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_SetPresence action
 */
export interface CCaaS_SetPresenceResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_SetPresence action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SetPresenceActionParameters {
  ApiVersion: string;
  PresenceId: string;
}

/**
 * CCaaS_SetPresence action
 *
 * Unbound action
 */
export class CCaaS_SetPresenceAction implements Executable<CCaaS_SetPresenceResponse> {
  constructor(public readonly parameters: CCaaS_SetPresenceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SetPresence`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      PresenceId: this.parameters.PresenceId,
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

  async parseResponse(response: Response): Promise<CCaaS_SetPresenceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_SetPresenceResponse;
  }
}
